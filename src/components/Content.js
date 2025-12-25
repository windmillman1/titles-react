import { useState, useEffect } from 'react';
import posts from '../data';
import Image from './Image';
import styles from './content.module.css';

const POST_LIMIT = 10;
const debug = false;
let data = posts;

function Content() {
  const [urls, setUrls] = useState([]);
  const [ascending, setAscending] = useState(true);
  const [loading, setLoading] = useState(true);
  const [filterDeleted, setFilterDeleted] = useState(true);

  const handleImageFetch = (url, json) => {
    // let results = json[0]?.data.children[0].data?.url_overridden_by_dest;
    let selectedData = {};
    selectedData['postUrl'] = url.slice(0, url.length - 5);  // original url
    selectedData['url'] = json[0]?.data.children[0].data?.url_overridden_by_dest;
    selectedData['thumbnail'] = json[0]?.data.children[0].data?.thumbnail;
    selectedData['subreddit'] = json[0]?.data.children[0].data?.subreddit;
    selectedData['title'] = json[0]?.data.children[0].data?.title;
    selectedData['author'] = json[0]?.data.children[0].data?.author;
    selectedData['score'] = json[0]?.data.children[0].data?.score;
    selectedData['is_gallery'] = json[0]?.data.children[0].data?.is_gallery;
    selectedData['upvote_ratio'] = json[0]?.data.children[0].data?.upvote_ratio;
    selectedData['selftext'] = json[0]?.data.children[0].data?.selftext;
    selectedData['gifUrl'] = json[0]?.data.children[0].data?.preview?.reddit_video_preview?.fallback_url
    selectedData['gfyCatUrl'] = json[0]?.data.children[0].data?.url.slice(8, 14) === "gfycat" ? json[0]?.data.children[0].data?.url : ''
    selectedData['gifEmbedUrl'] = json[0]?.data.children[0].data.secure_media_embed.media_domain_url  // red
    // TODO: Some images or gifs are embedded differently

    // TODO: hide imgur post not here link
    const imgurDeleted = new Set(["https://i.imgur.com/removed.png", "https://i.redd.it/mqwiz5z8k1371.jpg", "https://i.imgur.com/HrEPxXT.jpg", "https://i.imgur.com/yaYKqlG.jpg", "https://i.redd.it/e386ne4gkzq51.jpg", "https://i.imgur.com/TIFRJ4K.gifv", "https://i.imgur.com/htXDSm7.jpg", "https://i.imgur.com/s2srb5R.gifv", "https://i.imgur.com/5NpwNVs.jpg", "https://i.imgur.com/JQMrqui.gifv", "https://i.imgur.com/nHMkQ63.jpg", "https://i.imgur.com/s4tXz8V.png", "https://i.imgur.com/qphwe1q.jpg", "https://external-preview.redd.it/ESPM-tTuK3werLgfWG_wBsw_trUSDNU4bI5s2jVRAgQ.png?auto=webp&v=enabled&s=0ae2144db9ef8076fa9b7a0a49c85fb972e7db07"])

    // No image found for post, delete it.
    // TODO: No image url nor selftext found, so must be an image/gif post with no image.
    if (filterDeleted && !selectedData['url'] && !selectedData['selftext']) {
      return;
    }

    if (imgurDeleted.has(selectedData['url'])) {
      return;  // Post was deleted, hidden, or is text post. Not accessible
    } else {
      console.log(selectedData);
      return selectedData;
    }
  }

  // See https://stackoverflow.com/a/12646864
  // Sort randomly, in-place
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const processUrls = async () => {
    console.log('🔄 Starting processUrls function');

    if (typeof data === 'string') {
      data = data.trim();
      data = data.split(',');
      console.log(`📝 Split data string into ${data.length} URLs`);

      // data = data.slice(1250, 1500);  // slice segment of specific urls
      data = data.map(async (s) => {
        console.log('🔗 Processing URL:', s);
        return s.slice(0, s.length - 8) + '.json';
      });
    }

    shuffleArray(data);
    console.log('🔀 URLs shuffled');

    data = data.slice(0, POST_LIMIT);  // get POST_LIMIT number of random urls
    console.log(`✂️ Sliced to ${data.length} URLs (POST_LIMIT: ${POST_LIMIT})`);

    try {
      const processedUrls = await Promise.all(data);
      console.log('✅ All URLs processed successfully');
      return processedUrls;
    } catch (error) {
      console.error('❌ Error in processUrls:', error);
      console.error('❌ ProcessUrls error details:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }

  const fetchPosts = async (urls) => {
    console.log('🚀 Starting fetchPosts with', urls.length, 'URLs');

    const results = await Promise.allSettled(
      urls.map(async (postUrl, index) => {
        console.log(`📡 Processing post ${index + 1}/${urls.length}: ${postUrl}`);

        try {
          const response = await fetch(postUrl, {
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 (compatible; RedditContentFetcher/1.0)'
            }
          });

          console.log(`✅ Response status for ${postUrl}: ${response.status} ${response.statusText}`);
          const contentType = response.headers.get('content-type');
          console.log(`📄 Response content-type: ${contentType}`);

          // Check for rate limiting (429) or blocking (403, 401)
          if (response.status === 429) {
            const retryAfter = response.headers.get('retry-after');
            console.error(`🚫 RATE LIMITED for ${postUrl}`);
            console.error(`⏰ Retry-After header: ${retryAfter || 'not provided'}`);
            console.error(`⚠️ You are being rate limited by Reddit. Wait ${retryAfter || 'a few minutes'} before trying again.`);
            throw new Error(`Rate limited (429) - Retry after: ${retryAfter || 'unknown'}`);
          }

          if (response.status === 403) {
            console.error(`🚫 BLOCKED (403 Forbidden) for ${postUrl}`);
            console.error(`⚠️ Access forbidden - you may be blocked by Reddit or hitting CORS restrictions`);
            throw new Error('Blocked (403) - Access forbidden');
          }

          if (response.status === 401) {
            console.error(`🔒 UNAUTHORIZED (401) for ${postUrl}`);
            console.error(`⚠️ Authentication required - endpoint may require Reddit API credentials`);
            throw new Error('Unauthorized (401) - Authentication required');
          }

          if (!response.ok) {
            console.error(`❌ HTTP Error ${response.status} for ${postUrl}`);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          // Check if response is actually JSON
          if (!contentType || !contentType.includes('application/json')) {
            console.error(`❌ Invalid content-type for ${postUrl}: ${contentType}`);
            console.error(`🔍 Expected JSON but got: ${contentType}`);

            // Read response as text to see what we got
            const text = await response.text();
            console.error(`📄 FULL RESPONSE CONTENT:`, text);
            console.error(`📄 First 500 chars:`, text.substring(0, 500));

            if (text.includes('<!DOCTYPE html>') || text.includes('<html>')) {
              console.error(`🏠 Received HTML page instead of JSON for ${postUrl}`);

              // Check for common rate limit/block patterns in HTML
              if (text.toLowerCase().includes('rate limit') || text.toLowerCase().includes('too many requests')) {
                console.error(`🚫 RATE LIMIT detected in HTML response!`);
                console.error(`⚠️ Reddit is rate limiting your requests. Reduce POST_LIMIT or wait before retrying.`);
              }
              if (text.toLowerCase().includes('blocked') || text.toLowerCase().includes('forbidden')) {
                console.error(`🚫 BLOCKING detected in HTML response!`);
                console.error(`⚠️ Your requests may be blocked. Check if you need authentication or are violating rate limits.`);
              }
            }

            throw new Error(`Invalid response type: expected JSON but got ${contentType}`);
          }

          // Only parse JSON if content-type is correct
          let data;
          try {
            data = await response.json();
            console.log(`📊 Successfully parsed JSON data for ${postUrl}`);
          } catch (jsonError) {
            console.error(`❌ JSON parse error for ${postUrl}:`, jsonError.message);
            console.error(`❌ This is a TypeError - the response is not valid JSON`);

            // Try to read the response body to see what we actually got
            try {
              const responseClone = response.clone();
              const text = await responseClone.text();
              console.error(`📄 INVALID JSON CONTENT:`, text);
              console.error(`📄 First 500 chars:`, text.substring(0, 500));
            } catch (readError) {
              console.error(`❌ Could not read response body:`, readError.message);
            }

            throw new Error(`Failed to parse JSON: ${jsonError.message}`);
          }

          const result = handleImageFetch(postUrl, data);
          console.log(`🎯 Processed result for ${postUrl}:`, result ? 'Valid' : 'Filtered out');
          return result;

        } catch (error) {
          console.error(`❌ Fetch error for ${postUrl}:`, {
            message: error.message,
            name: error.name,
            timestamp: new Date().toISOString()
          });

          if (error.name === 'TypeError') {
            console.error(`💥 TypeError caught - likely invalid JSON response or network issue`);
          }

          return null;
        }
      })
    );

    // Extract successful results
    data = results.map(result => result.status === 'fulfilled' ? result.value : null);

    const validData = data.filter(item => item !== null);
    console.log(`📈 Successfully processed ${validData.length} out of ${urls.length} posts`);

    // Use validData for sorting instead of the full data array with nulls
    data = await sortByKey(validData, 'score');  // always sort by score first
    setUrls(data);
    setLoading(false);
    return data;
  }

  const sortByKey = async (array, key) => {
    // Filter out null values before sorting
    const validArray = array.filter(item => item !== null);
    console.log(`🔍 Filtering null values: ${array.length - validArray.length} null items removed`);

    // don't want to sort in place as we're not allowed to directly modify state
    // Therefore in react, must copy array THEN sort, then update state.
    const sortFunc = (a, b) => {
      setAscending(!ascending);  // set the next sort to be reversed

      // Handle null values (though we filtered them, be defensive)
      if (!a || !b) return 0;

      if (typeof b[key] === 'string' || typeof a[key] === 'string') {
        return b[key][0] > a[key][0] ? 1 : -1
      } else {
        return b[key] - a[key]
      }
    }

    let sorted = await [...validArray].sort((a, b) => ascending ? sortFunc(a, b) : sortFunc(b, a));
    console.log(`📊 Sorted ${sorted.length} valid items by key: ${key}`);
    return sorted;
  }

  // Note: doesn't pick new posts, just shuffles randomly existing posts
  // Must hard refresh page for new posts atm
  const sortRandom = async (data) => {
    // randomly shuffle
    function func(a, b) {
      return 0.5 - Math.random();
    }
    data = await [...data].sort(func);
    setUrls(data)
    return data;
  }

  useEffect(() => {
    // console.log('urls changed')
  }, [urls])

  useEffect(() => {
    const wrapper = async () => {
      console.log('🎬 Starting Content component data fetch');
      setLoading(true);

      try {
        console.log('📋 Step 1: Processing URLs...');
        let urls = await processUrls();

        console.log('📋 Step 2: Fetching posts...');
        await fetchPosts(urls);

        console.log('🎉 Data fetch completed successfully');
      } catch (error) {
        console.error('💥 Critical error in Content component:', error);
        console.error('💥 Full error details:', {
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
          component: 'Content'
        });

        // Set loading to false even on error to prevent infinite loading state
        setLoading(false);

        // Optionally set empty URLs array to show error state
        setUrls([]);
      }
    }

    wrapper();
  }, []);

  const renderImage = (key, image) => {
    return <Image key={key} image={image} />
  }

  return (
    <div className={styles.bodyContainer}>
      <h2>Reddit Content</h2>

      <div className={styles.contentContainer}>
        <button onClick={() => sortRandom(data)}>Random</button>
        <button onClick={() => setUrls(sortByKey(urls, 'score'))}>Score</button>
        <button onClick={() => setUrls(sortByKey(urls, 'upvote_ratio'))}>Ratio (Best)</button>
        <button onClick={() => setUrls(sortByKey(urls, 'author'))}>Author</button>
        <button onClick={() => setUrls(sortByKey(urls, 'subreddit'))}>Subreddit</button>
      </div>

      <div className={styles.contentContainer}>
        {
          loading
            ?
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <h3>Loading Reddit content...</h3>
            </div>
            :
            <>
              <p style={{ marginBottom: '20px' }}>
                Displaying {urls.length} random posts from Reddit.
              </p>
              {urls.map((image, i) => image ? renderImage(i, image) : null)}
            </>
        }
      </div>
    </div >
  )
}

export default Content;

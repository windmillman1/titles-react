
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../app.module.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search for:', searchTerm);
  };

  return (
    <div className="home-wikipedia">
      {/* Wikipedia-style Header */}
      <header className="wikipedia-header">
        <div className="wikipedia-logo">
          <h1>Wikipedia Clone</h1>
        </div>

        <div className="wikipedia-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="wikipedia-search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="wikipedia-search-button">
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Language-style Grid for Categories */}
      <div className="language-grid">
        <Link to="/images" className="language-card">
          <div className="language-name">Images</div>
          <div className="language-articles">Visual content</div>
        </Link>
        <Link to="/videos" className="language-card">
          <div className="language-name">Videos</div>
          <div className="language-articles">Video content</div>
        </Link>
        <Link to="/discussions" className="language-card">
          <div className="language-name">Discussions</div>
          <div className="language-articles">Text posts</div>
        </Link>
        <Link to="/galleries" className="language-card">
          <div className="language-name">Galleries</div>
          <div className="language-articles">Multi-image posts</div>
        </Link>
        <a href="#trending" className="language-card">
          <div className="language-name">Trending</div>
          <div className="language-articles">Popular content</div>
        </a>
      </div>


      {/* Wikipedia-style Footer */}
      <footer className="wikipedia-footer">
        <p>
          This is a demonstration project inspired by Wikipedia's design.
        </p>
        <p>
          <a href="/privacy">Privacy Policy</a> |
          <a href="/page1">About</a> |
          <a href="/page2">Contact</a>
        </p>
      </footer>
    </div>
  )
}

export default Home;

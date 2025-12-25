function Privacy() {
  return (
    <div className="bodyContainer">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>Information We Collect</h2>
      <p>This application may collect information from Reddit posts and publicly available content. We do not collect personal information from users.</p>

      <h2>How We Use Information</h2>
      <p>The information collected is used solely for displaying Reddit content within this application.</p>

      <h2>Data Storage</h2>
      <p>We do not store personal data. All content is fetched from Reddit's public API and displayed temporarily.</p>

      <h2>Third-Party Services</h2>
      <p>This application uses Reddit's API to fetch content. Please refer to Reddit's privacy policy for information about their data practices.</p>

      <h2>Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please contact us.</p>

      <p><a href="/conditions">Terms and Conditions</a></p>
    </div>
  );
}

export default Privacy;

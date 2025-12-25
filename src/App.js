import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import Content from './components/Content';
import Images from './components/Images';
import Videos from './components/Videos';
import Discussions from './components/Discussions';
import Galleries from './components/Galleries';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Privacy from './components/Privacy';
import styles from './app.module.css';

function AppContent() {
  const location = useLocation();
  const isContentPage = location.pathname === '/conditions';

  return (
    <div className={styles.mainLayout}>
      {!isContentPage && <Navigation />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/galleries" element={<Galleries />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/conditions" element={<Content />} />
        </Routes>
      </main>
      {!isContentPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import BlogPost from './components/BlogPost';
import BlogPostDetails from './components/BlogPostDetails';
import FirstPageDetails from './pages/FirstPageDetails';
import Footer from './components/Footer';
import wordpressApiUrl from './config';
import './App.css';

const App = () => {
  const [blogPages, setBlogPages] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch(`${wordpressApiUrl}/pages`);
        const pagesData = await response.json();
        setBlogPages(pagesData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPages();

    // Event listener for scrolling
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Filter out privacy, imprint, and contact pages for the header navigation
  const navbarPages = blogPages.filter(
    page => !['privacy', 'imprint', 'contact'].includes(page.slug)
  );

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavbarComponent blogPages={navbarPages} />
        </header>
        <main className="App-content">
          <Routes>
            <Route path="/" element={<BlogPost />} />
            <Route path="/post/:postId" element={<BlogPostDetails />} />
            <Route path="/first-page" element={<FirstPageDetails />} />
            {blogPages.map((page) => (
              <Route
                key={page.id}
                path={`/${page.slug}`}
                element={<FirstPageDetails page={page} />}
              />
            ))}
          </Routes>
        </main>
        <Footer />
        {showScrollToTop && (
          <button className="scroll-to-top" onClick={scrollToTop}>
            Scroll to Top
          </button>
        )}
      </div>
    </Router>
  );
};

export default App;

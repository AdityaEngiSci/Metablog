import React, { useEffect } from 'react';
import { Routes, Route, useNavigationType, useLocation } from 'react-router-dom';
import SignUp from './pages/SignUp';

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = '';
    let metaDescription = '';

    switch (pathname) {
      case '/':
        title = 'Sign Up';
        metaDescription = 'Create a new account on MetaBlog';
        break;
      default:
        title = 'MetaBlog';
        metaDescription = 'Welcome to MetaBlog';
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      } else {
        const newMetaTag = document.createElement('meta');
        newMetaTag.name = 'description';
        newMetaTag.content = metaDescription;
        document.head.appendChild(newMetaTag);
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
    </Routes>
  );
}

export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import PostDetail from './PostDetail';

export default function App() {
  return (
    <>
      {/* Container for the entire application */}
      <section className="article-list">
        {/* Router component to enable navigation */}
        <Router>
          {/* Routes component to define application routes */}
          <Routes>
            {/* Route for the main page */}
            <Route path="/" element={<MainPage />} />
            {/* Route for displaying post details, postId is a parameter */}
            <Route path="/detail/:postId" element={<PostDetail />} />
          </Routes>
        </Router>
      </section>
    </>
  );
}

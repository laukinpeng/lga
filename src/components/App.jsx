import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import PostDetail from './PostDetail';

export default function App() {
  return (
    <>
      <section className="article-list">
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/detail/:postId" element={<PostDetail />} />
          </Routes>
        </Router>
      </section>
    </>
  );
}

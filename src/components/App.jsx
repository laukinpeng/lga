import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from 'react-router-dom';
import PostDetail from './PostDetail.jsx';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [initialPosts, setInitialPosts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);
  const pageSize = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const [pageOptions, setPageOptions] = useState(null);

  useEffect(async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();

      const totalPages = Math.ceil(data.posts.length / pageSize);

      const pageOptions = Array.from({ length: totalPages }, (_, index) => ({
        label: `Page ${index + 1}`,
        value: index + 1,
      }));

      setPageOptions(pageOptions);
      setPosts(data.posts);
      setInitialPosts(data.posts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    if (posts.length !== 0) {
      let categoryInfo = posts
        .map((x) =>
          x.categories.map((category) => ({
            label: category.name,
            value: category.name,
          }))
        )
        .flat();

      const uniqueCategories = Array.from(
        new Set(categoryInfo.map((item) => item.label))
      ).map((label) => categoryInfo.find((item) => item.label === label));

      setCategoryList(uniqueCategories);
    }
  }, [posts]);

  useEffect(() => {
    if (filteredCategoryList.length !== 0) {
      let filteredResult = initialPosts.filter((item) =>
        item.categories.some((cat) => filteredCategoryList.includes(cat.name))
      );

      const totalPages = Math.ceil(filteredResult.length / pageSize);

      const pageOptions = Array.from({ length: totalPages }, (_, index) => ({
        label: `Page ${index + 1}`,
        value: index + 1,
      }));

      setPageOptions(pageOptions);
      setPosts(filteredResult);
    }

    if (filteredCategoryList.length == 0) {
      setPosts(initialPosts);
    }
  }, [filteredCategoryList]);

  useEffect(() => {
    if (posts.length !== 0) {
      const indexOfLastItem = currentPage * pageSize;
      const indexOfFirstItem = indexOfLastItem - pageSize;
      const currentItems = initialPosts.slice(
        indexOfFirstItem,
        indexOfLastItem
      );
      setPosts(currentItems);
    }
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => {
      setCategoryList([])
      setCurrentPage(1);
    };
  
    window.addEventListener('popstate', handlePopState);
  
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [setCurrentPage, setCurrentPage])

  return (
    <>
      <section className="article-list">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="top-main mg-1">
                    <Select
                      className="fg-3"
                      isMulti
                      options={categoryList}
                      placeholder={'Select Categories'}
                      defaultValue={null}
                      onChange={(selectedCategory) => {
                        setFilteredCategoryList(selectedCategory.map((x) => x.label));
                      }}
                    />
                    <Select
                      className="fg-1"
                      options={pageOptions}
                      placeholder={'Select Page'}
                      value={{ label: `Page ${currentPage}`, value: currentPage }}
                      defaultValue={null}
                      onChange={(selectedPage) => {
                        console.log('selectedPageselectedPageselectedPage', selectedPage);
                        setCurrentPage(selectedPage.value);
                      }}
                    />
                  </div>
                  {posts.map((post) => (
                    <div key={post.id} className="article-item">
                      <img
                        className="author-avatar"
                        src={post.author.avatar}
                        alt={post.author.name}
                      />
                      <div className="ml-1">
                        <div className="mb-1 post-id">Post ID: {post.id}</div>
                        <div className="mb-1 author-name">
                          Author: {post.author.name}
                        </div>
                        <h2 className="mb-05 post-title">
                          {/* Apply Link only to post title */}
                          <Link to={`/detail/${post.id}`}>{post.title}</Link>
                        </h2>
                        <div className="mb-1 publish-date">
                          Published on{' '}
                          {new Date(post.publishDate).toLocaleDateString()}
                        </div>
                        <div className="mb-1 post-summary">
                          Summary: {post.summary}
                        </div>
                        <div className="mb-1">Categories:</div>
                        <div className="display-flex gap-1 fd-r-summary">
                          {post.categories.map((category) => (
                            <div key={category.id}>
                              {category.name}
                              {category.id}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              }
            />
            <Route path="/detail/:postId" element={<PostDetail />} />
          </Routes>
        </Router>

        {/* {posts.map((post) => (
          <div key={post.id} className="article-item">
            <img
              className="author-avatar"
              src={post.author.avatar}
              alt={post.author.name}
            />
            <div className="ml-1">
              <div className="mb-1 post-id">Post ID: {post.id}</div>
              <div className="mb-1 author-name">Author: {post.author.name}</div>
              <h2 className="mb-05 post-title">Title: {post.title}</h2>
              <div className="mb-1 publish-date">
                Published on {new Date(post.publishDate).toLocaleDateString()}
              </div>
              <div className="mb-1 post-summary">Summary: {post.summary}</div>
              <div className="mb-1">Categories:</div>
              <div className="display-flex gap-1 fd-r-summary">
                {post.categories.map((category) => (
                  <div key={category.id}>
                    {category.name}
                    {category.id}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))} */}
      </section>
    </>
  );
}

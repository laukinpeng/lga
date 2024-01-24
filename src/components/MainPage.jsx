import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import ArticleList from './ArticleList';

export default function MainPage() {
  // State variables for managing posts, categories, pagination, and filters
  const [posts, setPosts] = useState([]);
  const [initialPosts, setInitialPosts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);
  const pageSize = 5;

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageOptions, setPageOptions] = useState(null);

  // Fetch initial posts and set up pagination options
  useEffect(async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();

      // Calculate total pages based on pageSize
      const totalPages = Math.ceil(data.posts.length / pageSize);

      // Create an array of page options for the Select component
      const pageOptions = Array.from({ length: totalPages }, (_, index) => ({
        label: `Page ${index + 1}`,
        value: index + 1,
      }));

      // Set state with fetched posts, initial posts, and pagination options
      setPageOptions(pageOptions);
      setPosts(data.posts);
      setInitialPosts(data.posts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  // Extract and set up unique categories from the fetched posts
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

  // Filter posts based on selected categories and update pagination options
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

    if (filteredCategoryList.length === 0) {
      setPosts(initialPosts);
    }
  }, [filteredCategoryList]);

  // Paginate the displayed posts based on the current page
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

  // Handle popstate event to reset filters and pagination on browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCategoryList([]);
      setCurrentPage(1);
      setFilteredCategoryList([]);
    };

    window.addEventListener('popstate', handlePopState);

    // Remove event listener to avoid memory leaks
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [setCurrentPage, setCurrentPage, setFilteredCategoryList]);

  // JSX to render the main page with filter options, pagination, and articles
  return (
    <main>
      <header className="top-main mg-1">
        {/* Select component for filtering by categories */}
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
        {/* Select component for pagination */}
        <Select
          className="fg-1"
          options={pageOptions}
          placeholder={'Select Page'}
          value={{
            label: `Page ${currentPage}`,
            value: currentPage,
          }}
          defaultValue={null}
          onChange={(selectedPage) => {
            setCurrentPage(selectedPage.value);
          }}
        />
      </header>
      {/* Section to display the list of articles */}
      <section className="articles">
        {posts.map((post) => (
          <ArticleList post={post} filteredCategoryList={filteredCategoryList} />
        ))}
      </section>
    </main>
  );
}
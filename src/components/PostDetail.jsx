import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ArticleList from './ArticleList';

// Functional component for displaying details of a specific post
const PostDetail = () => {
  // Extract postId parameter from the route
  const { postId } = useParams();
  
  // Extract categories from the query parameters in the URL
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categories = queryParams.get('categories');

  // State variables for handling post data and not found scenarios
  const [resultNotFound, setResultNotFound] = useState(null);
  const [post, setPost] = useState(null);

  // Fetch post details based on the postId
  useEffect(async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const result = await response.json();

      // If the server returns an error, set resultNotFound to true
      if (result.error) {
        console.error(result.error);
        setResultNotFound(true);
      }

      // Set the post data if it's successfully fetched
      setPost(result.post);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [postId]);

  return (
    <section>
      {/* Display a message if the post is not found */}
      {resultNotFound === true ? <div>Post not found!</div> : null}
      
      {/* Render the ArticleList component if post data is available */}
      {post !== null ? <ArticleList post={post} link={false} /> : null}
    </section>
  );
};

export default PostDetail;

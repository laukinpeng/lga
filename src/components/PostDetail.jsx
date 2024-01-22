import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ArticleList from './ArticleList';

const PostDetail = () => {
  const { postId } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categories = queryParams.get('categories');

  const [resultNotFound, setResultNotFound] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        console.error(result.error);
        setResultNotFound(true);
      }

      setPost(result.post);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [postId]);

  return (
    <section>
      {resultNotFound == true ? <div>Post not found!</div> : null}
      {post !== null ? <ArticleList post={post} link={false} /> : null}
    </section>
  );
};

export default PostDetail;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { postId } = useParams();

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
    <>
      {resultNotFound == true ? <div>Post not found!</div> : null}
      {post !== null ? (
        <section className="article-list">
          <div key={post.id} className="article-item">
            <img
              className="author-avatar"
              src={post.author.avatar}
              alt={post.author.name}
            />
            <div className="ml-1">
              <div className="mb-1 post-id">Post ID: {post.id}</div>
              <div className="mb-1 author-name">Author: {post.author.name}</div>
              <h2 className="mb-05 post-title">{post.title}</h2>
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
        </section>
      ) : null}
    </>
  );
};

export default PostDetail;

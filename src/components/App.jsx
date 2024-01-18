import React, { useState, useEffect } from 'react';

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let blue = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    blue();
  }, []);

  console.log('postspostsposts', posts);

  return (
    <>
      dcmopaswkljncmlesdkhjvfkl;h
      {posts.map((post) => (
        <div>
          <h1>{post.id}</h1>
          <h2>{post.author.name}</h2>
          <h3>{post.title}</h3>
          <img src={post.author.avatar} />
          <p>Date: {post.publishDate}</p>
          <p>{post.summary}</p>
        </div>
      ))}
    </>
  );
}

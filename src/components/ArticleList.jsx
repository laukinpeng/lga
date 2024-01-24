import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ArticleList({ post, filteredCategoryList, link }) {
  // Log post and link for debugging purposes
  console.log('postpostpost', post);
  console.log('linklinklink', link);

  return (
    // Individual article item with details
    <article key={post.id} className="article-item">
      {/* Author's avatar */}
      <img
        className="author-avatar"
        src={post.author.avatar}
        alt={post.author.name}
      />
      <div className="ml-1">
        {/* Display post details */}
        <div className="mb-1 post-id">Post ID: {post.id}</div>
        <div className="mb-1 author-name">Author: {post.author.name}</div>

        {/* Display post title with or without a link based on the 'link' prop */}
        {link == false ? (
          <h2 className="mb-05 post-title">{post.title}</h2>
        ) : (
          <h2 className="mb-05 post-title">
            {/* Link to post details with optional filtered categories in the URL */}
            <Link
              to={{
                pathname: `/detail/${post.id}`,
                search: `?categories=${encodeURIComponent(
                  filteredCategoryList.join(',')
                )}`,
              }}
            >
              {post.title}
            </Link>
          </h2>
        )}

        {/* Display publish date */}
        <div className="mb-1 publish-date">
          Published on {new Date(post.publishDate).toLocaleDateString()}
        </div>

        {/* Display post summary */}
        <div className="mb-1 post-summary">Summary: {post.summary}</div>

        {/* Display post categories */}
        <div className="mb-1">Categories:</div>
        <div className="display-flex gap-1 fd-r-summary">
          {post.categories.map((category) => (
            <div key={category.id}>{category.name}</div>
          ))}
        </div>
      </div>
    </article>
  );
}

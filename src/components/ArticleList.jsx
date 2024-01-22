import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ArticleList({ post, filteredCategoryList, link }) {
  console.log('postpostpost', post);
  console.log('linklinklink', link);

  return (
    <article key={post.id} className="article-item">
      <img
        className="author-avatar"
        src={post.author.avatar}
        alt={post.author.name}
      />
      <div className="ml-1">
        <div className="mb-1 post-id">Post ID: {post.id}</div>
        <div className="mb-1 author-name">Author: {post.author.name}</div>
        {link == false ? (
          <h2 className="mb-05 post-title">{post.title}</h2>
        ) : (
          <h2 className="mb-05 post-title">
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
    </article>
  );
}

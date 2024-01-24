// Import the createServer function from MirageJS
import { createServer } from 'miragejs';

// Import data from a local JSON file (presumably containing mock data)
import data from './data.json';

// Create a MirageJS server
createServer({
  // Define the API routes
  routes() {
    // Set the namespace for API routes to 'api'
    this.namespace = 'api';

    // Define a GET endpoint for fetching all posts
    this.get('/posts', () => {
      // Return the mock data containing all posts
      return data;
    });

    // Define a GET endpoint for fetching a specific post by ID
    this.get('/posts/:postId', (schema, request) => {
      // Extract the postId parameter from the request
      const postId = request.params.postId;

      // Find the post in the mock data with the matching ID
      const post = data.posts.find((p) => p.id === postId);

      // If the post is found, return it; otherwise, return an error
      if (post) {
        return { post };
      } else {
        return { error: 'Post not found' };
      }
    });
  },
});

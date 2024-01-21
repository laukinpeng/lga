import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    this.get('/posts/:postId', (schema, request) => {
      const postId = request.params.postId;
      const post = data.posts.find((p) => p.id === postId);

      if (post) {
        return { post };
      } else {
        return { error: 'Post not found' };
      }
    });
  },
});

import { endpoints } from '../api/endpoints.js';

export class PostsResource {
  constructor(client, websiteId) {
    this.client = client;
    this.websiteId = websiteId;
  }

  async create(post) {
    const endpoint = endpoints.posts(this.websiteId);
    return this.client.post(endpoint, post);
  }
}
import API from './api';

const commentService = {
  getListComment: async(postId: any, page = 1, parent = 0) => {
    return API.call(`/wp/v2/comments?per_page=5&page=${page}&post=${postId}&parent=${parent}`, undefined, 'GET')
  },

  addComment: async(authorId: any, content: any, parent = 0, token: string, post: any) => {
    return API.callWithAuth('/wp/v2/comments', { authorId, content, post, parent}, 'POST', token)
  }
};

export default commentService;

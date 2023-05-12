import API from './api';

const categoryService = {
  getCategories: async() => {
    return API.call('/wp/v2/categories?per_page=100&page=1', undefined, 'GET')
  },
  getCategoryBySlug: async(slug: any) => {
    return API.call(`/wp/v2/categories?slug=${slug}`, undefined, 'GET')
  }
};

export default categoryService;

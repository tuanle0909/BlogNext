import API from './api';

const postService = {
  // getAll(inputParams = {}) {
  //   return API.call().get('/wp/v2/posts', {
  //     params: {
  //       ...inputParams,
  //       lang: 'vi',
  //     },
  //   });
  // },
  // getArticlesLatest() {
  //   return this.getAll({ per_page: 3, page: 1 });
  // },
  // getArticlesPopular() {
  //   return this.getAll({ per_page: 3, page: 1, orderby: 'post_views' });
  // },
  // getArticlesPaging(page = 1, extrasParam) {
  //   return this.getAll({ page, ...extrasParam });
  // },
  // getArticleDetail(slug) {
  //   return this.getAll({ slug });
  // },
  // getArticlesRelated(author, exclude) {
  //   return this.getAll({ per_page: 3, page: 1, author, exclude });
  // },
  getArticleLatest: async() => {
    return API.call('/wp/v2/posts?per_page=3&page=1&lang=vi', undefined, "GET")
  },

  getArticlePopular: async() => {
    return API.call('/wp/v2/posts?per_page=3&page=1&orderby=post_views&lang=vi', undefined, "GET")
  },

  getAllArticle: async(currentPage = 1, perPage: 2) => {
    return API.call(`/wp/v2/posts?per_page=${perPage}&page=${currentPage}&lang=vi`, undefined, "GET")
  },

  getDetail: async(slug: string[] | string | undefined) => {
    return API.call(`/wp/v2/posts?slug=${slug}`, undefined, 'GET')
  },

  getArticleRelated: async(authorId: any, exclude: any) => {
    return API.call(`/wp/v2/posts?per_page=3&page=1&author=${authorId}&exclude=${exclude}&lang=vi`, undefined, 'GET')
  },
  getArticleByCateId: async(id: any, perPage = 3, currentPage = 1) => {
    return API.call(`/wp/v2/posts?per_page=${perPage}&page=${currentPage}&categories=${id}`, undefined, 'GET')
  },
  getArticleByKeyword: async(keyword: any) => {
    return API.call(`/wp/v2/posts?per_page=3&page=1&search=${keyword}&lang=vi`, undefined, 'GET')
  }
};

export default postService;

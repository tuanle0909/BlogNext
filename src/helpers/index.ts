import atob from 'atob'

export function mappingPostData(post: any) {
  return {
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    shortDesc: post.excerpt.rendered,
    contentHTML: post.content.rendered,
    thumb: post.featured_media_url,
    pubDate: post.date,
    authorId: post.author,
    authorName: post.author_data.nickname,
    authorAvatar: post.author_data.avatar,
    categoriesId: post.categories,
    viewCount: post.view_count,
    commentCount: post.comment_count,
  };
}

export function mappingCommentData(item: any) {
  return {
    id: item.id,
    date: item.date,
    contentHTML: item.content.rendered,
    replyCount: item.comment_reply_count,
    parent: item.parent,
    authorName: item.author_data.nickname,
    authorAvatar: item.author_data.avatar,
  };
}

export function parseJwt (token: string) {
  try {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (err) {
    console.log(err);
    return null
  }
}

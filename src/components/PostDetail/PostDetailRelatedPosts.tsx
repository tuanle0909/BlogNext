
import React from 'react'
import ArticleRelatedPosts from '../ArticleItem/ArticleRelatedPosts'
import { PostType } from '@/pages'

type RelatedPostsPropsData = {
  posts: PostType[]
}
const PostDetailRelatedPosts = ({posts}: RelatedPostsPropsData) => {
  return (
    <div className="related-post">
        <h2 className="related-post__head">Related Posts</h2>
        {posts.map((post: { id: React.Key | null | undefined }) => (
          <ArticleRelatedPosts key={post.id} post={post} />
        ))}
      </div>
  )
}


export default PostDetailRelatedPosts


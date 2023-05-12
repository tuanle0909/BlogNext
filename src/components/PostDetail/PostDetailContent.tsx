import React from 'react'
import PostDetailComments from './PostDetailComments'
import PostDetailRichText from './PostDetailRichText'
import PostDetailTags from './PostDetailTags'

type Props = {
  contentHTML: any,
  thumb: string,
  title: string,
  comments: any
}
export default function PostDetailContent({contentHTML, thumb, title, comments}: Props) {
  return (
    <div className="post-detail__content">
      <div className="thumbnail">
        <img src={thumb} alt={title} />
      </div>
      <div className="content-padding">
        <PostDetailRichText contentHTML={contentHTML}/>

        <PostDetailTags />
        
        <PostDetailComments comments={comments} />
      </div>
    </div>
)
}

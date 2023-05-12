import React from 'react'

type Props = {
  post: any
}
export default function PostDetailHead({post}: Props) {
  return (
    <div className="post-detail__head">
      <div className="tcl-container">
        <h1 className="post-detail__title">
          {post.title.rendered}
        </h1>
        <ul className="post-detail__info">
          <li className="item author">
            By{" "}
            <a href="#">
              <strong>{post.author_data.nickname}</strong>
            </a>
          </li>
          <li className="item date">{post.date}</li>
          <li className="item views">
            {post.view_count} <i className="icons ion-ios-eye" />
          </li>
          <li className="item comments">
            {post.comment_count} <i className="icons ion-ios-chatbubble" />
          </li>
        </ul>
      </div>
    </div>
  )
}

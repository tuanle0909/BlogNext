import React from 'react'

type authorType = {
  authorData: any
}

export default function PostDetailAuthor({authorData}: authorType) {
  return (
    <div className="post-author">
        <div className="post-author__bg-avatar">
        {authorData.avatar ? (
          <img src={authorData.avatar} alt={authorData.name} />
        ) : (
          <img src="https://p7.hiclipart.com/preview/774/118/339/pepe-the-frog-sweden-4chan-pol-internet-meme-frog.jpg" alt={authorData.name} />
        )}
        </div>
        <div className="post-author__nickname">
        <a href="#">{authorData.nickname}</a>
        </div>
        <p className="post-author__desc">
        {authorData.description ? authorData.description : 'Không có mô tả'}
        </p>
    </div>
  )
}

import React from 'react'

type Props = {
  title: string,
  thumb: string
}
export default function ArticleItemThumb({title, thumb}: Props) {
  return (
    <div className="article-item__thumbnail">
      <a href="/">
        <img  src={thumb} alt={title} />
      </a>
    </div>
  )
}

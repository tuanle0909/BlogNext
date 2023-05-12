import React from 'react'

type Props = {
  shortDesc: string
}
export default function ArticleItemDesc({shortDesc}: Props) {
  shortDesc = shortDesc.replace('<p>', '');
  shortDesc = shortDesc.replace('</p>', '');
  shortDesc = shortDesc.split(' ').slice(0, 20).join(' ') + '...';
  return (
    <p className="article-item__desc">{shortDesc}</p>
  )
}

import Link from 'next/link'
import React from 'react'

type Props = {
  title: string,
  slug: string
}

export default function ArticleItemTitle({title, slug}: Props) {
  return (
    <h2 className="article-item__title">
      <Link href={`post/${slug}`}>{title}</Link>
    </h2>
  )
}

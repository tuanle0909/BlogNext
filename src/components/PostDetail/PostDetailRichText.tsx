import React from 'react'

type Props = {
  contentHTML: any
}
export default function PostDetailRichText({contentHTML}: Props) {
  return (
    <div className="rte" dangerouslySetInnerHTML={{ __html: contentHTML }}>
    </div>
  )
}

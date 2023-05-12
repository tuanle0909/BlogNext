import React from 'react'
import PostDetailAuthor from './PostDetailAuthor'
import PostDetailRelatedPosts from './PostDetailRelatedPosts'
import { useGlobalState } from '@/state'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { PostType } from '@/pages'
import postService from '@/service/post'

type authorType = {
  authorData: any,
  posts: PostType[]
}

const PostDetailSidebar = ({authorData, posts}: authorType) => {
  return (
    <div className="post-detail__side">
      <PostDetailAuthor authorData={authorData}/>
      <div className="spacing" />
      <PostDetailRelatedPosts posts={posts} />
    </div>
  )
}

export default PostDetailSidebar

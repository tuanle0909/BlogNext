import PostDetailContent from "@/components/PostDetail/PostDetailContent";
import PostDetailHead from "@/components/PostDetail/PostDetailHead";
import PostDetailSidebar from "@/components/PostDetail/PostDetailSidebar";
import postService from "@/service/post";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";
import { PostType } from "..";
import commentService from "@/service/comment";

type PostDetailProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>

export type PostDetailType = {
  title: string,
  content: any
  featured_media_url: string
}

type PostDetalPropsData = {
  post: PostDetailType[],
  listRelated: PostType[]
  comments: any,
}

const post: PostDetailProps = ({post, listRelated, comments}: PostDetalPropsData) => {
  if (!post) return null
  return (
    <>
      <Head>
        <title>{post.title.rendered}</title>
      </Head>
      <main className="post-detail">
        <div className="spacing" />
        <PostDetailHead post={post}/>
        <div className="spacing" />
        <div className="post-detail__fluid">
          <div className="tcl-container">
            <div className="post-detail__wrapper">
              <PostDetailContent contentHTML={post.content.rendered} thumb={post.featured_media_url} title={post.title.rendered} comments={comments}/>
              <PostDetailSidebar authorData={post.author_data} posts={listRelated}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PostDetalPropsData> = async (context) => {
  const slug = context.params?.slug
  const articleDetail = postService.getDetail(slug)
  const [articleDetailRes] = await Promise.all([(await articleDetail).data])
  const author = articleDetailRes[0].author
  const article = articleDetailRes[0].id
  const listPostRelated = postService.getArticleRelated(author, article)
  const listComments = commentService.getListComment(article, 1, 0)
  const [listPostRelatedRes, listCommentsRes, listCommentsResHeaders] = await Promise.all([(await listPostRelated).data, (await listComments).data, (await listComments).total])
  
  return {
    props: {
      post: articleDetailRes[0],
      listRelated: listPostRelatedRes,
      comments: {
        list: listCommentsRes,
        totalComment: listCommentsResHeaders,
        postId: articleDetailRes[0].id
      }
    },
  }
} 

export default post

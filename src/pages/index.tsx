import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from "next";
import React from "react";
import postService from "@/service/post";
import ArticleLastest from "@/components/ArticleLastest";
import ArticlePopular from "@/components/ArticlePopular";
import categoryService from "@/service/category";
import ArticleGeneral from "@/components/ArticleGeneral";

export type PostType = {
  map(arg0: (e: any, i: any) => JSX.Element): React.ReactNode;
  id: any,
  title: any,
  slug: any,
  shortDesc: any,
  contentHTML: any,
  thumb: any,
  pubDate: any,
  authorId: any,
  authorName: any,
  authorAvatar: any,
  categoriesId: any,
  viewCount: any,
  commentCount: any,
  excerpt: any,
  featured_media_url: any,
  author_data: any
  date: any
  categories: any
}

export type CateType = {
  id: number,
  name: string,
  slug: string
}

type HomePropsData = {
  articleLatest: PostType[],
  articlePopular: PostType[],
  listCategory: CateType[]
}

type HomeProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>

const Home: HomeProps = ({articleLatest, articlePopular, listCategory}: HomePropsData) => {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>
      <ArticleLastest posts={articleLatest}/>
      <ArticlePopular posts={articlePopular} categories={listCategory}/>
      <ArticleGeneral />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomePropsData> = async (context) => {
  const listArticleLatest = postService.getArticleLatest()
  const listArticlePopular = postService.getArticlePopular()
  const listCategory = categoryService.getCategories()
  const [listArticleLatestRes, listArticlePopularRes, listCategoryRes] = await Promise.all([(await listArticleLatest).data, (await listArticlePopular).data, (await listCategory).data])
  return {
    props: {
      articleLatest: listArticleLatestRes || [],
      articlePopular: listArticlePopularRes || [],
      listCategory: listCategoryRes || []
    },
  }
} 

export default Home

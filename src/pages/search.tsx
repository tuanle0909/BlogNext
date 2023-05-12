import ArticleItem from '@/components/ArticleItem'
import React from 'react'
import MainTitle from '@/components/shared/MainTitle'
import Button from '@/components/shared/Button'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import postService from '@/service/post'

type SearchProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>

type SearchPropsData = {
  searchResult: any
}

const search: SearchProps = ({searchResult}) => {
  const router = useRouter()
  const searchStr = router.query.keyword
  const { list, totalPage, totalPosts} = searchResult
  if (!searchStr) router.push('/')

  const handleLoadMore = (e: any) => {
    e.preventDefault()
    
  }
  return (
    <>
      <Head>
        <title>Tìm kiếm cho từ khóa '{searchStr}'</title>
      </Head>
      <div className="articles-list section">
      <div className="tcl-container">
        <MainTitle type="search" btnLabel={''} btnProps={undefined}>
          {totalPosts} kết quả tìm kiếm với từ khóa '{searchStr}'
        </MainTitle>

        <div className="tcl-row tcl-jc-center">
          <div className="tcl-row tcl-jc-center">
            {list.map((post: { id: null | undefined; }) => (
              <div className="tcl-col-12 tcl-col-md-8" key={post.id}>
                <ArticleItem isStyleCard isShowCategoies isShowAvatar={false} isShowDesc={false} post={post} />
              </div>
            ))}
          </div>
        </div>
        <div className="tcl-row tcl-jc-center">
          <Button type="primary" loading={false} loadingPos={""} size="large" as={""} htmlType={undefined} className={""} onClick={handleLoadMore}>
            Xem thêm
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<SearchPropsData> = async (context) => {
  const keyword = context.query?.keyword
  const postByKeyWord = postService.getArticleByKeyword(keyword)
  const [postByKeyWordRes, totalPage, totalPosts] = await Promise.all([(await postByKeyWord).data, (await postByKeyWord).totalPage, (await postByKeyWord).total])
  return {
    props: {
      searchResult: {
        list: postByKeyWordRes,
        totalPage: Number(totalPage),
        totalPosts: Number(totalPosts)
      }
    },
  }
}

export default search;
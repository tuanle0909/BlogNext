import ArticleItem from "@/components/ArticleItem";
import Button from "@/components/shared/Button";
import categoryService from "@/service/category";
import postService from "@/service/post";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { Key, useEffect, useState } from "react";

type PostByCateProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>

type PostByCatelPropssData = {
  articlesByIdCate: any
}

const post: PostByCateProps = ({articlesByIdCate}) => {
    if (!articlesByIdCate) return null
    const { list, idCategory, totalPages } = articlesByIdCate
    const [listPost, setListPost] = useState(list)
    const totalPage = Number(totalPages)
    let currentPage = 1
    
    const handleLoadMore = async(e: any) => {
      e.preventDefault()
      currentPage = currentPage + 1
      const response = await postService.getArticleByCateId(idCategory, 3, currentPage).then(res => {
        return res.data
      })
      if (currentPage === 1) return
      setListPost(listPost.concat(response))
    }
    return (
      <>
        <Head>
          <title>{articlesByIdCate.cateName}</title>
        </Head>
        <div className="articles-list section">
          <div className="tcl-container">
            <div className="tcl-row tcl-jc-center">
              {listPost.map((post: { id: Key | null | undefined; }) => (
                <div className="tcl-col-12 tcl-col-md-8" key={post.id}>
                  <ArticleItem isStyleCard isShowCategoies isShowAvatar={false} isShowDesc={false} post={post} />
                </div>
              ))}
            </div>
            <div className="tcl-row tcl-jc-center">
              {currentPage === totalPage ? null : <Button type="primary" loading={false} loadingPos={""} size="large" as={""} htmlType={undefined} className={""} onClick={handleLoadMore}>
                Xem thêm
              </Button>}
            </div>
          </div>
        </div>
      </>
    );
  }

export const getServerSideProps: GetServerSideProps<PostByCatelPropssData> = async (context) => {
    const slug = context.params?.slug
    const idCate = categoryService.getCategoryBySlug(slug)
    
    const [idCateRes] = await Promise.all([(await idCate).data])
    const id = idCateRes[0].id
    const listArticleByCateId = postService.getArticleByCateId(id)
    const [listArticleByCateIdRes, totalPost, totalPages] = await Promise.all([(await (listArticleByCateId)).data, (await listArticleByCateId).total, ((await listArticleByCateId).totalPage)])
    return {
      props: {
        articlesByIdCate: {
          list: listArticleByCateIdRes,
          cateName: idCateRes[0].name,
          totalPost,
          totalPages,
          idCategory: id
        }
      },
    }
  } 
  
  export default post
  
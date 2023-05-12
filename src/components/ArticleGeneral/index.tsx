import React, { useEffect, useState } from "react";
import ArticleItem from "../ArticleItem";
import Button from "../shared/Button";
import postService from "@/service/post";
import { PostType } from "@/pages";
import { BASE_URL } from "@/constants";

export default function ArticleGeneral() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)

  const handleLoadMore = (e: any) => {
    if (loading) return
    setLoading(true)
    setCurrentPage(currentPage + 1)
  }
  
  useEffect(() => {
    fetch(`${BASE_URL}/wp/v2/posts?per_page=2&page=${currentPage}&lang=vi`)
    .then(res => {
      const totalpage = res.headers.get('x-wp-totalpages')
      setTotalPages(Number(totalpage))
      return res.json()
    })
    .then(res => {
      if (currentPage === 1) {
        setPosts(res)
      }
      setLoading(false)
      setPosts(posts.concat(res))
    })
  }, [currentPage])
  
  return (
    <div className="articles-list section">
      <div className="tcl-container">
        {/* Main Title */}
        <div className="main-title spacing d-flex tcl-jc-between tcl-ais-center">
          <h2>Tất cả bài viết</h2>
          <a href="#" className="btn btn-default">
            View More
          </a>
        </div>
        <div className="tcl-row">
          {posts.map((e, i) => (
            <div className="tcl-col-12 tcl-col-md-6" key={i}>
              <ArticleItem isStyleCard isShowAvatar={false} post={e} isStyleRow={false} isShowDesc={false} isShowCategoies={false} category={[]} />
            </div>
          ))}
        </div>
        <div className="text-center">
          {currentPage < totalPages ? <Button type="primary" size="large" loading={loading} onClick={handleLoadMore} loadingPos={""} as={""} htmlType={undefined} className={""}>
            Tải thêm
          </Button> : null}
        </div>
      </div>
    </div>
  );
}

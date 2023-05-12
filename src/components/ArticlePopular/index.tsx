import React from "react";
import ArticleItem from "../ArticleItem";
import { CateType, PostType } from "@/pages";

type PropsType = {
  posts: PostType[],
  categories: CateType[]
}

const ArticlePopular: React.FC<PropsType> = ({posts, categories}) => {

  if (posts === null) return null
  return (
    <div className="popular-news section bg-white-blue">
      <div className="tcl-container">
        {/* Main Title */}
        <div className="main-title spacing d-flex tcl-jc-between tcl-ais-center">
          <h2>Bài viết phổ biến</h2>
          <a href="#" className="btn btn-default">
            View More
          </a>
        </div>
        {/* End Main Title */}
        <div className="popular-news__list spacing">
          <div className="popular-news__list--left">
            <div className="popular-news__list--row">
              {/* Popular news card */}
              <div className="popular-news__list--card">
                <ArticleItem isStyleCard isShowCategoies isShowDesc post={posts[0]} isStyleRow={false} isShowAvatar category={categories}/>
              </div>
              {/* End Popular news card */}
              {/* Popular news card */}
              <div className="popular-news__list--card">
                <ArticleItem isStyleCard isShowCategoies isShowDesc post={posts[1]} isStyleRow={false} isShowAvatar category={categories}/>
              </div>
              {/* End Popular news card */}
            </div>
          </div>
          <div className="popular-news__list--right">
            <div className="popular-news__list--row">
              {/* Popular news card */}
              <div className="popular-news__list--card">
                <ArticleItem isStyleCard isStyleRow isShowDesc  post={posts[2]} isShowCategoies={false} isShowAvatar category={categories}/>
              </div>
              {/* End Popular news card */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlePopular
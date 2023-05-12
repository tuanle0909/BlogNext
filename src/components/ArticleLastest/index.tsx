import React from "react";
import ArticleItem from "../ArticleItem";
import { PostType } from "@/pages";

type PropsType = {
  posts: PostType[]
}

const ArticleLastest: React.FC<PropsType> = ({posts}) => {

  if (posts === null) return null

  return (
    <div className="latest-news section">
      <div className="tcl-container">
        <div className="main-title spacing">
          <h2>Bài viết mới nhất</h2>
        </div>
        <div className="latest-news__list spacing">
          {posts.map(post => {
            return (
              <div className="latest-news__card" key={post.id}>
                <ArticleItem post={post} isStyleRow={false} isStyleCard={false} isShowDesc={false} isShowCategoies={false} isShowAvatar={true} category={[]}/>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default ArticleLastest

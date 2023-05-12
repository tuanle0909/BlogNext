import React from "react";

type Props = {
  authorName: string,
  authorAvatar: string,
}
export default function ArticleItemAvatar({authorName, authorAvatar}: Props) {
  return (
    <div className="article-item__author-image">
      <a aria-label="John Doe" href="#">
        {authorAvatar ? (
          <img src={authorAvatar} alt={authorName} />
        ) : (
          <img src="https://p7.hiclipart.com/preview/774/118/339/pepe-the-frog-sweden-4chan-pol-internet-meme-frog.jpg" alt={authorName} />
        )}
      </a>
    </div>
  );
}

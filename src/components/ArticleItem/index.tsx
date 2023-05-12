import React from "react";
import cls from "classnames";
import ArticleItemThumb from "./ArticleItemThumb";
import ArticleItemCategories from "./ArticleItemCategories";
import ArticleItemStats from "./ArticleItemStats";
import ArticleItemTitle from "./ArticleItemTitle";
import ArticleItemDesc from "./ArticleItemDesc";
import ArticleItemInfo from "./ArticleItemInfo";
import { CateType, PostType } from "@/pages";
import './article-item.module.css'


type ItemProps = {
    post: PostType,
    isStyleRow: boolean,
    isStyleCard: boolean,
    isShowDesc: boolean,
    isShowCategoies: boolean,
    isShowAvatar: boolean,
    category: CateType[]
}

const ArticleItem: React.FC<ItemProps> = ({
    isStyleRow = false,
    isStyleCard = false,
    isShowDesc = false,
    isShowCategoies = false,
    isShowAvatar = true,
    post,
    category
}: ItemProps) => {
    const classes = cls("article-item", {
        "style-card": isStyleCard,
        "style-row": isStyleRow,
    });
    
    if (!post) return null
    return (
        <article className={classes}>
        <ArticleItemThumb title={post.title} thumb={post.featured_media_url}/>
        <div className="article-item__content">
            {isShowCategoies && <ArticleItemCategories categories={category} categoriesId={post.categories} e={[]}/>}
            {isShowCategoies && <ArticleItemStats />}

            <ArticleItemTitle title={post.title.rendered} slug={post.slug}/>

            {isShowDesc && <ArticleItemDesc shortDesc={post.excerpt.rendered}/>}

            <ArticleItemInfo isShowAvatar={isShowAvatar} authorAvatar={post.author_data.avatar} authorName={post.author_data.nickname} pubDate={post.date}/>
        </div>
        </article>
    );
}

export default ArticleItem

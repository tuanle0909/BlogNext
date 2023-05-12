import Link from "next/link";
import React from "react";

type Props = {
  categoriesId: any,
  e: Props[]
  categories: any
}


export default function ArticleItemCategories({categoriesId, categories}: Props) {
  return (
    <ul className="article-item__categories">
      {categories && categoriesId.map((e: string | number) => {
        const cateName = categories.filter((x: any) => x.id === e)
        return (
          <li key={e}>
            <Link href={`/category/${cateName[0].slug}`} className="btn btn-category">
              {cateName[0].name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

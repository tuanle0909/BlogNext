import React, { useEffect, useState } from 'react'
import CommentForm from './CommentForm';
import { BASE_URL } from '@/constants';
import { PostType } from '@/pages';
import { useGlobalState } from '@/state';

type Props = {
  comment: any
  parentId: any,
  postId: any
}
export default function CommentItem({comment, parentId, postId}: Props) {
    const [isShowForm, setIsShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [childComments, setChildComment] = useState<PostType[]>([])
    const [totalChildComment, setTotalChildComment] = useState(0)
    const [totalPages, setTotalPages] = useState(null)
    const [token] = useGlobalState('token')

    let restTotal = totalChildComment - childComments.length

    
    function handleLoadMore(evt: any) {
        evt.preventDefault();
        setCurrentPage(currentPage + 1)
        fetch(`${BASE_URL}/wp/v2/comments?per_page=3&page=${currentPage === 0 ? '1' : currentPage}&post=${postId}&parent=${parentId}`)
        .then(res => {
          const totalCommentChild = res.headers.get('x-wp-total')
          const totalPageCommentChild = res.headers.get('x-wp-totalpages')
          setTotalChildComment(Number(totalCommentChild))
          setTotalPages(Number(totalPageCommentChild) + 1)
          return res.json()
        })
        .then(res => {  
          if (currentPage === 1) setChildComment(res)
          setChildComment(childComments.concat(res))
        })
    }
    
    function handleToggleCommentForm() {
      setIsShowForm(!isShowForm);
    }
    
    return (
      <li className="item">
        <div className="comments__section">
          <div className="comments__section--avatar">
            <a href="/">
              <img src='/assets/images/avatar1.jpg' alt="" />
            </a>
          </div>
          <div className="comments__section--content">
            <a href="/" className="comments__section--user">
              {comment.author_name}
            </a>
            <p className="comments__section--time">{comment.date}</p>
            <div className="comments__section--text" dangerouslySetInnerHTML={{ __html: comment.content.rendered }}></div>
            <i className="ion-reply comments__section--reply" onClick={handleToggleCommentForm}></i>
          </div>
        </div>
        {/* Reply Comments */}
        <ul className="comments">
          {childComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} parentId={parentId} postId={postId} />
          ))}
        </ul>
        {/* Reply form */}
        <CommentForm isShow={isShowForm} parentId={parentId} token={token} />
          <div className="comments__hidden" style={{marginLeft: '20px'}}>
            {totalPages === currentPage || comment.comment_reply_count === 0 ? null : <a href="/" onClick={handleLoadMore}>
              <i className="icons ion-ios-undo" /> Xem thêm {childComments.length > 0 ? restTotal : comment.comment_reply_count} câu trả lời
            </a>}
          </div>
      </li>
    )
}

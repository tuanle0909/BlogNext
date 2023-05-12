import React, { useEffect, useState } from 'react'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import { PostType } from '@/pages'
import { BASE_URL } from '@/constants'
import { useGlobalState } from '@/state'
import { useRouter } from 'next/router'

type Props = {
  comments: any
}
export default function PostDetailComments({comments}: Props) {
  const [commentsList, setCommentsList] = useState<PostType[]>([])
  const [currentPage, setCurrentPage] = useState(2)
  const [currentSlug, setCurrentSlug] = useState(null)
  const { list, postId, totalComment } = comments
  const [token] = useGlobalState('token')
  const [user] = useGlobalState('currentUser')
  const router = useRouter()
  const { slug } = router.query
  const [newComment] = useGlobalState('newComment')

  useEffect(() => {
    setCommentsList([])
    setCurrentPage(2)
  }, [slug])

  useEffect(() => {
    if (newComment === null) return
    setCommentsList(newComment.concat(commentsList))
  }, [newComment])

  useEffect(() => {
    if (currentPage === 2) setCommentsList(list)
  }, [currentPage, postId])

  const handleLoadMore = async(evt: any) => {
    evt.preventDefault();
    setCurrentPage(currentPage + 1)
    fetch(`${BASE_URL}/wp/v2/comments?per_page=5&page=${currentPage}&post=${postId}&parent=0`)
    .then(res => {
      return res.json()
    })
    .then(res => {
      if (currentPage === 1) setCommentsList(res)
      setCommentsList(commentsList.concat(res))
    })
  }

  let resttotal = Number(totalComment) - commentsList.length

  return (
    <div className="post-detail__comments">
      <CommentForm isShow={true} parentId={0} token={token} user={user} post={postId}/>
      {commentsList.length > 0 ? <p>{totalComment} Bình luận</p> : <p>Bài viết chưa có bình luận</p>}
      {commentsList && commentsList.length > 0 && (
        <ul className="comments">
          {commentsList.map((comment: { id: React.Key | null | undefined }) => (
            <CommentItem key={comment.id} comment={comment} parentId={comment.id} postId={postId}/>
          ))}
        </ul>
      )}
      {commentsList.length === 0 || resttotal <= 0 ? null : <div className="comments__hidden parent">
        <a href="/" onClick={handleLoadMore}>
          <i className="icons ion-ios-undo" /> Xem thêm {resttotal} bình luận
        </a>
      </div>}
    </div>
  )
}

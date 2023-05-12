import Link from 'next/link';
import React, { useState } from 'react'
import Button from '../shared/Button';
import { BASE_URL } from '@/constants';
import commentService from '@/service/comment';
import { useGlobalState } from '@/state';

type Props = {
  parentId: any,
  isShow: boolean,
  token: string
  user: any,
  post: any
}

export default function CommentForm({parentId, isShow = true, token, user, post}: Props) {

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useGlobalState('newComment')
  const isThisParent = parentId === 0
  const placeholder = isThisParent ? 'Viết bình luận...' : 'Viết phản hồi...';
  const btnLabel = isThisParent ? 'Bình luận' : 'Phản hồi';
  
  if (!token) {
    return (
      <p className="text-center">
        Vui lòng <Link href="/login">đăng nhập</Link> để bình luận!
      </p>
    );
  }

  if (!isShow) return <></>;
  
  function handleChangeValue(e: any) {
    setContent(e.target.value);
  }
  
  const handleSubmitComment = () => {
    commentService.addComment(user.id, content, parentId, token, post)
      .then(res => {
        const newArr = [...newComment, res]
        setNewComment(newArr)
    }).then(() => {
      setContent('')
    })
  }

  return (
    <div className="comments__form">
      <div className="comments__form--control">
        <div className="comments__section--avatar">
          <a href="/">
            <img src="/assets/images/avatar1.jpg" alt="" />
          </a>
        </div>
        <textarea onChange={handleChangeValue} placeholder={placeholder} />
      </div>
      <div className="text-right">
        <Button onClick={handleSubmitComment} loading={loading} type={''} loadingPos={''} size={''} as={''} htmlType={undefined} className={''}>
          {btnLabel}
        </Button>
      </div>
    </div>
  );
}

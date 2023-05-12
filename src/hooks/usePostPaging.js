import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/shared/Button';
import { actFetchArticlePagingAsync } from '../store/post/actions';

export function usePostPaging({ extrasParam = {} }) {
  const posts = useSelector((state) => state.POST.articlesPaging.list);
  const currentPage = useSelector((state) => state.POST.articlesPaging.currentPage);
  const totalPages = useSelector((state) => state.POST.articlesPaging.totalPages);
  const total = useSelector((state) => state.POST.articlesPaging.total);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const hasMorePost = currentPage < totalPages;

  function handleLoadMore() {
    if (loading) return;
    setLoading(true);
    dispatch(actFetchArticlePagingAsync(currentPage + 1, extrasParam)).then(() => {
      setLoading(false);
    });
  }

  function showButtonLoadMore() {
    return (
      hasMorePost && (
        <div className="text-center">
          <Button type="primary" size="large" loading={loading} onClick={handleLoadMore}>
            Tải thêm
          </Button>
        </div>
      )
    );
  }

  return {
    total,
    posts,
    showButtonLoadMore,
  };
}

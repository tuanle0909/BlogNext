import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export function useIsAuthenticated() {
  const token = useSelector((state) => state.USER.token);
  const router = useRouter()

  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [token, router]);
}

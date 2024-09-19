'use client';

import { clearCart } from '@/lib/redux/cart/cartSlice';
import { useAppDispatch } from '@/lib/redux/hooks';
import { useEffect } from 'react';

const SuccessPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, []);
  return <div>SuccessPage</div>;
};

export default SuccessPage;

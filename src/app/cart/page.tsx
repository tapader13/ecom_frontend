'use client';
import { Button } from '@/components/ui/button';
import {
  CartItem,
  clearCart,
  deleteCart,
  getCart,
  updateQtyToCart,
} from '@/lib/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { getUser } from '@/lib/redux/user/userSlice';
import { supabase } from '@/lib/supabase/product';
import { AuthContext } from '@/provider/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CartPage = () => {
  const [timeLeft, setTimeLeft] = useState(600);
  const timeCount = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);

    return `${minutes}m : ${seconds < 10 ? '0' : ''}${seconds}s`;
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          dispatch(clearCart());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const cartData = useAppSelector(getCart);
  const handleIncrese = (cart: CartItem) => {
    const newData = { ...cart, quantity: cart.quantity + 1 };
    dispatch(updateQtyToCart(newData));
  };
  const handleDecrese = (cart: CartItem) => {
    const newData = {
      ...cart,
      quantity: cart.quantity > 1 ? cart.quantity - 1 : 1,
    };
    dispatch(updateQtyToCart(newData));
  };
  const handleDelete = (cart: CartItem) => {
    dispatch(deleteCart(cart));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const totalMoney = cartData
    ? cartData.reduce(
        (total, crt) => total + (crt.price || 0) * crt.quantity,
        0
      )
    : 0;
  const user = useAppSelector(getUser);
  console.log(user, 'cart');

  const router = useRouter();
  const handlePay = () => {
    if (user) {
      console.log('User found, proceeding with payment...');
      router.push('/checkout');
    } else {
      console.log('User not found, redirecting to signin...');
      router.push('/signin');
    }
  };
  return (
    <div>
      <div className='bg-[#FCF4F0] flex justify-center items-center py-20'>
        <h1 className='font-young font-extrabold sm:text-5xl text-3xl'>
          Shopping Cart
        </h1>
      </div>
      {timeLeft > 0 && cartData && cartData.length > 0 ? (
        <>
          {' '}
          <div className='flex px-5 sm:px-0 sm:flex-row flex-col items-center justify-center py-14 gap-3 font-albert text-xl'>
            <div className='flex items-start gap-2'>
              {' '}
              <span>
                <img
                  src='/images-removebg-preview.png'
                  alt=''
                  className='h-6 w-6'
                />
              </span>
              <p> These products are limited, checkout within </p>
            </div>
            <Button className='bg-priamry text-white font-albert text-xl'>
              {timeCount(timeLeft)}
            </Button>
          </div>
          <div className='grid px-5 sm:px-0 sm:grid-cols-12 grid-cols-1 cont'>
            <div className='sm:col-span-9'>
              <div className='hidden sm:grid grid-cols-12  font-albert mb-5 font-medium'>
                <h3 className='col-span-6'>Product</h3>
                <h3 className='col-span-2'>Price</h3>
                <h3 className='col-span-2'>Quantity</h3>
                <h3 className='col-span-2'>Total</h3>
              </div>

              {cartData &&
                cartData.map((cart, i) => (
                  <>
                    <div
                      key={i}
                      className=' sm:grid hidden mb-5 grid-cols-12 items-center font-albert font-medium '
                    >
                      <div className='flex gap-3 col-span-6'>
                        <div className='h-32 w-32'>
                          <img
                            src={cart.img}
                            alt=''
                            className='h-full w-full'
                          />
                        </div>
                        <div>
                          <h3>{cart.title}</h3>
                          <p className='text-gray-400'>
                            {cart.size}/{cart.color?.color}
                          </p>
                          <button
                            onClick={() => handleDelete(cart)}
                            className='hover:text-priamry'
                          >
                            remove
                          </button>
                        </div>
                      </div>
                      <div className='col-span-2'>${cart.price}</div>
                      <div className='col-span-2'>
                        <div className='flex w-24 justify-between bg-[#F2F2F2] rounded-full px-2 py-1'>
                          <p
                            onClick={() => handleDecrese(cart)}
                            className='hover:text-priamry cursor-pointer'
                          >
                            -
                          </p>
                          <p>{cart.quantity}</p>
                          <p
                            onClick={() => handleIncrese(cart)}
                            className='hover:text-priamry cursor-pointer'
                          >
                            +
                          </p>
                        </div>
                      </div>
                      <div className='col-span-2'>
                        ${cart.price && cart.price * cart.quantity}
                      </div>
                    </div>
                    {/* <div className='w-full border border-gray-200 my-10' /> */}
                  </>
                ))}
              {cartData &&
                cartData.map((cart, i) => (
                  <>
                    <div
                      key={i}
                      className='mb-5  sm:hidden flex gap-2 items-start font-albert font-medium '
                    >
                      <div className='h-32 w-32'>
                        <img src={cart.img} alt='' className='h-full w-full' />
                      </div>
                      <div>
                        <div>
                          <h3 className='font-bold'>{cart.title}</h3>
                          <p className='text-gray-400'>
                            {cart.size}/{cart.color?.color}
                          </p>
                          <button
                            onClick={() => handleDelete(cart)}
                            className='hover:text-priamry'
                          >
                            remove
                          </button>
                        </div>
                        <div className='w-full border border-gray-200 my-2' />
                        <div className='flex items-center justify-between'>
                          <h3 className='font-semibold'>Price:</h3>
                          <h3>${cart.price}</h3>
                        </div>
                        <div className='w-full border border-gray-200 my-2' />
                        <div className='flex items-center justify-between'>
                          <h3 className='font-semibold'>Quantity:</h3>
                          <div className='flex w-24 justify-between bg-[#F2F2F2] rounded-full px-2 py-1'>
                            <p
                              onClick={() => handleDecrese(cart)}
                              className='hover:text-priamry cursor-pointer'
                            >
                              -
                            </p>
                            <p>{cart.quantity}</p>
                            <p
                              onClick={() => handleIncrese(cart)}
                              className='hover:text-priamry cursor-pointer'
                            >
                              +
                            </p>
                          </div>
                        </div>
                        <div className='w-full border border-gray-200 my-2' />
                        <div className='flex items-center justify-between'>
                          <h3 className='font-semibold'>Total:</h3>$
                          {cart.price && cart.price * cart.quantity}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              <div className='w-full border border-gray-200 my-2 sm:my-10' />
              <div className='text-center'>
                <Button
                  onClick={handleClearCart}
                  className='bg-priamry text-white'
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            <div className='sm:col-span-3 mt-5 sm:mt-0 bg-[#F2F2F2] h-fit p-10'>
              <div className='flex flex-col gap-5'>
                <p>Add Order Note</p>
                <textarea
                  className='p-5'
                  placeholder='How can we help you ?'
                  name=''
                  id=''
                ></textarea>
              </div>
              <div className='flex justify-between items-center font-young text-xl font-bold mt-5'>
                <p>Subtotal</p>
                <p>${totalMoney.toFixed(2)} USD</p>
              </div>
              <div className='mt-5'>
                <Button
                  onClick={handlePay}
                  className='bg-black text-white font-albert font-medium w-full'
                >
                  Check out
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='text-center py-32'>
          <p>Cart Empty</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;

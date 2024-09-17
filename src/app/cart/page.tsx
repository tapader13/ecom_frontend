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
import React, { useEffect, useState } from 'react';

const CartPage = () => {
  const [timeLeft, setTimeLeft] = useState(300);
  const timeCount = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);

    return `${minutes}m : ${seconds < 10 ? '0' : ''}${seconds}s`;
  };
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
  const dispatch = useAppDispatch();
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
  return (
    <div>
      <div className='bg-[#FCF4F0] flex justify-center items-center py-20'>
        <h1 className='font-young font-extrabold text-5xl'>Shopping Cart</h1>
      </div>
      {timeLeft > 0 && cartData && cartData.length > 0 ? (
        <>
          {' '}
          <div className='flex items-center justify-center py-14 gap-3 font-albert text-xl'>
            <span>
              <img
                src='/images-removebg-preview.png'
                alt=''
                className='h-6 w-6'
              />
            </span>
            <p> These products are limited, checkout within </p>
            <Button className='bg-priamry text-white font-albert text-xl'>
              {timeCount(timeLeft)}
            </Button>
          </div>
          <div className='grid grid-cols-12 cont'>
            <div className='col-span-9'>
              <div className=' grid grid-cols-12 font-albert mb-5 font-medium'>
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
                      className=' grid grid-cols-12 items-center font-albert font-medium '
                    >
                      <div className='flex gap-3 col-span-6'>
                        <div className='h-32 w-32'>
                          <img src={cart.img} alt='' />
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
                    <div className='w-full border border-gray-200 my-10' />
                  </>
                ))}
              <div className='text-center'>
                <Button
                  onClick={handleClearCart}
                  className='bg-priamry text-white'
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            <div className='col-span-3 bg-[#F2F2F2] p-10'>
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
                <p>${totalMoney} USD</p>
              </div>
              <div className='mt-5'>
                <Button className='bg-black text-white font-albert font-medium w-full'>
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

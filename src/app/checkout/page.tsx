'use client';
import { Button } from '@/components/ui/button';
import { clearCart, getCart } from '@/lib/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { supabase } from '@/lib/supabase/product';
import { useRouter } from 'next/navigation';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { getUser } from '@/lib/redux/user/userSlice';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISABLE_KEY!
);
const CheckoutPage = () => {
  const cartData = useAppSelector(getCart);
  const router = useRouter();
  const user = useAppSelector(getUser);
  const data1 = useAppSelector(getCart);
  const dispatch = useAppDispatch();

  const totalMoney = cartData.cart
    ? cartData.cart.reduce(
        (total, crt) => total + (crt.price || 0) * crt.quantity,
        0
      )
    : 0;
  const createStripeSession = async () => {
    const stripe = await stripePromise;

    try {
      // Log the data being sent to the API
      console.log('Creating checkout session with data:', {
        items: cartData,
        email: user?.user?.user_metadata?.email,
      });

      const checkoutSession = await axios.post('/api/checkout-sessions', {
        items: cartData,
        email: user?.user?.user_metadata?.email,
      });
      if (checkoutSession?.data?.success) {
        const { data, error } = await supabase.from('orders').insert([
          {
            email: user?.user?.user_metadata?.email,
            stripe_session_id: checkoutSession.data.id,
            items: JSON.stringify(cartData),
          },
        ]);
        dispatch(clearCart());
        if (error) {
          console.log(error, 'error');
        }
      }

      console.log('Checkout Session:', checkoutSession);

      const result = await stripe?.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result?.error) {
        console.log('Stripe Error:', result.error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };
  if (!user) {
    router.push('/signin');
    return null;
  }
  return (
    <div>
      <div className='grid px-5 sm:px-0 sm:grid-cols-12 grid-cols-1 gap-5 cont'>
        <div className='sm:col-span-7 pt-10'>
          <h1 className='font-young text-3xl font-bold'>User Details</h1>

          <div className='flex gap-2 mt-2 items-center'>
            <h3 className='font-albert text-xl font-medium'>Email:</h3>
            <span>{user?.user?.user_metadata?.email}</span>
          </div>
          <div className='flex gap-2 mt-2 items-center'>
            <h3 className='font-albert text-xl font-medium'>Full Name:</h3>
            <span>{user?.user?.user_metadata?.full_name}</span>
          </div>

          {/* <div className='mt-5 text-center'>
            <Button className='bg-black text-white font-albert'>
              Add Details
            </Button>
          </div> */}
        </div>
        <div className='sm:col-span-5 pt-10'>
          {cartData &&
            cartData.cart.map((cart, i) => (
              <>
                <div
                  key={i}
                  className=' flex justify-between gap-5 items-center font-albert font-medium '
                >
                  <div className='flex gap-3 items-center'>
                    <div className='h-20 w-20 rounded-md border border-gray-300 relative'>
                      <img src={cart.img} alt='' className='h-full w-full' />
                      <div className=' absolute h-5 w-5 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm p-1 -top-2.5 -right-2.5'>
                        {cart.quantity}
                      </div>
                    </div>
                    <div>
                      <h3>{cart.title}</h3>
                      <p className='text-gray-400'>
                        {cart.size}/{cart.color?.color}
                      </p>
                    </div>
                  </div>

                  <div className=''>
                    ${cart.price && cart.price * cart.quantity}
                  </div>
                </div>
                <div className='w-full border border-gray-200 my-10' />
              </>
            ))}
          <div className='flex items-center justify-between'>
            <h5>Subtotal ({cartData.cart.length} item) </h5>
            <h5>${totalMoney}</h5>
          </div>
          <div className='flex my-5 items-center justify-between'>
            <h5>Shipping</h5>
            <h5>$10.00</h5>
          </div>
          <div className='flex my-5 items-center justify-between'>
            <h5 className='text-xl font-albert font-medium'>Total </h5>
            <h5>
              USD{' '}
              <span className='text-xl font-albert font-medium'>
                ${totalMoney}
              </span>
            </h5>
          </div>
          <div className='mt-5 text-center'>
            <Button
              onClick={createStripeSession}
              className='bg-blue-500 text-white font-albert'
            >
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

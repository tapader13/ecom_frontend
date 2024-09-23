'use client';
import { FaSearch, FaRegHeart } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { CiShoppingCart } from 'react-icons/ci';
import { useAppSelector } from '@/lib/redux/hooks';
import { getCart } from '@/lib/redux/cart/cartSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/product';

const Header = () => {
  const data = useAppSelector(getCart);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error fetching user data:', error.message);
          return;
        }
        setUser(data);
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };
    getUserData();
  }, []);
  return (
    <div className='w-screen bg-secondary'>
      <div className='cont flex justify-between items-center py-5'>
        <div>
          <Link href={'/'}>
            <h1 className='text-3xl font-bold font-young cursor-pointer'>
              Ecomus
            </h1>
          </Link>
        </div>
        <div></div>
        <div className='flex gap-5 items-center'>
          <div>
            <FaSearch className='h-5 w-5 cursor-pointer hover:text-priamry  transition-all duration-300' />
          </div>
          <div>
            {user ? (
              <img
                className='h-7 w-7 rounded-full'
                src={`${user?.user?.user_metadata?.avatar_url}`}
                alt='profile-img'
              />
            ) : (
              <FiUser className='h-5 w-5 cursor-pointer hover:text-priamry  transition-all duration-300' />
            )}
          </div>
          <div className=' relative'>
            <FaRegHeart className='h-5 w-5 cursor-pointer hover:text-priamry  transition-all duration-300' />
            <span className=' absolute h-4 w-4 bg-priamry  rounded-full text-xs text-white flex items-center justify-center -top-2 -right-2'>
              0
            </span>
          </div>
          <Link href={'/cart'}>
            <div className=' relative'>
              {' '}
              <CiShoppingCart className='h-5 w-5 cursor-pointer hover:text-priamry  transition-all duration-300' />
              {data.length > 0 && (
                <span className=' absolute h-4 w-4 bg-priamry rounded-full text-xs text-white flex items-center justify-center -top-2 -right-2'>
                  {data.length}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

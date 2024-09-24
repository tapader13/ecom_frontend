import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';

const SecondHero = () => {
  return (
    <div className='mt-10 '>
      <div className='cont grid grid-cols-2 grid-rows-2 gap-7'>
        <div className='row-span-2 relative h-[100vh] overflow-hidden '>
          <Image
            src={'/asset 53.jpeg'}
            fill
            alt='sec-1'
            className='hover:scale-110 transition-all duration-700 ease-in-out'
          />
          <Link href={'/collections/tshirts'}>
          <Button className='flex group hover:bg-black hover:text-white left-1/2 bottom-10 -translate-x-1/2 items-center gap-1 mt-12 absolute transition-all duration-300 ease-in-out transform hover:scale-x-105 delay-100'>
            
              <p className='text-albert font-extrabold'>T-shirt & Tops</p>
           

            <div className='hidden delay-100 group-hover:flex transition-all duration-300 ease-in-out transform'>
              <FaAngleRight />
            </div>
          </Button>
           </Link>
        </div>
        <div className=' relative overflow-hidden'>
          <Image
            src={'/asset 54.jpeg'}
            fill
            alt='sec-2'
            className='hover:scale-110 transition-all duration-700 ease-in-out'
          />
          <Link href={'/collections/leggings'}>
          <Button className='flex group hover:bg-black hover:text-white left-1/2 bottom-10 -translate-x-1/2 items-center gap-1 mt-12 absolute transition-all duration-300 ease-in-out transform hover:scale-x-105 delay-100'>
            
              <p className='text-albert font-extrabold'>Leggings</p>
           

            <div className='hidden delay-100 group-hover:flex transition-all duration-300 ease-in-out transform'>
              <FaAngleRight />
            </div>
          </Button>
           </Link>
        </div>
        <div className=' relative overflow-hidden'>
          <Image
            src={'/asset 55.jpeg'}
            fill
            alt='sec-3'
            className='hover:scale-110 transition-all duration-700 ease-in-out'
          />
          <Link href={'/collections/sportbras'}>
            <Button className='flex group hover:bg-black hover:text-white left-1/2 bottom-10 -translate-x-1/2 items-center gap-1 mt-12 absolute transition-all duration-300 ease-in-out transform hover:scale-x-105 delay-100'>
              <p className='text-albert font-extrabold'>Sport Bras</p>

              <div className='hidden delay-100 group-hover:flex transition-all duration-300 ease-in-out transform'>
                <FaAngleRight />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SecondHero;

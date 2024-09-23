import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';

const SpecialPart = () => {
  return (
    <div className='my-20'>
      <div className='cont grid grid-cols-12 gap-28 items-center'>
        <div className='col-span-6 overflow-hidden relative w-full h-[500px] group'>
          <Image alt='special image' src={'/asset 83.jpeg'} fill />
          <div className=' absolute left-0 bottom-0 w-[50%] bg-[rgba(255,255,255,.7)] transition-all duration-700 transform -translate-y-full  group-hover:-translate-y-0 h-full'></div>
          <div className=' absolute right-0 bottom-0 w-[50%] bg-[rgba(255,255,255,.7)] transition-all duration-700 transform translate-y-full  group-hover:translate-y-0 h-full'></div>
        </div>
        <div className='col-span-6'>
          <p className='text-xs mb-5 '>LEAVE YOUR MARK</p>
          <h1 className=' font-young text-6xl font-semibold'>
            We&lsquo;re Ecfriend Collective
          </h1>
          <p className='font-albert font-normal my-10'>
            Since our inception in late 2012, ECfriend has had one intention; to
            help build resilient human beings through performance, innovation,
            sustainability and functionality.
          </p>
          <Button className=' text-xl font-albert border border-tertiary px-10 hover:border-priamry transition-all duration-300 hover:text-priamry '>
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecialPart;

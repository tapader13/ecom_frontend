'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

const BraSpotlite = () => {
  const [timeLeft, setTimeLeft] = useState(8640000);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);
  const days = Math.floor(timeLeft / (3600 * 24));
  const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = Math.floor(timeLeft % 60);
  return (
    <div>
      <div className='cont  mt-20 mb-10 relative w-full h-[600px] rounded-2xl overflow-hidden '>
        <Image src={'/asset 68.jpeg'} alt='bra_spot_img' fill />
        <div className=' absolute p-10 -translate-y-1/2 transform left-0 top-1/2 w-full'>
          <h1 className='text-5xl font-bold font-young'>Bra SpotLight</h1>
          <p className='my-5 font-normal font-albert'>
            Let&rsquo;s go from the top
          </p>
          <div className='flex items-center gap-5'>
            <div className='h-24 w-24 flex-col rounded-full bg-white text-accent flex items-center justify-center'>
              <h3 className='text-3xl font-albert font-bold'>{days}</h3>
              <h3 className='text-xs  font-normal font-albert text-tertiary uppercase'>
                days
              </h3>
            </div>
            <div className='h-24 w-24 flex-col rounded-full bg-white text-accent flex items-center justify-center'>
              <h3 className='text-3xl font-albert font-bold'>{hours}</h3>
              <h3 className=' text-xs font-normal font-albert text-tertiary uppercase'>
                hours
              </h3>
            </div>
            <div className='h-24 w-24 flex-col rounded-full bg-white text-accent flex items-center justify-center'>
              <h3 className='text-3xl font-albert font-bold'>{minutes}</h3>
              <h3 className='text-xs  font-normal font-albert text-tertiary uppercase'>
                mins
              </h3>
            </div>
            <div className='h-24 w-24 flex-col rounded-full bg-white text-accent flex items-center justify-center'>
              <h3 className='text-3xl font-albert font-bold'>{seconds}</h3>
              <h3 className='text-xs  font-normal font-albert text-tertiary uppercase'>
                secs
              </h3>
            </div>
          </div>
          <Button className='mt-5 bg-black text-secondary font-albert'>
            Shop now - $129
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BraSpotlite;

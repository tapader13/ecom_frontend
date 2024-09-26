import React from 'react';
import { IoMdReturnLeft } from 'react-icons/io';
import { IoCubeOutline } from 'react-icons/io5';
import { MdOutlinePayment } from 'react-icons/md';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
const HeroFooter = () => {
  return (
    <div className='bg-[#e9f5e0] py-8'>
      <div className='cont mx-auto hidden sm:grid grid-cols-3 gap-5'>
        <div className='flex items-center gap-3'>
          <div>
            <IoCubeOutline className=' text-[32px]' />
          </div>
          <div>
            <h1>Free Shipping on Orders Over $120</h1>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <div>
            <MdOutlinePayment className=' text-[32px]' />
          </div>
          <div>
            <h1>Versatile and Adaptable Payment Solutions</h1>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <div>
            <IoMdReturnLeft className=' text-[32px]' />
          </div>
          <div>
            <h1>14-Day Hassle-Free Return Policy</h1>
          </div>
        </div>
      </div>
      <div className='block sm:hidden'>
        <Carousel
          opts={{
            align: 'start',
          }}
          className='w-full px-2'
        >
          <CarouselContent>
            <CarouselItem>
              <div className='p-3'>
                <div className='flex items-center gap-3'>
                  <div>
                    <IoCubeOutline className=' text-[32px]' />
                  </div>
                  <div>
                    <h1>Free Shipping on Orders Over $120</h1>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className='p-3'>
                <div className='flex items-center gap-3'>
                  <div>
                    <MdOutlinePayment className=' text-[32px]' />
                  </div>
                  <div>
                    <h1>Versatile and Adaptable Payment Solutions</h1>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className='p-3'>
                <div className='flex items-center gap-3'>
                  <div>
                    <IoMdReturnLeft className=' text-[32px]' />
                  </div>
                  <div>
                    <h1>14-Day Hassle-Free Return Policy</h1>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default HeroFooter;

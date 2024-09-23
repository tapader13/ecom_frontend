'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useSupabase } from '@/lib/hooks/useSupabase';
import { useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { QuickDialog } from './QuickDialog';
import Link from 'next/link';

export function CarosulNewRelase() {
  const [hoveredImages, setHoveredImages] = useState<{ [key: number]: string }>(
    {}
  );
  const [selectedColors, setSelectedColors] = useState<{
    [key: number]: string | null;
  }>({});

  const handleMouseEnter = (id: number, image: string, color: string) => {
    setHoveredImages((prev) => ({ ...prev, [id]: image }));
    setSelectedColors((prev) => ({ ...prev, [id]: color }));
  };
  const { products, getNewReleaseProduct } = useSupabase();
  useEffect(() => {
    getNewReleaseProduct();
  }, []);

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className='w-full'
    >
      <CarouselContent>
        {products.map((item) => {
          const hoveredImage = hoveredImages[item.id] || item.img;
          const selectedColor = selectedColors[item.id];
          console.log(hoveredImage, selectedColor, 2);
          return (
            <CarouselItem key={item.id} className='md:basis-1/2 lg:basis-1/4'>
              <div className='p-3'>
                <Card className='shadow-none border-none'>
                  <CardContent className='p-1'>
                    <div className='w-full group'>
                      <Link
                        href={`products/${item.title}?variant=${hoveredImage}`}
                      >
                        <div className='relative w-full h-[450px] overflow-hidden'>
                          <img
                            src={hoveredImage}
                            className='transition-all duration-1000 hover:opacity-0 '
                            alt='newrelease_img'
                          />
                          <img
                            src={item.img1}
                            alt='newrelease_hover_img'
                            className='absolute top-0 left-0 transition-all duration-1000 opacity-0 scale-100 hover:opacity-100 hover:scale-110'
                          />
                          <div className=' absolute bottom-0  transition-all duration-700  left-0 right-0'>
                            <div className='flex gap-2 items-center  w-1/4 mx-auto justify-center mb-3'>
                              <div
                                className=' relative bg-white p-2 hover:bg-black hover:text-white'
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                              >
                                {' '}
                                <QuickDialog id={item.id.toString()} />
                              </div>
                              <div className=' relative bg-white p-2 hover:bg-black hover:text-white'>
                                {' '}
                                <FaRegEye className='h-5 w-5 cursor-pointer  transition-all duration-300' />
                              </div>
                            </div>
                            <div className='flex gap-2 bg-black/30 text-xs py-2 text-white justify-center   '>
                              <p>S</p>
                              <p>M</p>
                              <p>L</p>
                              <p>XL</p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div>
                        <p className='text-tertiary hover:text-priamry transition-all duration-300 font-albert mt-5'>
                          {item.title}
                        </p>
                        <p className='mt-3 mb-3 font-albert text-black font-bold'>
                          ${item.price}
                        </p>
                        <div className='flex gap-3'>
                          {item.colors.map((it) => (
                            <div
                              key={it.color}
                              className={`h-7 w-7 rounded-full cursor-pointer border-[1px] p-1 ${
                                selectedColor === it.color
                                  ? 'border-black p-[5px]'
                                  : 'border-gray-200 hover:p-[5px] hover:border-black'
                              } transition-all duration-300`}
                              onMouseEnter={() =>
                                handleMouseEnter(item.id, it.fakeImg, it.color)
                              }
                            >
                              <div
                                className='w-full h-full rounded-full'
                                style={{ backgroundColor: it.hex }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

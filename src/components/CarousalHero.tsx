import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';
export function CarousalHero() {
  return (
    <Carousel className='w-screen'>
      <CarouselContent>
        <CarouselItem>
          <div className=''>
            <Card>
              <CardContent className='p-0'>
                <div className='bg-[url("/asset%2050.jpeg")] bg-cover bg-center bg-no-repeat sm:h-screen h-[500px] flex items-center'>
                  <div className='cont'>
                    <h1 className='sm:text-7xl pl-10 sm:pl-0 text-3xl sm:leading-[90px] font-young leading-[45px]'>
                      Leaving <br /> on a cloud.
                    </h1>
                    <p className='my-3 hidden sm:inline-block text-tertiary text-xl'>
                      You have to feel it to belive it.
                    </p>
                    <Link href={`/collections/frontpage`}>
                      <Button className='flex items-center gap-1 ml-10 sm:ml-0 mt-12'>
                        <p className='text-albert font-normal'>
                          Shop collection
                        </p>
                        <div className='h-5 w-5 mt-1'>
                          <FaAngleRight />
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className=''>
            <Card>
              <CardContent className='p-0'>
                <div className='bg-[url("/asset%2051.jpeg")] bg-cover bg-center bg-no-repeat sm:h-screen h-[500px] flex items-center'>
                  <div className='cont'>
                    <h1 className='sm:text-7xl pl-10 sm:pl-0 text-3xl sm:leading-[90px] font-young leading-[45px]'>
                      Unleash <br /> your strength.
                    </h1>
                    <p className='my-3 hidden sm:inline-block text-tertiary text-xl'>
                      You have to feel it to belive it.
                    </p>
                    <Link href={`/collections/frontpage`}>
                      <Button className='flex items-center gap-1 ml-10 sm:ml-0 mt-12'>
                        <p className='text-albert font-normal'>
                          Shop collection
                        </p>
                        <div className='h-5 w-5 mt-1'>
                          <FaAngleRight />
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className=''>
            <Card>
              <CardContent className='p-0'>
                <div className='bg-[url("/asset%2052.jpeg")] bg-cover bg-center bg-no-repeat sm:h-screen h-[500px] flex items-center'>
                  <div className='cont'>
                    <h1 className='sm:text-7xl pl-10 sm:pl-0 text-3xl sm:leading-[90px] font-young leading-[45px]'>
                      Elevate <br /> your fitness.
                    </h1>
                    <p className='my-3 hidden sm:inline-block text-tertiary text-xl'>
                      You have to feel it to belive it.
                    </p>
                    <Link href={`/collections/frontpage`}>
                      <Button className='flex items-center gap-1 ml-10 sm:ml-0 mt-12'>
                        <p className='text-albert font-normal'>
                          Shop collection
                        </p>
                        <div className='h-5 w-5 mt-1'>
                          <FaAngleRight />
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

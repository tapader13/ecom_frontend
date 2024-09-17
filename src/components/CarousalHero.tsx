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
export function CarousalHero() {
  return (
    <Carousel className='w-screen'>
      <CarouselContent>
        <CarouselItem>
          <div className=''>
            <Card>
              <CardContent className='p-0'>
                <div className='bg-[url("/asset%2050.jpeg")] bg-cover bg-center bg-no-repeat h-screen flex items-center'>
                  <div className='cont'>
                    <h1 className='text-7xl leading-[90px] font-young'>
                      Leaving <br /> on a cloud.
                    </h1>
                    <p className='my-3 text-tertiary text-xl'>
                      You have to feel it to belive it.
                    </p>
                    <Button className='flex items-center gap-1 mt-12'>
                      <p className='text-albert font-normal'>Shop collection</p>
                      <div className='h-5 w-5 mt-1'>
                        <FaAngleRight />
                      </div>
                    </Button>
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
                <div className='bg-[url("/asset%2051.jpeg")] bg-cover bg-center bg-no-repeat h-screen flex items-center'>
                  <div className='cont'>
                    <h1 className='text-7xl leading-[90px] font-young'>
                      Unleash <br /> your strength.
                    </h1>
                    <p className='my-3 text-tertiary text-xl'>
                      You have to feel it to belive it.
                    </p>
                    <Button className='flex items-center gap-1 mt-12'>
                      <p className='text-albert font-normal'>Shop collection</p>
                      <div className='h-5 w-5 mt-1'>
                        <FaAngleRight />
                      </div>
                    </Button>
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
                <div className='bg-[url("/asset%2052.jpeg")] bg-cover bg-center bg-no-repeat h-screen flex items-center'>
                  <div className='cont'>
                    <h1 className='text-7xl leading-[90px] font-young'>
                      Elevate <br /> your fitness.
                    </h1>
                    <p className='my-3 text-tertiary text-xl'>
                      You have to feel it to belive it.
                    </p>
                    <Button className='flex items-center gap-1 mt-12'>
                      <p className='text-albert font-normal'>Shop collection</p>
                      <div className='h-5 w-5 mt-1'>
                        <FaAngleRight />
                      </div>
                    </Button>
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

'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useAppDispatch } from '@/lib/redux/hooks';
import { updateQtyToCartBundle } from '@/lib/redux/cart/cartSlice';
import { useSupabase } from '@/lib/hooks/useSupabase';

const Boundle = () => {
  const [selectedOption, setSelectedOption] = useState('l/pink');
  const [selectedOption2, setSelectedOption2] = useState('l/black');
  const [selectedOption3, setSelectedOption3] = useState('x/navy');
  const [hoverDiv, setHoverDiv] = useState(0);
  const dispatch = useAppDispatch();

  const { product1, getBoundleProduct1 } = useSupabase();
  const { product2, getBoundleProduct2 } = useSupabase();
  const { product3, getBoundleProduct3 } = useSupabase();
  useEffect(() => {
    getBoundleProduct1('2');
    getBoundleProduct2('5');
    getBoundleProduct3('12');
  }, []);
  const handleBundle = () => {
    dispatch(
      updateQtyToCartBundle({
        price: product1?.price,
        quantity: 1,
        size: selectedOption.split('/')[0],
        color: product1?.colors.find(
          (color) => color.color === selectedOption.split('/')[1]
        ),
        title: product1?.title,
        id: product1?.id,
        img: product1?.img,
        category: product1?.category,
      })
    );
    dispatch(
      updateQtyToCartBundle({
        price: product2?.price,
        quantity: 1,
        size: selectedOption2.split('/')[0],
        color: product2?.colors.find(
          (color) => color.color === selectedOption2.split('/')[1]
        ),
        title: product2?.title,
        id: product2?.id,
        img: product2?.img,
        category: product2?.category,
      })
    );
    dispatch(
      updateQtyToCartBundle({
        price: product3?.price,
        quantity: 1,
        size: selectedOption3.split('/')[0],
        color: product3?.colors.find(
          (color) => color.color === selectedOption3.split('/')[1]
        ),
        title: product3?.title,
        id: product3?.id,
        img: product3?.img,
        category: product3?.category,
      })
    );
  };

  return (
    <div className='mt-7'>
      <div className='cont bg-[#F8F8F8] px-10 py-16 grid grid-cols-2'>
        <div>
          <p className='text-xs '>SHOP THIS LOOK</p>
          <h1 className='font-young text-5xl  my-5'>Bundle & Save</h1>

          <div
            className={`flex gap-10 mt-10 transition-all duration-500 ${
              hoverDiv === 1
                ? ' opacity-100'
                : hoverDiv !== 0
                ? 'opacity-50 pointer-events-none'
                : ''
            }`}
          >
            <div className='relative w-48 h-64'>
              <Image
                src={
                  product2?.colors.find(
                    (color) => color.color === selectedOption2.split('/')[1]
                  )?.fakeImg || '/asset 79.jpeg'
                }
                alt='bundle_img2'
                fill
              />
            </div>
            <div>
              <h4 className='font-albert text-tertiary'>{product2?.title}</h4>
              <p className='font-albert my-2 font-semibold'>
                $ {product2?.price}
              </p>
              <div className='mt-3'>
                <select
                  className='px-3 w-44 py-2 bg-transparent border border-neutral-200 rounded-md text-tertiary'
                  name=''
                  id=''
                  value={selectedOption2}
                  onChange={(e) => setSelectedOption2(e.target.value)}
                >
                  {product2?.size.map((size, index) => (
                    <option
                      key={`${size}/${product2?.colors[index].color}`}
                      value={`${size}/${product2?.colors[index].color}`}
                    >
                      {`${size}/${product2?.colors[index].color}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div
            className={`flex mt-10 gap-10 transition-all duration-500 ${
              hoverDiv === 2
                ? ' opacity-100'
                : hoverDiv !== 0
                ? 'opacity-50 pointer-events-none'
                : ''
            }`}
          >
            <div className='relative w-48 h-64'>
              <Image
                src={
                  product3?.colors.find(
                    (color) => color.color === selectedOption3.split('/')[1]
                  )?.fakeImg || '/asset 79.jpeg'
                }
                alt='bundle_img1'
                fill
              />
            </div>
            <div>
              <h4 className='font-albert text-tertiary'>{product3?.title}</h4>
              <p className='font-albert my-2 font-semibold'>
                $ {product3?.price}
              </p>
              <div className='mt-3'>
                <select
                  className='px-3 w-44 py-2 bg-transparent border border-neutral-200 rounded-md text-tertiary'
                  name=''
                  id=''
                  value={selectedOption3}
                  onChange={(e) => setSelectedOption3(e.target.value)}
                >
                  {product3?.size.map((size, index) => (
                    <option
                      key={`${size}/${product3?.colors[index].color}`}
                      value={`${size}/${product3?.colors[index].color}`}
                    >
                      {`${size}/${product3?.colors[index].color}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div
            className={`flex gap-10 mt-10 transition-all duration-500 ${
              hoverDiv === 3
                ? ' opacity-100'
                : hoverDiv !== 0
                ? 'opacity-50 pointer-events-none'
                : ''
            }`}
          >
            <div className='relative w-48 h-64'>
              <Image
                src={
                  product1?.colors.find(
                    (color) => color.color === selectedOption.split('/')[1]
                  )?.fakeImg || '/asset 79.jpeg'
                }
                alt='bundle_img1'
                fill
              />
            </div>
            <div>
              <h4 className='font-albert text-tertiary'>{product1?.title}</h4>
              <p className='font-albert my-2 font-semibold'>
                $ {product1?.price}
              </p>
              <div className='mt-3'>
                <select
                  className='px-3 w-44 py-2 bg-transparent border border-neutral-200 rounded-md text-tertiary'
                  name=''
                  id=''
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  {product1?.size.map((size, index) => (
                    <option
                      key={`${size}/${product1?.colors[index].color}`}
                      value={`${size}/${product1?.colors[index].color}`}
                    >
                      {`${size}/${product1?.colors[index].color}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <Button
            className='mt-10 font-albert w-9/12 bg-black text-white'
            onClick={handleBundle}
          >
            Add Selected To Cart - $253.94 USD
          </Button>
        </div>
        <div className='relative w-full rounded-lg overflow-hidden'>
          <Image alt='boundle_img' src={'/asset 82.jpeg'} fill />
          <div
            onMouseEnter={() => setHoverDiv(1)}
            onMouseLeave={() => setHoverDiv(0)}
            className=' absolute hover:scale-125 transition-all duration-300 cursor-pointer right-[35%] top-[25%] h-7 w-7 rounded-full flex items-center justify-center bg-white'
          >
            <div className='h-2 w-2 bg-black rounded-full'></div>
          </div>
          <div
            onMouseEnter={() => setHoverDiv(2)}
            onMouseLeave={() => setHoverDiv(0)}
            className=' absolute hover:scale-125 transition-all duration-300 left-[10%] bottom-[40%] cursor-pointer h-7 w-7 rounded-full flex items-center justify-center bg-white'
          >
            <div className='h-2 w-2 bg-black rounded-full'></div>
          </div>
          <div
            onMouseEnter={() => setHoverDiv(3)}
            onMouseLeave={() => setHoverDiv(0)}
            className=' absolute hover:scale-125 transition-all duration-300 right-[15%] bottom-[40%] cursor-pointer h-7 w-7 rounded-full flex items-center justify-center bg-white'
          >
            <div className='h-2 w-2 bg-black rounded-full'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boundle;

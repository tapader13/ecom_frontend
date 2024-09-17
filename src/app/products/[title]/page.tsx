'use client';

import { BreadCrump } from '@/components/BreadCrump';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSupabase } from '@/lib/hooks/useSupabase';
import { addToCart, getCart } from '@/lib/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
const ProductDetails = ({ params }: { params: { title: string } }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get('variant');
  const data = useAppSelector(getCart);
  const title = decodeURIComponent(params.title);
  const { proDlts, getProductDlts } = useSupabase();
  const [size, setSize] = useState(0);
  const [selectedColors, setSelectedColors] = useState<number>(1);
  const [imageSrc, setImageSrc] = useState(query);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (query) {
      getProductDlts(query.toString());
    }
  }, [query]);
  const { toast } = useToast();
  const handleClickColor = (color: number) => {
    setSelectedColors(color);
    const imgSelect = proDlts?.colors[color]?.fakeImg;
    if (imgSelect) {
      setImageSrc(imgSelect);
    }
  };
  const handleAddToCart = () => {
    const addData = {
      price: proDlts?.price,
      quantity: 1,
      size: proDlts?.size[size],
      color: proDlts?.colors[selectedColors],
      title: proDlts?.title,
      id: proDlts?.id,
      img: proDlts?.img,
      category: proDlts?.category,
    };
    if (
      addData.price &&
      addData.size &&
      addData.color &&
      addData.title &&
      addData.id &&
      addData.img &&
      addData.category
    ) {
      const findId = data.find((dt) => dt.id === addData.id);
      const findSize = data.find((dt) => dt.size === addData.size);
      const findColor = data.find((dt) => dt.color === addData.color);
      if (!findId || !findSize || !findColor) {
        dispatch(addToCart(addData));
        toast({
          description: 'Product Add To Cart.',
        });
      } else {
        toast({
          variant: 'destructive',
          description: 'Product Already Added.',
        });
      }
    }
  };
  const handleImgChange = (img: string, i: number) => {
    setImageSrc(img);
    setSelectedColors(i);
  };
  // console.log(proDlts, 'prd');
  return (
    <div className='cont'>
      <div className='my-5'>
        <BreadCrump title={title} />
      </div>
      <div className='grid grid-cols-2 gap-10 '>
        <div className='grid grid-cols-12 gap-3 h-[500px]'>
          <div className='col-span-2 h-full gap-3 flex flex-col  justify-between'>
            {proDlts &&
              proDlts?.colors?.map((img, i) => (
                <div
                  key={i}
                  onClick={() => handleImgChange(img.fakeImg, i)}
                  className={` cursor-pointer h-36 rounded-lg overflow-hidden w-full ${
                    imageSrc === img.fakeImg
                      ? ' border-4 border-black'
                      : 'border-4 border-transparent'
                  }`}
                >
                  <img src={img.fakeImg} className='h-full w-full' alt='' />
                </div>
              ))}
          </div>
          <div className='col-span-10'>
            {proDlts && (
              <div className=''>
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: 'Product Image',
                      isFluidWidth: true, // Make width responsive
                      src: imageSrc || proDlts.img,
                      height: 500,
                    },
                    largeImage: {
                      src: imageSrc || proDlts.img,
                      width: 1200,
                      height: 1800,
                    },
                    isHintEnabled: true,
                    shouldHideHintAfterFirstActivation: false,
                    enlargedImagePosition: 'beside', // Show enlarged image beside
                    enlargedImageContainerDimensions: {
                      width: '90%',
                      height: '80%',
                    },
                    enlargedImageContainerStyle: {
                      zIndex: 1000,
                    },
                    isEnlargedImagePortalEnabledForTouch: true,
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <div className=''>
            <h2 className='text-3xl font-semibold font-young'>
              {proDlts?.title}
            </h2>
            <p className='mt-2 font-albert text-2xl font-medium'>
              ${proDlts?.price}
            </p>
          </div>
          <div className='my-5'>
            <p className='mb-3'>
              {proDlts && proDlts.size ? (
                <span>Size :{proDlts?.size[size]}</span>
              ) : (
                'not found'
              )}
            </p>
            <div className=' flex gap-3'>
              {proDlts?.size?.map((siz, i) => (
                <Button
                  key={siz}
                  onClick={() => setSize(i)}
                  className={`rounded-full border-tertiary/35 border bg-white text-black hover:border-black hover:border ${
                    size === i ? 'bg-black text-white' : ''
                  }`}
                >
                  {siz}
                </Button>
              ))}
            </div>
          </div>
          <div className='mb-5'>
            <p className='mb-3'>
              {proDlts && proDlts.colors && proDlts.colors.length > 0 ? (
                <span>Color: {proDlts?.colors[selectedColors].color}</span>
              ) : (
                'not found'
              )}
            </p>
            <div className='flex gap-3'>
              {proDlts &&
                proDlts.colors.map((it, i) => (
                  <div
                    key={it.color}
                    className={`h-7 w-7 rounded-full cursor-pointer border-[1px] p-1 ${
                      selectedColors === i
                        ? 'border-black p-[5px]'
                        : 'border-gray-200 hover:p-[5px] hover:border-black'
                    } transition-all duration-300`}
                    onClick={() => handleClickColor(i)}
                  >
                    <div
                      className='w-full h-full rounded-full'
                      style={{ backgroundColor: it.hex }}
                    ></div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <Button
              onClick={handleAddToCart}
              className='bg-black px-10 text-white font-albert font-bold'
              type='submit'
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

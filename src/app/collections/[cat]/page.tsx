'use client';
import { RiFilter3Line } from 'react-icons/ri';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

const CategoryPage = () => {
  return (
    <div>
      <div className='bg-[#FCF3F2] flex flex-col items-center justify-center py-14'>
        <h1 className=' text-4xl font-normal'>New Arrival</h1>
        <p className='mt-3 text-tertiary'>
          Shop through our latest selection of Fashion
        </p>
      </div>
      <div className='cont'>
        <div className='flex justify-between my-10'>
          <div>
            <Sheet>
              <SheetTrigger className='rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white flex items-center gap-1'>
                <span>
                  <RiFilter3Line />
                </span>{' '}
                FILTER
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                  <Accordion type='multiple' className='w-full'>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger>Product categories</AccordionTrigger>
                      <AccordionContent>
                        <ul className='flex flex-col gap-3'>
                          <Link
                            className='hover:text-priamry transition-all duration-300'
                            href={'/collections/fashion'}
                          >
                            Fashion
                          </Link>
                          <Link
                            className='hover:text-priamry transition-all duration-300'
                            href={'/collections/man'}
                          >
                            Man
                          </Link>
                          <Link
                            className='hover:text-priamry transition-all duration-300'
                            href={'/collections/women'}
                          >
                            Women
                          </Link>
                          <Link
                            className='hover:text-priamry transition-all duration-300'
                            href={'/collections/newrelease'}
                          >
                            Newrelease
                          </Link>
                          <Link
                            className='hover:text-priamry transition-all duration-300'
                            href={'/collections/boundle'}
                          >
                            Boundle
                          </Link>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2'>
                      <AccordionTrigger>Price</AccordionTrigger>
                      <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-3'>
                      <AccordionTrigger>Color</AccordionTrigger>
                      <AccordionContent>
                        Yes. It&apos;s animated by default, but you can disable
                        it if you prefer.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-4'>
                      <AccordionTrigger>Size</AccordionTrigger>
                      <AccordionContent>
                        Yes. It&apos;s animated by default, but you can disable
                        it if you prefer.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div>
            {' '}
            <Select>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a fruit' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value='apple'>Apple</SelectItem>
                  <SelectItem value='banana'>Banana</SelectItem>
                  <SelectItem value='blueberry'>Blueberry</SelectItem>
                  <SelectItem value='grapes'>Grapes</SelectItem>
                  <SelectItem value='pineapple'>Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

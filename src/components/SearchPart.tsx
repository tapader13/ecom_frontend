'use client';
import React, { useEffect, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { useSupabase } from '@/lib/hooks/useSupabase';
import CardData from './CardData';

const SearchPart = () => {
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState('');
  const { menProduct, getMenProduct, srcProduct, getSrcProduct } =
    useSupabase();
  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    getMenProduct('man');
  }, []);
  const handleSearch = () => {
    if (search.trim() !== '') {
      getSrcProduct(search);
    }
  };
  // console.log(srcProduct);
  return (
    <div>
      <FaSearch
        className='h-5 w-5 cursor-pointer hover:text-priamry  transition-all duration-300 '
        onClick={handleToggle}
      />
      {toggle && (
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className='fixed inset-0 bg-white py-14 z-50 gap-3 '
        >
          <div className='cont'>
            <h1 className='text-accent text-center font-young text-3xl mb-5 font-bold'>
              Search our site
            </h1>
          </div>
          <div className='flex cont flex-col sm:flex-row items-center justify-center gap-3 w-full'>
            <motion.input
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={handleSearch}
              placeholder='Search and press enter...'
              className='sm:w-[40%] h-[50px] bg-white border border-gray-300 rounded-full py-[6px] px-5 text-xl focus:outline-none focus:ring-2 focus:ring-quaternary'
            />
          </div>
          <Button
            className='bg-transparent border-none text-quinary text-2xl shadow-none absolute top-5 right-5 '
            onClick={handleToggle}
          >
            <FaTimes />
          </Button>
          <div className='cont mt-5 overflow-auto max-h-[75vh] '>
            <h2 className='text-accent font-young text-2xl mb-5 font-bold'>
              Need some inspiration?
            </h2>
            {search === '' ? (
              <CardData dynamicProduct={menProduct} search={true} />
            ) : (
              <CardData dynamicProduct={srcProduct} search={true} />
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchPart;

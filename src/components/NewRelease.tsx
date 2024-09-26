import React from 'react';
import { CarosulNewRelase } from './CarosulNewRelase';

const NewRelease = () => {
  return (
    <div className='sm:mt-20 mt-5'>
      <div className='cont'>
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl leading-[90px] font-young'>New releases</h1>
          <div>1</div>
        </div>
        <div>
          <CarosulNewRelase />
        </div>
      </div>
    </div>
  );
};

export default NewRelease;

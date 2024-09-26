import React from 'react';
import { TrandingTabs } from './TrandingTabs';

const Tranding = () => {
  return (
    <div className=''>
      <div className='cont'>
        <h1 className='text-4xl sm:text-left text-center leading-[90px] font-young'>
          Trending Now
        </h1>

        <div>
          <TrandingTabs />
        </div>
      </div>
    </div>
  );
};

export default Tranding;

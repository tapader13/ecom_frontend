import React from 'react';

const Footer = () => {
  return (
    <div className=' w-full bg-secondary'>
      <div className='cont px-5 sm:px-0  py-14'>
        <div className=' flex flex-col sm:flex-row  justify-between gap-10'>
          <div>
            <h3 className='text-2xl font-young'>Links</h3>
            <ul className='font-albert'>
              <li>Home</li>
              <li>About</li>
              <li>Service</li>
            </ul>
          </div>
          <div>
            <h3 className='text-2xl font-young'>Policy</h3>
            <ul className='font-albert'>
              <li>Terms</li>
              <li>Conditions</li>
              <li>Process</li>
            </ul>
          </div>
          <div>
            <h3 className='text-2xl font-young'>Contact</h3>
            <ul className='font-albert'>
              <li>Email: minhajtapader0@gmail.com</li>
              <li>Phone: 01786224382</li>
              <li>Address: Zakigonj,Sylhet</li>
            </ul>
          </div>
        </div>
        <hr className='my-5 border-t-2 border-dashed border-tertiary opacity-50' />
        <div className='text-center'>
          <p className='opacity-60'>@All right reserved by minhaj</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

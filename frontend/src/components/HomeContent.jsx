import React from 'react';
import img from '../assets/logo.png';
import LoggedInNav from '../components/LoggedInNav.jsx';
import DownFooter from './DownFooter.jsx';


const HomeContent = () => {
  return (
    <div className='min-h-screen bg-black text-gray-100 font-roboto flex flex-col justify-between'>
      <LoggedInNav isShow={false} />
      <div className="w-full flex flex-col md:flex-row justify-center items-start px-8 py-0 lg:py-8 lg:px-20">
        <div className='w-full px-0 lg:px-20 flex items-center justify-center mb-8 md:mb-0'>
          <div className="text-start lg:text-start mb-10 animate-fadeIn">
            <h3 className='text-2xl lg:text-3xl font-mono text-success'>Cubing Kerala,</h3>
            <h1 className="text-5xl lg:text-[70px] font-bold mb-6 bg-gradient-to-br py-2 from-white to-stone-400 bg-clip-text text-transparent">
              a community dedicated to Rubik's Cube enthusiasts in Kerala.
            </h1>
            <p className="text-md hidden lg:block lg:text-lg mx-auto text-gray-400">
              We organize events, competitions, and meetups to bring together cubers of all skill levels. <br /> Join us and be part of a vibrant and supportive&nbsp;community.
            </p>
            <p className="text-md block lg:hidden lg:text-lg mx-auto text-gray-400">
              We organize events, competitions, and meetups to bring together cubers of all skill levels. Join us and be part of a vibrant and supportive&nbsp;community.
            </p>
          </div>
        </div>
        <div className='w-full lg:hidden md:w-1/3 flex items-center lg:justify-start justify-center'>
          <div className="text-center mb-10">
            <img className='lg:block hidden' src={img} width={300} alt="Cubing Kerala Logo" />
            <img className='lg:hidden block' src={img} width={200} alt="Cubing Kerala Logo" />
          </div>
        </div>
      </div>
      <DownFooter/>
    </div>
  );
};

export default HomeContent;


import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/logo.png';
import logo from '../assets/cubingkeralalogo.png'
import { Footer } from 'flowbite-react';


const HomeContent = () => {
  return (
      <div className='min-h-screen bg-gradient-to-tr from-black to-gray-800 text-gray-100 font-roboto flex flex-col justify-between'>
        <div className='flex items-center justify-between p-5'>
          <div className='flex items-center gap-1'>
            <img width={30} src={logo} alt="ck-logo" />
            <h1 className='text-2xl font-label font-bold lg:block hidden'>Cubing Kerala</h1>
          </div>
          <div>
            <Link to={"/login"}><span className='text-lg font-semibold font-label underline'>Login</span></Link>
          </div>
        </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center p-8">
        <div className='w-full md:w-2/3 flex items-center justify-center mb-8 md:mb-0'>
          <div className="text-start mb-20">
            <h1 className="text-5xl font-bold mb-4">Welcome to Cubing Kerala</h1>
            <p className="text-lg  max-w-2xl mx-auto">
              Cubing Kerala is a community dedicated to Rubik's Cube enthusiasts in Kerala. <br /> We organize events, competitions, and meetups to bring together cubers of all skill levels. Join us to meet fellow cubers, and be part of a vibrant and supportive&nbsp;community.
            </p>
          </div>
        </div>
        <div className='w-full md:w-1/3 flex items-center lg:justify-start justify-center'>
          <div className="text-center mb-20">
            <img className='lg:block hidden' src={img} width={300} alt="Cubing Kerala Logo" />
            <img className='lg:hidden block' src={img} width={200} alt="Cubing Kerala Logo" />
          </div>
        </div>
      </div>
        <div className='flex-row lg:flex justify-between p-5'>
          <Footer.Copyright href="/" by="Cubing Kerala" year={new Date().getFullYear()} />
          <Footer.LinkGroup>
            <Footer.Link href="/about">About</Footer.Link>
            <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
            <Footer.Link href="/contact">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
      </div>
  );
};

export default HomeContent;

// import React from 'react';
// // import { Link } from 'react-router-dom';
// import img from '../assets/logo.png';
// // import logo from '../assets/cubingkeralalogo.png'
// import { Footer } from 'flowbite-react';
// import LoggedInNav from '../components/LoggedInNav.jsx'

// const HomeContent = () => {
//   return (
//       <div className='min-h-screen bg-black text-gray-100 font-roboto flex flex-col justify-between'>
//         <LoggedInNav/>
//         {/* <div className='flex items-center justify-between p-5'>
//           <div className='flex items-center gap-1'>
//             <img width={30} src={logo} alt="ck-logo" />
//             <h1 className='text-2xl font-label font-bold lg:block hidden'>Cubing Kerala</h1>
//           </div>
//           <div>
//             <Link to={"/login"}><span className='text-lg font-semibold font-label underline'>Login</span></Link>
//             <Link to={"/login"}><span className='text-lg font-semibold font-label underline'>Register</span></Link>
//           </div>
//         </div> */}
//       <div className="w-full flex flex-col md:flex-row justify-center items-center p-8">
//         <div className='w-full md:w-2/3 flex items-center justify-center mb-8 md:mb-0'>
//           <div className="text-start mb-10">
//             <h1 className="text-5xl font-bold mb-4">Welcome to Cubing Kerala</h1>
//             <p className="text-lg  max-w-2xl mx-auto">
//               Cubing Kerala is a community dedicated to Rubik's Cube enthusiasts in Kerala. <br /> We organize events, competitions, and meetups to bring together cubers of all skill levels. Join us to meet fellow cubers, and be part of a vibrant and supportive&nbsp;community.
//             </p>
//           </div>
//         </div>
//         <div className='w-full md:w-1/3 flex items-center lg:justify-start justify-center'>
//           <div className="text-center mb-10">
//             <img className='lg:block hidden' src={img} width={300} alt="Cubing Kerala Logo" />
//             <img className='lg:hidden block' src={img} width={200} alt="Cubing Kerala Logo" />
//           </div>
//         </div>
//       </div>
//         <div className='flex-row lg:flex justify-between p-5'>
//           <Footer.Copyright href="/" by="Cubing Kerala" year={new Date().getFullYear()} />
//           <Footer.LinkGroup>
//             <Footer.Link href="/about">About</Footer.Link>
//             <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
//             <Footer.Link href="/contact">Contact</Footer.Link>
//           </Footer.LinkGroup>
//         </div>
//       </div>
//   );
// };

// export default HomeContent;


import React from 'react';
import img from '../assets/logo.png';
import { Footer } from 'flowbite-react';
import LoggedInNav from '../components/LoggedInNav.jsx';
import { Button } from '@nextui-org/react';
import DownFooter from './DownFooter.jsx';

const HomeContent = () => {
  return (
    <div className='min-h-screen bg-black text-gray-100 font-roboto flex flex-col justify-between'>
      <LoggedInNav />
      <div className="w-full flex flex-col md:flex-row justify-center items-start px-8 py-8 lg:px-20">
        <div className='w-full px-0 lg:px-20 flex items-center justify-center mb-8 md:mb-0'>
          <div className="text-start lg:text-start mb-10">
            <h3 className='text-2xl lg:text-3xl font-mono text-success'>Cubing Kerala,</h3>
            <h1 className="text-5xl lg:text-[70px] font-bold mb-6 bg-gradient-to-br py-2 from-white to-stone-400 bg-clip-text text-transparent">
              {/* Welcome to Cubing Kerala */}
              a community dedicated to Rubik's Cube enthusiasts in Kerala.
            </h1>
            <p className="text-md hidden lg:block lg:text-lg mx-auto text-gray-400">
              We organize events, competitions, and meetups to bring together cubers of all skill levels. <br /> Join us and be part of a vibrant and supportive&nbsp;community.
            </p>
            <p className="text-md block lg:hidden lg:text-lg mx-auto text-gray-400">
              We organize events, competitions, and meetups to bring together cubers of all skill levels. Join us and be part of a vibrant and supportive&nbsp;community.
            </p>
            {/* <div className='text-center'><Button className='bg-transparent border border-gray-500 text-white mt-5' radius='none'>Get Started</Button></div> */}
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


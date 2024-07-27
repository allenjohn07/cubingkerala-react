// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from '../assets/logo.png';
// import { Button } from "flowbite-react";
// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
// import DownFooter from '../components/DownFooter';
// import { instance } from '../config/AxiosConfig'
// import { useSnackbar } from 'notistack';


// const SignUp = () => {

//   const [showPassword, setShowPassword] = useState(false);
//   const [register, setRegister] = useState({
//     name: '',
//     wcaid: '',
//     password: ''
//   })
//   const navigate = useNavigate()
//   const { enqueueSnackbar } = useSnackbar()

//   //function to handle the signup button
//   const handleSignUp = async () => {
//     //api calling to create user
//     try {
//       const name = register.name
//       const wcaid = register.wcaid.toUpperCase()
//       const password = register.password

//       const registerResponse = await instance.post("/auth/register", {
//         name, wcaid, password
//       })
//       // console.log(registerResponse.data.status);
//       if (registerResponse.data.status === 200) {
//         enqueueSnackbar(registerResponse.data.message, { variant: 'success' })
//         setRegister({
//           name: '',
//           wcaid: '',
//           password: ''
//         })
//         setTimeout(() => {
//           navigate("/login")
//         }, 2000)
//       } else {
//         enqueueSnackbar(registerResponse.data.message, { variant: 'error' })
//       }
//     } catch (error) {
//       console.error(error);
//       enqueueSnackbar(error, { variant: 'error' })
//     }
//   }


//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className='flex flex-col justify-between items-center min-h-screen bg-gray-100'>
//       <div className='absolute left-5 top-5 flex items-center gap-1'>
//         <img width={30} src={logo} alt="ck-logo" />
//         {/* <h1 className=' text-2xl font-label font-bold'>Cubing Kerala</h1> */}
//       </div>
//       <Link to={"/"}>
//         <span className='absolute text-gray-900 right-5 top-5 text-lg font-semibold font-label underline'>Go back</span>
//       </Link>
//       <div className='w-11/12 max-w-[500px] px-6 py-4 rounded-3xl mt-10 bg-white border-2 border-gray-100'>
//         <h1 className='text-xl font-semibold'>Create your account here!</h1>
//         <p className='font-medium text-md text-gray-500 mt-2'>Please fill in the details to create an account.</p>
//         <div className='mt-6'>
//           <div className='flex flex-col'>
//             <label className='text-sm font-medium'>Name</label>
//             <input
//               className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent placeholder:text-sm'
//               placeholder="Enter your name"
//               value={register.name}
//               onChange={(e) => setRegister({ ...register, name: e.target.value })}
//             />
//           </div>
//           <div className='flex flex-col mt-3'>
//             <label className='text-sm font-medium'>WCA ID</label>
//             <input
//               className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent placeholder:text-sm'
//               placeholder="World Cube Association ID"
//               value={register.wcaid}
//               onChange={(e) => setRegister({ ...register, wcaid: e.target.value })}
//             />
//           </div>
//           <div className='flex flex-col mt-3'>
//             <label className='text-sm font-medium'>Password</label>
//             <div className='relative w-full'>
//               <input
//                 className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent placeholder:text-sm'
//                 placeholder='Enter your password'
//                 type={showPassword ? 'text' : 'password'}
//                 value={register.password}
//                 onChange={(e) => setRegister({ ...register, password: e.target.value })}
//               />
//               <div
//                 className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
//               </div>
//             </div>
//           </div>
//           <div className='mt-6 flex flex-col gap-y-3'>
//             <Button onClick={handleSignUp} className='text-lg font-semibold text-white' gradientDuoTone="purpleToBlue">Sign Up</Button>
//           </div>
//           <div className='mt-6 flex justify-center items-center'>
//             <p className='font-medium text-base'>Already have an account?</p>
//             <Link to={"/login"}>
//               <button className='ml-2 font-semibold text-base underline'>Login</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//       <DownFooter />
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/cubingkeralalogo.png'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import DownFooter from '../components/DownFooter';
import { instance } from '../config/AxiosConfig';
import { useSnackbar } from 'notistack';
import { Button } from '@nextui-org/react';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [register, setRegister] = useState({
    name: '',
    wcaid: '',
    password: ''
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    try {
      const name = register.name;
      const wcaid = register.wcaid.toUpperCase();
      const password = register.password;

      const registerResponse = await instance.post('/auth/register', {
        name, wcaid, password
      });

      if (registerResponse.data.status === 200) {
        enqueueSnackbar(registerResponse.data.message, { variant: 'success' });
        setRegister({
          name: '',
          wcaid: '',
          password: ''
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        enqueueSnackbar(registerResponse.data.message, { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-gradient-to-tr from-black to-gray-800">
      <Link to={'/'}>
        <div className="absolute left-5 top-5 flex items-center gap-1">
          <img width={30} src={logo} alt="ck-logo" />
          <h1 className="text-2xl font-label font-bold text-white">Cubing Kerala</h1>
        </div>
      </Link>
      <Link to={'/'}>
        <span className="absolute text-white right-5 top-5 text-md font-semibold underline">
          Go back
        </span>
      </Link>
      <div className="w-11/12 max-w-md px-8 py-10 rounded-3xl mt-20">
        <h1 className="text-2xl font-semibold text-gray-100 text-center">Create your account here!</h1>
        <p className="text-center text-gray-600 mt-2">Please fill in the details to create an account.</p>
        <div className="mt-8">
          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-600 font-medium mb-2">Name</label>
            <input
              className="w-full border-2 border-gray-200 rounded-lg p-3 bg-gray-50 placeholder-gray-400"
              placeholder="Enter your name"
              value={register.name}
              onChange={(e) => setRegister({ ...register, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-600 font-medium mb-2">WCA ID</label>
            <input
              className="w-full border-2 border-gray-200 rounded-lg p-3 bg-gray-50 placeholder-gray-400"
              placeholder="World Cube Association ID"
              value={register.wcaid}
              onChange={(e) => setRegister({ ...register, wcaid: e.target.value })}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="text-sm text-gray-600 font-medium mb-2">Password</label>
            <div className="relative w-full">
              <input
                className="w-full border-2 border-gray-200 rounded-lg p-3 bg-gray-50 placeholder-gray-400"
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                value={register.password}
                onChange={(e) => setRegister({ ...register, password: e.target.value })}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button
              onClick={handleSignUp}
              className="w-full hover:shadow-md text-base font-semibold text-white bg-black rounded-lg"
            >
              Sign Up
            </Button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600">Already have an account?</p>
            <Link to={'/login'}>
              <button className="text-blue-800 font-semibold underline">Login</button>
            </Link>
          </div>
        </div>
      </div>
      <DownFooter />
    </div>
  );
};

export default SignUp;


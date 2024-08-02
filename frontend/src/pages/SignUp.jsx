import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import DownFooter from '../components/DownFooter';
import { instance } from '../config/AxiosConfig';
import { useSnackbar } from 'notistack';
import { Button } from '@nextui-org/react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

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
    <div className="flex flex-col justify-between items-center min-h-screen bg-black">
      <Link to={'/'}>
        <span className="absolute flex items-center gap-2 text-white left-5 top-5 lg:left-20 lg:top-10 text-md">
          <MdOutlineArrowBackIosNew />
          Back
        </span>
      </Link>
      <div className="w-11/12 max-w-md px-8 py-10 rounded-3xl mt-20 animate-fadeIn">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-100 text-center">Welcome to Cubing Kerala</h1>
        <p className="text-center text-gray-600 mt-2">Sign up for an account</p>
        <div className="mt-8">
          <div className="flex flex-col mb-4">
            <input
              className="w-full border-1 border-stone-800 rounded-lg p-2 bg-transparent text-white placeholder:text-sm placeholder-gray-400"
              placeholder="Enter your name"
              value={register.name}
              onChange={(e) => setRegister({ ...register, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col mb-4">
            <input
              className="w-full border-1 border-stone-800 rounded-lg p-2 bg-transparent text-white placeholder:text-sm placeholder-gray-400"
              placeholder="World Cube Association ID"
              value={register.wcaid}
              onChange={(e) => setRegister({ ...register, wcaid: e.target.value })}
            />
          </div>
          <div className="flex flex-col mb-6">
            <div className="relative w-full">
              <input
                className="w-full border-1 border-stone-800 rounded-lg p-2 bg-transparent text-white placeholder:text-sm placeholder-gray-400"
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                value={register.password}
                onChange={(e) => setRegister({ ...register, password: e.target.value })}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible className='text-white' size={20} /> : <AiFillEye className='text-white' size={20} />}
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button
              onClick={handleSignUp}
              className="w-full hover:shadow-md text-base bg-zinc-800 text-success font-semibold rounded-lg"
            >
              Sign up
            </Button>
          </div>
          <div className="mt-6 text-center">
            <Link to={"/login"}><p className="text-gray-500 hover:underline cursor-pointer text-sm">Already have an account? Login</p></Link>
          </div>
        </div>
      </div>
      <DownFooter />
    </div>
  );
};

export default SignUp;


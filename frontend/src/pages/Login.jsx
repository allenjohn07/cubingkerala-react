import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import DownFooter from '../components/DownFooter';
import { useCookies } from 'react-cookie';
import { instance } from '../config/AxiosConfig';
import { useSnackbar } from 'notistack';
import { Button } from '@nextui-org/react';
import { MdOutlineArrowBackIosNew } from "react-icons/md";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    wcaid: '',
    password: ''
  });
  const [_, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const wcaid = login.wcaid.toUpperCase();
      const password = login.password;
      const loginResponse = await instance.post('/auth/login', { wcaid, password });

      if (loginResponse.data.status === 200) {
        enqueueSnackbar(loginResponse.data.message, { variant: 'success' });
        setCookies('access_token', loginResponse.data.token);
        window.localStorage.setItem('user', JSON.stringify({
          userID: loginResponse.data.userID,
          name: loginResponse.data.name,
          wcaid: loginResponse.data.wcaid
        }))
        setTimeout(() => {
          window.location.replace('/');
        }, 2000);
      } else {
        enqueueSnackbar(loginResponse.data.message, { variant: 'error' });
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
          <MdOutlineArrowBackIosNew/>
          Back
        </span>
      </Link>
      <div className="w-11/12 max-w-md px-8 py-10 rounded-3xl mt-10 animate-fadeIn">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-100 text-center">Welcome back</h1>
        <p className="text-center text-gray-600 mt-2">Please enter your details.</p>
        <div className="mt-8">
          <div className="flex flex-col mb-5">
            <input
              className="w-full border-1 border-stone-800 rounded-lg p-2 bg-transparent text-white placeholder:text-sm placeholder-gray-400"
              placeholder="World Cube Association ID"
              value={login.wcaid}
              onChange={(e) => setLogin({ ...login, wcaid: e.target.value })}
            />
          </div>
          <div className="flex flex-col mb-6">
            <div className="relative w-full">
              <input
                className="w-full border-1 border-stone-800 rounded-lg p-2 text-white bg-transparent placeholder:text-sm placeholder-gray-400"
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                value={login.password}
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible className='text-white' size={20} /> : <AiFillEye className='text-white' size={20} />}
              </div>
            </div>
          </div>
          <div className='text-center'>
            <Button
              onClick={handleLogin}
              className="w-full hover:shadow-md text-base text-success bg-zinc-800 font-semibold rounded-lg"
            >
              Login
            </Button>
          </div>
          <div className="mt-6 text-center">
            <Link to={"/register"}><p className="text-gray-500 hover:underline cursor-pointer text-sm">Don't have an account? Sign up</p></Link>
          </div>
        </div>
      </div>
      <DownFooter />
    </div>
  );
};

export default Login;


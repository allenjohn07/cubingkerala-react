import React, { useEffect, useState } from 'react';
import LoggedInNav from '../components/LoggedInNav';
import TableComponent4 from '../components/MembersTable/TableComponent4';
import CreateMemberModal from '../components/CreateMemberModal';
import DownFooter from '../components/DownFooter.jsx';
import { instance } from '../config/AxiosConfig.jsx';
import { Progress } from '@nextui-org/react';
import rocket from '../assets/rocket.json'
import Lottie from 'lottie-react';
import Countdown from 'react-countdown';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')))

  const userID = import.meta.env.VITE_ADMIN_USER_ID

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await instance.get("/members/getMembers");
        setMembers(response.data.members);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };
    fetchMembers();
  }, []);


  const countdownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return null;
    } else {
      return (
        <span>{minutes}:{seconds}</span>
      );
    }
  };

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <LoggedInNav isShow={isLoading ? true : false} />
      <div className="flex-grow">
        {isLoading ?
          <div className="flex flex-col justify-center items-center h-full">
            {/* <Progress
              size="sm"
              color='success'
              isIndeterminate
              aria-label="Loading..."
              className="max-w-full"
            /> */}
            <div className='mt-[70px] lg:mt-[100px] flex flex-col items-center animate-fadeSlower'><Lottie className='w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]' animationData={rocket} />
              <p className='text-xs lg:text-sm text-gray-400 py-2'>The server is starting up. Please wait a moment...</p>
              <Countdown date={Date.now() + 50000} renderer={countdownRenderer} />
            </div>
          </div>
          : (
            <div className=' animate-fadeIn'>
              <div className="px-8 py-0 lg:py-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-8 text-center">Members</h1>
                <div className='w-full lg:w-2/3'>
                  <TableComponent4 members={members} />
                </div>
              </div>
              {
                user?.userID === userID ? null : <div id='joinCubingKerala' className='w-full py-10'>
                  <CreateMemberModal />
                </div>
              }
            </div>
          )}
      </div>
      <DownFooter />
    </div>
  );
};

export default Members;


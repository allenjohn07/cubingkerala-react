import React, { useEffect, useState } from 'react'
import LoggedInNav from '../components/LoggedInNav.jsx'
import RequestTable from '../components/RequestsTable/RequestTable.jsx'
import DownFooter from '../components/DownFooter.jsx'
import { instance } from '../config/AxiosConfig.jsx'
import { Progress } from '@nextui-org/react'

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const fetchRequests = async () => {
        const response = await instance.get("/request/getRequests");
        setRequests(response.data.requests);
        setTimeout(() => {
          setIsLoading(false)
        }, 500);
      };
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-gray-100">
      <LoggedInNav isShow={isLoading ? true : false} />
      <div className='flex-grow'>
        {
          !isLoading &&
          <div className="px-8 py-0 lg:py-8 animate-fadeIn flex flex-col items-center">
            <h1 className="text-xl lg:text-3xl font-bold mb-10 lg:mb-20 text-center">Cubing Kerala Members</h1>
            <RequestTable requests={requests} />
          </div>

        }
      </div>
      <DownFooter />
    </div>
  )
}

export default Requests
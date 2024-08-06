import React, { useEffect } from 'react'
import HomeContent from '../components/HomeContent'
import { instance } from '../config/AxiosConfig.jsx'

const Home = () => {

  useEffect(() => {
    const invokeServer = async () => {
      try {
        await instance.get("/")
      } catch (error) {
        console.log(error);
      }
    }
    invokeServer()
  }, [])

  return (
    <div>
      <HomeContent />
    </div>
  )
}

export default Home
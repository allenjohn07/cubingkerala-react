import React, { useEffect, useState } from 'react';
import LoggedInNav from '../components/LoggedInNav';
import { Card, Pagination } from 'flowbite-react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Badge } from "flowbite-react";
import DownFooter from '../components/DownFooter';


const Competitions = () => {

  const [upcomingCompetitions, setUpcomingCompetitions] = useState([])
  const [pastCompetitions, setPastCompetitions] = useState([])
  const [pastCompetitionsPerPage, setPastCompetitionsPerPage] = useState([])
  const [upcomingCompetitionsPerPage, setUpcomingCompetitionsPerPage] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const compsPerPage = 8

  const onPageChange = (page) => setCurrentPage(page);
  const navigate = useNavigate()

  useEffect(() => {
    try {
      getCompetitions()
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    handlePCPagination()
  }, [currentPage, pastCompetitions])

  const getCompetitions = async () => {
    try {
      const response = await axios.get("https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/IN.json")
      const KeralComps = response.data.items.filter((comp) => comp.city.includes("Kerala"));
      setPastCompetitions(KeralComps.filter((comp) => new Date(comp.date.till) < new Date()))
      setUpcomingCompetitions(KeralComps.filter((comp) => new Date(comp.date.till) > new Date()))
    } catch (error) {
      console.log(error);
    }
  }



  const handlePCPagination = () => {
    const endIndex = currentPage * compsPerPage
    const startIndex = endIndex - compsPerPage
    setPastCompetitionsPerPage(pastCompetitions.slice(startIndex, endIndex))
  }

  const handleUCPagination = () => {
    const endIndex = currentPage * compsPerPage
    const startIndex = endIndex - compsPerPage
    setUpcomingCompetitionsPerPage(upcomingCompetitions.slice(startIndex, endIndex))
  }


  return (
    <div className="min-h-screen bg-gradient-to-tr from-black to-gray-800 text-gray-100">
      <LoggedInNav />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Competitions</h1>
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Competitions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4">
            {
              upcomingCompetitions?.map((upComp, index) =>
                <Card key={index} onClick={() => navigate(`/competitions/${upComp.id}`)} className="max-w-full rounded-md border-none hover:scale-105 transition-all cursor-pointer relative">
                  <div>
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      {upComp?.name}
                    </h5>
                    <Badge className='absolute top-1 right-1' color="warning">Upcoming</Badge>
                  </div>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Join us for the annual Kerala Cube Open on July 20, 2024. Show off your skills and compete with the best!
                  </p>
                </Card>
              )
            }
          </div>
          {
            upcomingCompetitions.length <= compsPerPage ? null : <div className="flex overflow-x-auto justify-center py-5">
              <Pagination onClick={handleUCPagination}
                layout="navigation"
                currentPage={currentPage}
                totalPages={Math.ceil(upcomingCompetitions.length / compsPerPage)}
                onPageChange={onPageChange}
                previousLabel="Previous"
                nextLabel="Next"
                showIcons
              />
            </div>
          }
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Past Competitions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4">
            {
              pastCompetitionsPerPage?.map((pastComp, index) =>
                <Card key={index} onClick={() => !pastComp?.isCanceled ? navigate(`/competitions/${pastComp.id}`) : null} className={`max-w-full border-none ${pastComp?.isCanceled ? 'hover:scale-100' : 'hover:scale-105'} transition-all ${pastComp?.isCanceled ? 'cursor-default' : 'cursor-pointer'} relative rounded-md`}>
                  <div>
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      {pastComp?.name}
                    </h5>
                    <Badge className='absolute top-1 right-1 text-xs' color={pastComp?.isCanceled ? "failure" : "success"}>{pastComp?.isCanceled ? "Cancelled" : "Done"}</Badge>
                  </div>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    The Kerala Cube Championship held on October 15, 2023, was a huge success with record-breaking performances.
                  </p>
                </Card>
              )
            }
          </div>
          {
            pastCompetitions.length <= compsPerPage ? null : <div className="flex overflow-x-auto justify-center py-5">
              <Pagination onClick={handlePCPagination}
                layout="navigation"
                currentPage={currentPage}
                totalPages={Math.ceil(pastCompetitions.length / compsPerPage)}
                onPageChange={onPageChange}
                previousLabel="Previous"
                nextLabel="Next"
                showIcons
              />
            </div>
          }
        </div>
      </div>
      <DownFooter/>
    </div>
  );
};

export default Competitions;

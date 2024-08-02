import React, { useEffect, useState } from 'react';
import LoggedInNav from '../components/LoggedInNav';
import { Card, Pagination } from 'flowbite-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Badge } from "flowbite-react";
import DownFooter from '../components/DownFooter';
import { Tooltip } from '@nextui-org/react';
import { Progress } from "@nextui-org/react";

const Competitions = () => {
  const [upcomingCompetitions, setUpcomingCompetitions] = useState([]);
  const [pastCompetitions, setPastCompetitions] = useState([]);
  const [pastCompetitionsPerPage, setPastCompetitionsPerPage] = useState([]);
  const [upcomingCompetitionsPerPage, setUpcomingCompetitionsPerPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const compsPerPage = 8;
  const [isLoading, setIsLoading] = useState(true);

  const onPageChange = (page) => setCurrentPage(page);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      getCompetitions();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handlePCPagination();
  }, [currentPage, pastCompetitions]);

  const getCompetitions = async () => {
    try {
      const response = await axios.get("https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/IN.json");
      const KeralComps = response.data.items.filter((comp) => comp.city.includes("Kerala"));
      setPastCompetitions(KeralComps.filter((comp) => new Date(comp.date.till) < new Date()));
      setUpcomingCompetitions(KeralComps.filter((comp) => new Date(comp.date.till) > new Date()));
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };


  const handlePCPagination = () => {
    const endIndex = currentPage * compsPerPage;
    const startIndex = endIndex - compsPerPage;
    setPastCompetitionsPerPage(pastCompetitions.slice(startIndex, endIndex));
  };

  const handleUCPagination = () => {
    const endIndex = currentPage * compsPerPage;
    const startIndex = endIndex - compsPerPage;
    setUpcomingCompetitionsPerPage(upcomingCompetitions.slice(startIndex, endIndex));
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-200">
      <LoggedInNav />
      <div className="flex-grow">
        {
          isLoading ? (
            <Progress
              size="sm"
              color='success'
              isIndeterminate
              aria-label="Loading..."
              className="max-w-full"
            />
          ) : (
            <div className="px-8 py-0 lg:py-8 animate-fadeIn">
              <h1 className="text-3xl font-bold mb-8 text-center">Competitions</h1>
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Competitions</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4">
                  {
                    upcomingCompetitions?.map((upComp, index) => (
                      <Card
                        key={index}
                        onClick={() => navigate(`/competitions/${upComp.id}`)}
                        className="max-w-full bg-zinc-900 rounded-md border-none hover:scale-105 transition-all cursor-pointer relative"
                      >
                        <div>
                          <h5 className="text-lg font-bold tracking-tight text-gray-200 dark:text-white">
                            {upComp?.name}
                          </h5>
                          <Badge className='absolute top-1 right-1' color="warning">Upcoming</Badge>
                        </div>
                        <div>
                          <div className='flex flex-col items-start gap-1'>
                            <span className='text-sm flex items-center gap-1 text-success'>{new Date(upComp?.date?.from).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} - {new Date(upComp?.date?.till).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            <span className='text-sm'>{upComp?.venue?.address}</span>
                            <div className='text-xs'>
                              {
                                upComp?.events.map((event, index) => (
                                  <Tooltip content={event} key={index}>
                                    <span className={`cubing-icon event-${event} pr-2`}></span>
                                  </Tooltip>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  }
                </div>
                {
                  upcomingCompetitions.length <= compsPerPage ? null : (
                    <div className="flex overflow-x-auto justify-center py-5">
                      <Pagination
                        onClick={handleUCPagination}
                        layout="navigation"
                        currentPage={currentPage}
                        totalPages={Math.ceil(upcomingCompetitions.length / compsPerPage)}
                        onPageChange={onPageChange}
                        previousLabel="Previous"
                        nextLabel="Next"
                        showIcons
                      />
                    </div>
                  )
                }
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Past Competitions</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4">
                  {
                    pastCompetitionsPerPage?.map((pastComp, index) => (
                      <Card
                        key={index}
                        onClick={() => !pastComp?.isCanceled ? navigate(`/competitions/${pastComp.id}`) : null}
                        className={`max-w-full border-none ${pastComp?.isCanceled ? 'hover:scale-100' : 'hover:scale-105'} transition-all ${pastComp?.isCanceled ? 'cursor-default' : 'cursor-pointer'} relative rounded-md bg-zinc-900`}
                      >
                        <div>
                          <h5 className="text-lg font-bold tracking-tight text-gray-200 dark:text-white">
                            {pastComp?.name}
                          </h5>
                          <Badge className='absolute top-1 right-1 text-xs' color={pastComp?.isCanceled ? "failure" : "success"}>{pastComp?.isCanceled ? "Cancelled" : "Done"}</Badge>
                        </div>
                        <div>
                          <div className='flex flex-col items-start gap-1'>
                            <span className='text-sm flex items-center gap-1 text-red-400'>{new Date(pastComp?.date?.from).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} - {new Date(pastComp?.date?.till).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            <span className='text-sm'>{pastComp?.venue?.address}</span>
                            <div className='text-xs'>
                              {
                                pastComp?.events.map((event, index) => (
                                  <Tooltip content={event} key={index}>
                                    <span className={`cubing-icon event-${event} pr-3`}></span>
                                  </Tooltip>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  }
                </div>
                {
                  pastCompetitions.length <= compsPerPage ? null : (
                    <div className="flex overflow-x-auto justify-center py-5">
                      <Pagination
                        onClick={handlePCPagination}
                        layout="navigation"
                        currentPage={currentPage}
                        totalPages={Math.ceil(pastCompetitions.length / compsPerPage)}
                        onPageChange={onPageChange}
                        previousLabel="Previous"
                        nextLabel="Next"
                        showIcons
                      />
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
      <DownFooter />
    </div>
  );
};

export default Competitions;


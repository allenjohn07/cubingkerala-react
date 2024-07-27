import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoggedInNav from '../components/LoggedInNav'
import ProfileTable from '../components/ProfileTable'
import DownFooter from '../components/DownFooter'

const PersonInfo = () => {
    const { personId } = useParams()
    const [person, setPerson] = useState(null)


    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axios.get(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/${personId}.json`)
                setPerson(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchPerson()
    }, [])

    console.log(person);

    return (
        <div className="min-h-screen bg-gradient-to-tr from-black to-gray-800 text-gray-100">
            <LoggedInNav />
            <div className='p-8'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className="text-3xl font-bold mb-8 flex items-start gap-2">{person?.name}</h1>
                    <div className='w-full lg:w-1/2'>
                        <div className='bg-gray-700 rounded-lg flex justify-around items-center'>
                            <div className='text-gray-100 flex flex-col justify-center items-center p-1'><span className='text-xs'>COUNTRY</span> <img className='h-4 lg:h-5' src={`https://flagsapi.com/${person?.country}/flat/64.png`}></img> </div>
                            <div className='text-gray-100 flex flex-col justify-center items-center p-1'><span className='text-xs'>WCA ID</span> <span className='font-semibold'>{person?.id}</span> </div>
                            <div className='text-gray-100 flex flex-col justify-center items-center p-1'><span className='text-xs'>COMPETITIONS</span> <span className='font-semibold'>{person?.numberOfCompetitions}</span> </div>
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2'>
                        <ProfileTable person={person} />
                    </div>

                </div>
            </div>
            <DownFooter/>
        </div>
    )
}

export default PersonInfo
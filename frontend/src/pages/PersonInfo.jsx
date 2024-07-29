import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoggedInNav from '../components/LoggedInNav'
import ProfileTable from '../components/ProfileTable'
import DownFooter from '../components/DownFooter'
import { instance } from '../config/AxiosConfig.jsx'
import { Badge } from 'flowbite-react'

const PersonInfo = () => {
    const { personId } = useParams()
    const [person, setPerson] = useState(null)
    const [member, setMember] = useState(null)

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

    useEffect(() => {
        const checkMemberOrNot = async () => {
            try {
                const response = await instance.get(`/members/getMemberbyId/${person?.id}`)
                if (response.data.status === 200) {
                    setMember(response.data.member)
                    return
                }
                return console.log(response.data.message);
            } catch (error) {
                console.log(error);
            }
        }
        checkMemberOrNot()
    }, [person])

    console.log(member);

    return (
        <div className="min-h-screen bg-gradient-to-tr from-black to-gray-800 text-gray-100">
            <LoggedInNav />
            <div className='p-8'>
                <div className='flex flex-col items-center justify-center'>
                    <div className="flex items-center flex-col gap-2 pb-7">
                        <h1 className='text-3xl font-bold'>{person?.name}</h1>
                        {
                            member? <Badge color={member?.role === "Co-founder" ? "failure" : member?.role === "Organiser" ? "warning" : "success"}>Cubing Kerala {member?.role}</Badge> : null
                        }
                    </div>
                    <div className="w-full lg:w-2/3 flex justify-center pb-4">
                        {member?.imageUrl && (
                            <div className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]">
                                <img
                                    src={member.imageUrl}
                                    alt="profile-pic"
                                    className="w-full h-full rounded-md object-cover"
                                />
                            </div>
                        )}
                    </div>
                    <div className='w-full lg:w-1/2'>
                        <div className='bg-gray-700 rounded-lg flex justify-around items-center'>
                            <div className='text-gray-100 flex flex-col justify-center items-center p-1'><span className='text-xs'>COUNTRY</span> <img className='h-4 lg:h-5' src={`https://flagsapi.com/${person?.country}/flat/64.png`}></img> </div>
                            <div className='text-gray-100 flex flex-col justify-center items-center p-1'><span className='text-xs'>WCA ID</span> <span className='font-semibold'>{person?.id}</span> </div>
                            <div className='text-gray-100 flex flex-col justify-center items-center p-1'><span className='text-xs'>COMPETITIONS</span> <span className='font-semibold'>{person?.numberOfCompetitions}</span> </div>
                        </div>
                    </div>
                    <div className='w-full lg:w-2/3'>
                        <ProfileTable person={person} />
                    </div>

                </div>
            </div>
            <DownFooter />
        </div>
    )
}

export default PersonInfo
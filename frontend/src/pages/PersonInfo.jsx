// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import LoggedInNav from '../components/LoggedInNav'
// import ProfileTable from '../components/ProfileTable'
// import DownFooter from '../components/DownFooter'
// import { instance } from '../config/AxiosConfig.jsx'
// import { Badge } from 'flowbite-react'

// const PersonInfo = () => {
//     const { personId } = useParams()
//     const [person, setPerson] = useState(null)
//     const [member, setMember] = useState(null)

//     useEffect(() => {
//         const fetchPerson = async () => {
//             try {
//                 const response = await axios.get(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/${personId}.json`)
//                 setPerson(response.data)
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchPerson()
//     }, [])

//     console.log(person);

//     useEffect(() => {
//         const checkMemberOrNot = async () => {
//             try {
//                 const response = await instance.get(`/members/getMemberbyId/${person?.id}`)
//                 if (response.data.status === 200) {
//                     setMember(response.data.member)
//                     return
//                 }
//                 return console.log(response.data.message);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         checkMemberOrNot()
//     }, [person])

//     console.log(member);

//     return (
//         <div className="min-h-screen bg-black text-gray-100">
//             <LoggedInNav />
//             <div className='p-8'>
//                 <div className='flex flex-col items-center justify-center'>
//                     <div className="flex items-center flex-col gap-2 pb-7">
//                         <h1 className='text-3xl font-bold'>{person?.name}</h1>
//                         {
//                             member? <Badge color={member?.role === "Co-founder" ? "failure" : member?.role === "Organiser" ? "warning" : "success"}>Cubing Kerala {member?.role}</Badge> : null
//                         }
//                     </div>
//                     <div className="w-full lg:w-2/3 flex justify-center pb-4">
//                         {member?.imageUrl && (
//                             <div className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]">
//                                 <img
//                                     src={member.imageUrl}
//                                     alt="profile-pic"
//                                     className="w-full h-full rounded-md object-cover"
//                                 />
//                             </div>
//                         )}
//                     </div>
//                     <div className='w-full lg:w-1/2'>
//                         <div className='bg-zinc-900 rounded-lg flex py-1 justify-around items-center'>
//                             <div className='text-gray-100 flex flex-col justify-center items-center p-1'><span className='text-xs text-gray-400'>COUNTRY</span> <img className='h-4 lg:h-5' src={`https://flagsapi.com/${person?.country}/flat/64.png`}></img> </div>
//                             <div className='text-gray-100 flex flex-col justify-center items-center p-1'><span className='text-xs text-gray-400'>WCA ID</span> <span className='font-semibold text-sm'>{person?.id}</span> </div>
//                             <div className='text-gray-100 flex flex-col justify-center items-center p-1'><span className='text-xs text-gray-400'>COMPETITIONS</span> <span className='font-semibold text-sm'>{person?.numberOfCompetitions}</span> </div>
//                         </div>
//                     </div>
//                     <div className='w-full lg:w-2/3'>
//                         <ProfileTable person={person} />
//                     </div>

//                 </div>
//             </div>
//             <DownFooter />
//         </div>
//     )
// }

// export default PersonInfo

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoggedInNav from '../components/LoggedInNav'
import ProfileTable from '../components/ProfileTable'
import DownFooter from '../components/DownFooter'
import { instance } from '../config/AxiosConfig.jsx'
import { Badge } from 'flowbite-react'
import { Progress } from '@nextui-org/react'

const PersonInfo = () => {
    const { personId } = useParams()
    const [person, setPerson] = useState(null)
    const [member, setMember] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axios.get(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/${personId}.json`)
                setPerson(response.data)
            } catch (error) {
                console.log(error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false)
                }, 500);
            }
        }
        fetchPerson()
    }, [personId])

    useEffect(() => {
        const checkMemberOrNot = async () => {
            try {
                const response = await instance.get(`/members/getMemberbyId/${person?.id}`)
                if (response.data.status === 200) {
                    setMember(response.data.member)
                    return
                }
                console.log(response.data.message);
            } catch (error) {
                console.log(error);
            }
        }
        if (person) {
            checkMemberOrNot()
        }
    }, [person])

    return (
        <div className="flex flex-col min-h-screen bg-black text-gray-100">
            <LoggedInNav />
            {isLoading ? (
                    <Progress
                        size="sm"
                        color='success'
                        isIndeterminate
                        aria-label="Loading..."
                        className="max-w-full flex-grow"
                    />
            ) : (
                <div className="flex-grow p-8">
                    <div className='flex flex-col items-center justify-center'>
                        <div className="flex items-center flex-col gap-2 pb-7">
                            <h1 className='text-3xl font-bold'>{person?.name}</h1>
                            {member ? (
                                <Badge color={member?.role === "Co-founder" ? "failure" : member?.role === "Organiser" ? "warning" : "success"}>
                                    Cubing Kerala {member?.role}
                                </Badge>
                            ) : null}
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
                            <div className='bg-zinc-900 rounded-lg flex py-1 justify-around items-center'>
                                <div className='text-gray-100 flex flex-col justify-center items-center p-1'>
                                    <span className='text-xs text-gray-400'>COUNTRY</span>
                                    <img className='h-4 lg:h-5' src={`https://flagsapi.com/${person?.country}/flat/64.png`} alt="country-flag"/>
                                </div>
                                <div className='text-gray-100 flex flex-col justify-center items-center p-1'>
                                    <span className='text-xs text-gray-400'>WCA ID</span>
                                    <span className='font-semibold text-sm'>{person?.id}</span>
                                </div>
                                <div className='text-gray-100 flex flex-col justify-center items-center p-1'>
                                    <span className='text-xs text-gray-400'>COMPETITIONS</span>
                                    <span className='font-semibold text-sm'>{person?.numberOfCompetitions}</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full lg:w-2/3'>
                            <ProfileTable person={person} />
                        </div>
                    </div>
                </div>
            )}
            <DownFooter />
        </div>
    )
}

export default PersonInfo

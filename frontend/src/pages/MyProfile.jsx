import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoggedInNav from '../components/LoggedInNav'
import ProfileTable from '../components/ProfileTable'
import DownFooter from '../components/DownFooter'
import { instance } from '../config/AxiosConfig.jsx'
import { Badge } from 'flowbite-react'
import { FaEdit } from "react-icons/fa";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";


const MyProfile = () => {
    const { id } = useParams()
    const [person, setPerson] = useState(null)
    const [member, setMember] = useState(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [form, setForm] = useState({
        wcaid: '',
        name: '',
        mainevent: '',
        username: '',
        imageUrl: '',
        role: '',
        status: ''
    })
    const [isLoading, setIsLoading] = useState(true);


    const navigate = useNavigate()

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axios.get(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/${id}.json`)
                setPerson(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchPerson()
    }, [id])

    console.log(person);

    useEffect(() => {
        const checkMemberOrNot = async () => {
            try {
                const response = await instance.get(`/members/getMemberbyId/${person?.id}`)
                if (response.data.status === 200) {
                    setMember(response.data.member)
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);
                } else {
                    console.log(response.data.message);
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false)
            }
        }
        if (person?.id) {
            checkMemberOrNot()
        }
    }, [person])

    useEffect(() => {
        if (member) {
            setForm({
                wcaid: member.wcaid,
                name: member.name,
                mainevent: member.mainevent,
                username: member.username,
                imageUrl: member.imageUrl,
                role: member.role,
                status: member.status
            })
        }
    }, [member])


    const handleSubmit = async () => {
        console.log(form);
        try {
            const response = await instance.post("/members/updateMember", { form })
            if (response.data.status === 200) {
                console.log(response.data.message);
                window.location.reload()
                return
            }
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }


    const handleRedirectToMembers = () => {
        navigate("/members")
    }

    return (
        <div className="min-h-screen bg-black flex flex-col justify-between text-gray-100">
            <LoggedInNav />
            <div className='flex-grow'>
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
                        <div className='px-8 py-0 lg:py-8 animate-fadeIn'>
                            <div className='flex flex-col items-center justify-center'>
                                <div className="flex items-center flex-col gap-2 pb-7">
                                    <div className='flex items-start'>
                                        <h1 className='text-xl lg:text-3xl font-bold'>{person?.name}</h1>
                                        <span onClick={onOpen} className='cursor-pointer'><FaEdit className='ml-4 absolute' /></span>
                                        <Modal
                                            className='rounded-md bg-gray-200'
                                            isOpen={isOpen}
                                            onOpenChange={onOpenChange}
                                            placement="top-bottom"
                                        >
                                            <ModalContent>
                                                {(onClose) => (
                                                    <>
                                                        {
                                                            member ? <ModalHeader className="flex flex-col gap-1">Update Details.</ModalHeader> : <ModalHeader className="flex flex-col gap-1">Membership Required</ModalHeader>
                                                        }
                                                        <ModalBody>
                                                            {
                                                                member ? <>
                                                                    <div className='flex gap-3'>
                                                                        <Input
                                                                            disabled
                                                                            value={form.wcaid}
                                                                            label="wca id"
                                                                            variant="underlined"
                                                                        />
                                                                        <Select
                                                                            autoFocus
                                                                            onChange={(e) => setForm({ ...form, mainevent: e.target.value })}
                                                                            value={form.mainevent}
                                                                            variant="underlined"
                                                                            label="main event"
                                                                            className="max-w-xs"
                                                                        >
                                                                            {
                                                                                person?.rank.singles.map((event) =>
                                                                                    <SelectItem key={event.eventId} value={event.eventId}>
                                                                                        {event.eventId}
                                                                                    </SelectItem>)
                                                                            }
                                                                        </Select>
                                                                    </div>
                                                                    <Select onChange={(e) => setForm({ ...form, role: e.target.value })}
                                                                        value={form.role}
                                                                        variant="underlined"
                                                                        label="role"
                                                                        className="max-w-xs">
                                                                        <SelectItem key={"Member"}>Member</SelectItem>
                                                                        <SelectItem key={"Organiser"}>Organiser</SelectItem>
                                                                        <SelectItem key={"Co-founder"}>Co-founder</SelectItem>
                                                                    </Select>
                                                                    <Input
                                                                        description="example: allenjohn@cubingkerala"
                                                                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                                                                        value={form.username}
                                                                        label="username"
                                                                        variant="underlined"
                                                                    />
                                                                    <Input
                                                                        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                                                                        value={form.imageUrl}
                                                                        label="avatar url"
                                                                        variant="underlined"
                                                                    />
                                                                </> : <div className='font-semibold'>Join Cubing Kerala to continue.</div>
                                                            }
                                                        </ModalBody>
                                                        <ModalFooter className='flex flex-col'>
                                                            <div className='flex items-center justify-center w-full'>
                                                                {
                                                                    member ? <Button onClick={handleSubmit} className="bg-black text-success shadow-lg w-full font-semibold rounded-md" onPress={onClose}>
                                                                        Save Changes
                                                                    </Button> : <Button onClick={handleRedirectToMembers} className="bg-black text-success font-semibold shadow-lg w-full rounded-md" onPress={onClose}>
                                                                        Join
                                                                    </Button>
                                                                }
                                                            </div>
                                                        </ModalFooter>
                                                    </>
                                                )}
                                            </ModalContent>
                                        </Modal>
                                    </div>
                                    {
                                        member ? <Badge color={member?.role === "Co-founder" ? "failure" : member?.role === "Organiser" ? "warning" : "success"}>Cubing Kerala {member?.role}</Badge> : null
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
                                    <div className='bg-zinc-900 py-1 rounded-md flex justify-around items-center'>
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
                    )
                }
            </div>
            <DownFooter />
        </div>
    )
}

export default MyProfile





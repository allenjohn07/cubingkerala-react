import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { instance } from '../config/AxiosConfig.jsx';
import { useNavigate } from 'react-router-dom';


const CreateMemberModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')))
    const [person, setPerson] = useState(null)
    const [form, setForm] = useState({
        wcaid: user?.wcaid,
        name: user?.name,
        mainevent: '',
        username: '',
        imageUrl: '',
        role: '',
        status: ''
    })
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()


    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axios.get(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/${user?.wcaid}.json`)
                setPerson(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchPerson()
    }, [])


    const handleSubmit = async () => {
        if (!form.mainevent || form.username.length < 5 || !form.imageUrl || !form.username.endsWith('@cubingkerala')) {
            return enqueueSnackbar("Invalid details", { variant: 'error' });
        }
        try {
            const response = await instance.post("/request/addRequest", form)
            // console.log(response.data);
            if (response.data.status === 200) {
                setForm({
                    wcaid: user?.wcaid,
                    name: user?.name,
                    mainevent: '',
                    username: '',
                    imageUrl: '',
                    role: '',
                    status: ''
                })
                return enqueueSnackbar(response.data.message, { variant: 'success' });
            }
            setForm({
                wcaid: user?.wcaid,
                name: user?.name,
                mainevent: '',
                username: '',
                imageUrl: ''
            })
            return enqueueSnackbar(response.data.message, { variant: 'error' });
        } catch (error) {
            console.log(error);
            return enqueueSnackbar(error, { variant: 'error' });
        }
    }


    const handleRedirectToLogin = () => {
        navigate("/login")
    }

    return (
        <>
            <div className='flex items-center flex-col gap-1'>
                <p className='text-sm text-gray-500'>be part of our community?</p>
                <Button className="bg-transparent border-b-1 border-b-success rounded-none text-white shadow-lg" onPress={onOpen}>Join Cubing Kerala</Button>
            </div>
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
                                user ? <ModalHeader className="flex flex-col gap-1">Enter the details below.</ModalHeader> : <ModalHeader className="flex flex-col gap-1">Log In to Continue</ModalHeader>
                            }
                            <ModalBody>
                                {
                                    user ? <>
                                        <div className='flex gap-3'>
                                            <Input
                                                disabled
                                                value={user?.wcaid}
                                                label="wca id"
                                                variant="underlined"
                                            />
                                            <Select
                                                autoFocus
                                                onChange={(e) => setForm({ ...form, mainevent: e.target.value })}
                                                value={form?.mainevent}
                                                variant="underlined"
                                                label="main event"
                                                className="max-w-xs"
                                            >
                                                {
                                                    person?.rank.singles.map((event) =>
                                                        <SelectItem key={event.eventId}>
                                                            {event.eventId}
                                                        </SelectItem>)
                                                }
                                            </Select>
                                        </div>
                                        <Input
                                            description="example: allenjohn@cubingkerala"
                                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                                            value={form?.username}
                                            label="username"
                                            variant="underlined"
                                        />
                                        <Input
                                            description="Right click your online image and select 'Copy image address' to get its URL."
                                            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                                            value={form?.imageUrl}
                                            label="avatar url"
                                            variant="underlined"
                                        />
                                    </> : <div>You need to log in to access this feature.</div>
                                }
                            </ModalBody>
                            <ModalFooter className='flex flex-col'>
                                <div className='flex items-center justify-center w-full'>
                                    {
                                        user ? <Button onClick={handleSubmit} className="shadow-lg w-full text-success font-semibold bg-black rounded-md" onPress={onClose}>
                                            Submit
                                        </Button> :
                                            <Button onClick={handleRedirectToLogin} className="text-success bg-black font-semibold shadow-lg w-full rounded-md" onPress={onClose}>
                                                Login
                                            </Button>
                                    }
                                </div>
                                {
                                    user ? <div className='flex items-center justify-center w-full'><p className='text-xs'>Cubing Kerala membership is subject to manual approval.</p></div> : null
                                }
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateMemberModal
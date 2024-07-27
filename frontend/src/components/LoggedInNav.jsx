import React, { useEffect } from 'react'
import { useState } from 'react';
import { useCookies } from 'react-cookie'
import logo from '../assets/cubingkeralalogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaCubes } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaRankingStar } from "react-icons/fa6";
import { Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useSnackbar } from 'notistack'

const LoggedInNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [_, setCookies] = useCookies(["access_token"])
    const [user, setUser] = useState(null)

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const userId = import.meta.env.VITE_ADMIN_USER_ID

    useEffect(()=>{
        const userfromlocalstorage = JSON.parse(window.localStorage.getItem('user'));
        setUser(userfromlocalstorage)
    },[])


    //logout function
    const handleLogout = () => {
        enqueueSnackbar("Logging out", { variant: 'success' })
        setTimeout(() => {
            setCookies("access_token", "")
            window.localStorage.clear()
            navigate("/")
        }, 2000)
    }


    //navigate to requests page function
    const handleRequestRedirect = () => {
        navigate("/admin/requests")
    }


    return (
        <nav className="text-gray-100 py-7 px-5 lg:px-10">
            <div className="container mx-auto flex items-center justify-between md:justify-center">
                {/* Hamburger menu for smaller screens */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-100 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}></path>
                        </svg>
                    </button>
                </div>

                {/* Logo and text */}
                <Link to={"/"}>
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Cubing Kerala Logo" className="lg:w-8 w-6" />
                        <h1 className="lg:text-xl text-base font-label font-bold">Cubing Kerala</h1>
                    </div>
                </Link>

                {/* Avatar on the right for smaller screens */}
                <div className="md:hidden flex items-center">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                className="transition-transform h-6 w-6"
                                color="black"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-normal">Signed in as</p>
                                <p className="font-semibold"><span>{user?.name}</span></p>
                            </DropdownItem>
                            <DropdownItem key="settings">My Profile</DropdownItem>
                            {
                                user?.userID === userId ? <DropdownItem onClick={handleRequestRedirect} key="requests">Member Requests</DropdownItem>  : null
                            }
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem onClick={handleLogout} key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                {/* Navigation items centered */}
                <div className="hidden md:flex flex-1 justify-evenly space-x-4">
                    <Link to={"/competitions"}>
                        <div className='flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all hover:underline'>
                            <FaCubes />
                            <p className="text-gray-100 ">Competitions</p>
                        </div>
                    </Link>
                    <Link to={"/members"}>
                        <div className='flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all hover:underline'>
                            <FaUsers />
                            <p className="text-gray-100 ">Members</p>
                        </div>
                    </Link>
                    <Link to={"/rankings"}>
                        <div className='flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all hover:underline'>
                            <FaRankingStar />
                            <p className="text-gray-100 ">Rankings</p>
                        </div>
                    </Link>
                </div>

                {/* Avatar on the right for larger screens */}
                <div className="hidden md:flex items-center">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                className="transition-transform h-8 w-8 hover:scale-105"
                                color="black"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p>Signed in as</p>
                                <p className="font-semibold">{user?.name}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">My Profile</DropdownItem>
                            {
                                user?.userID === userId ? <DropdownItem onClick={handleRequestRedirect} key="requests">Member Requests</DropdownItem>  : null
                            }
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem onClick={handleLogout} key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden mt-4 space-y-2">
                    <Link to={"/competitions"}>
                        <div className='flex items-center justify-start gap-2 cursor-pointer hover:scale-105 transition-all hover:underline'>
                            <FaCubes />
                            <a href="#" className="text-gray-100 ">Competitions</a>
                        </div>
                    </Link>
                    <Link to={"/members"}>
                        <div className='flex items-center justify-start gap-2 cursor-pointer hover:scale-105 transition-all hover:underline'>
                            <FaUsers />
                            <a href="#" className="text-gray-100 ">Members</a>
                        </div>
                    </Link>
                    <Link to={"/rankings"}>
                        <div className='flex items-center justify-start gap-2 cursor-pointer hover:scale-105 transition-all hover:underline'>
                            <FaRankingStar />
                            <a href="#" className="text-gray-100 ">Rankings</a>
                        </div>
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default LoggedInNav
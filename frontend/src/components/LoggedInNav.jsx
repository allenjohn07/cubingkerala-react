import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import logo from '../assets/cubingkeralalogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaCubes, FaUsers, FaRankingStar } from "react-icons/fa6";
import { Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useSnackbar } from 'notistack';

const LoggedInNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [_, setCookies] = useCookies(["access_token"]);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const userId = import.meta.env.VITE_ADMIN_USER_ID;

    useEffect(() => {
        const userfromlocalstorage = JSON.parse(window.localStorage.getItem('user'));
        setUser(userfromlocalstorage);
    }, []);

    // logout function
    const handleLogout = () => {
        enqueueSnackbar("Logging out", { variant: 'success' });
        setTimeout(() => {
            setCookies("access_token", "");
            window.localStorage.clear();
            window.location.replace("/");
        }, 2000);
    };

    // navigate to requests page function
    const handleRequestRedirect = () => {
        navigate("/admin/requests");
    };

    const handleProfileRedirect = (wcaid) => {
        navigate(`/profile/${wcaid}`)
    }

    return (
        <nav className="text-gray-100 py-7 px-5 lg:px-10">
            <div className="container mx-auto flex items-center justify-between">
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

                {/* Navigation items and Avatar on the right for larger screens */}
                <div className="hidden md:flex items-center space-x-10 ml-auto">
                    <Link to={"/competitions"}>
                        <Button className='bg-transparent flex items-center justify-center gap-2 cursor-pointer hover:underline'>
                            <FaCubes className='text-white' />
                            <p className="text-gray-100">Competitions</p>
                        </Button>
                    </Link>
                    <Link to={"/members"}>
                        <Button className=' bg-transparent flex items-center justify-center gap-2 cursor-pointer'>
                            <FaUsers className='text-white' />
                            <p className="text-gray-100">Members</p>
                        </Button>
                    </Link>
                    <Link to={"/rankings"}>
                        <Button className=' bg-transparent flex items-center justify-center gap-2 cursor-pointer'>
                            <FaRankingStar className='text-white' />
                            <p className="text-gray-100">Rankings</p>
                        </Button>
                    </Link>
                    {
                        user ? <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    as="button"
                                    className="transition-transform h-5 w-5 lg:h-7 lg:w-7 hover:scale-105"
                                    color="black"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem textValue='profile' key="profile" className="h-14 gap-2">
                                    <p>Signed in as</p>
                                    <p className="font-semibold text-success">{user?.name}</p>
                                </DropdownItem>
                                {
                                    user?.userID === userId ? null : <DropdownItem textValue='Myprofile' onClick={() => handleProfileRedirect(user?.wcaid)} key="Myprofile">My Profile</DropdownItem>
                                }
                                {
                                    user?.userID === userId ? <DropdownItem textValue='requests' onClick={() => handleRequestRedirect()} key="requests">Member Requests</DropdownItem> : null
                                }
                                <DropdownItem onClick={handleLogout} key="logout" color="danger">Log Out</DropdownItem>           
                            </DropdownMenu>
                        </Dropdown> :
                            <div>
                                <Link to={"/login"}><Button className='bg-transparent text-white'>Login</Button></Link>

                            </div>
                    }
                </div>

                {/* Avatar on the right for smaller screens */}
                <div className="md:hidden flex items-center">
                    {
                        user ? <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    as="button"
                                    className="transition-transform h-6 w-6 lg:h-7 lg:w-7 hover:scale-105"
                                    color="black"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem textValue='profile' key="profile" className="h-14 gap-2">
                                    <p>Signed in as</p>
                                    <p className="font-semibold text-success">{user?.name}</p>
                                </DropdownItem>
                                {
                                    user?.userID === userId ? null : <DropdownItem textValue='Myprofile' onClick={() => handleProfileRedirect(user?.wcaid)} key="Myprofile">My Profile</DropdownItem>
                                }
                                {
                                    user?.userID === userId ? <DropdownItem textValue='requests' onClick={handleRequestRedirect} key="requests">Member Requests</DropdownItem> : null
                                }
                                <DropdownItem onClick={handleLogout} key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown> : <div>
                            <Link to={"/login"}><span className='bg-transparent text-white hover:underline text-md'>Login</span></Link>

                        </div>
                    }
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden mt-6 transition-max-height duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <Link to={"/competitions"} onClick={() => setIsOpen(false)}>
                    <div className='bg-transparent flex items-center justify-start gap-2 cursor-pointer hover:underline'>
                        <FaCubes className='text-white' />
                        <p className="text-gray-100">Competitions</p>
                    </div>
                </Link>
                <Link to={"/members"} onClick={() => setIsOpen(false)}>
                    <div className=' bg-transparent flex items-center justify-start pt-2 gap-2 cursor-pointer'>
                        <FaUsers className='text-white' />
                        <p className="text-gray-100">Members</p>
                    </div>
                </Link>
                <Link to={"/rankings"} onClick={() => setIsOpen(false)}>
                    <div className=' bg-transparent flex items-center justify-start pt-2 gap-2 cursor-pointer'>
                        <FaRankingStar className='text-white' />
                        <p className="text-gray-100">Rankings</p>
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default LoggedInNav;



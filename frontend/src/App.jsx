import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Competitions from './pages/Competitions'
import Members from './pages/Members'
import Rankings from './pages/Rankings'
import CompetitionInfo from './pages/CompetitionInfo'
import PersonInfo from './pages/PersonInfo'
import Requests from './pages/Requests'
import MyProfile from './pages/MyProfile'

const App = () => {

  const userID = import.meta.env.VITE_ADMIN_USER_ID
  const [user, setUser] = useState(null) 

  useEffect(()=>{
    const storedUser = window.localStorage.getItem('user')
    try {
      setUser(JSON.parse(storedUser))
    } catch (e) {
      console.error('Failed to parse user from localStorage', e)
    }
  }, [])

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/competitions' element={<Competitions />} />
          <Route path='/members' element={<Members />} />
          <Route path='/rankings' element={<Rankings />} />
          <Route path='/competitions/:compId' element={<CompetitionInfo />} />
          <Route path='/persons/:personId' element={<PersonInfo />} />
          <Route path='/admin/requests' element={ user?.userID === userID ? <Requests /> : <Home/>} />
          <Route path='/profile/:id' element={user ? <MyProfile /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App


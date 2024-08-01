import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { useCookies } from 'react-cookie'
import Competitions from './pages/Competitions'
import Members from './pages/Members'
import Rankings from './pages/Rankings'
import CompetitionInfo from './pages/CompetitionInfo'
import PersonInfo from './pages/PersonInfo'
import Requests from './pages/Requests'
import MyProfile from './pages/MyProfile'

const App = () => {
  const [cookies, setCookies] = useCookies(["access_token"])
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
          <Route path='/admin/requests' element={<Requests />} />
          <Route path='/profile/:id' element={<MyProfile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

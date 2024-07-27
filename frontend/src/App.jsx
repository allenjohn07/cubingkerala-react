import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import InsideHome from './pages/InsideHome'
import { useCookies } from 'react-cookie'
import Competitions from './pages/Competitions'
import Members from './pages/Members'
import Rankings from './pages/Rankings'
import CompetitionInfo from './pages/CompetitionInfo'
import PersonInfo from './pages/PersonInfo'
import Requests from './pages/Requests'


const App = () => {
  const [cookies, setCookies] = useCookies(["access_token"])
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={cookies.access_token ? <InsideHome /> : <Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/competitions' element={<Competitions />} />
          <Route path='/members' element={<Members />} />
          <Route path='/rankings' element={<Rankings />} />
          <Route path='/competitions/:compId' element={<CompetitionInfo />} />
          <Route path='/persons/:personId' element={<PersonInfo />} />
          <Route path='/admin/requests' element={<Requests />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

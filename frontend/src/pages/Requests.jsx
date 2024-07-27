import React from 'react'
import LoggedInNav from '../components/LoggedInNav.jsx'
import RequestTable from '../components/RequestsTable/RequestTable.jsx'

const Requests = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-black to-gray-800 text-gray-100">
      <LoggedInNav />
      <div className="p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-center">Cubing Kerala Members</h1>
        <RequestTable />
      </div>
    </div>
  )
}

export default Requests
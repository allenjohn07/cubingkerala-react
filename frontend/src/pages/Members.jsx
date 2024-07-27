import React from 'react';
import LoggedInNav from '../components/LoggedInNav';
import TableComponent4 from '../components/MembersTable/TableComponent4';
import CreateMemberModal from '../components/CreateMemberModal';
import DownFooter from '../components/DownFooter.jsx'

const Members = () => {
  return (
    <div className="bg-gradient-to-tr from-black to-gray-800 text-gray-100 min-h-screen">
      <LoggedInNav />
      <div className="p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-center">Members</h1>
        <div className='w-full lg:w-2/3'>
          <TableComponent4/>
        </div>
      </div>
      <div className='w-full pb-10'>
        <CreateMemberModal/>
      </div>
      <DownFooter/>
    </div>
  );
};

export default Members;

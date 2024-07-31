// import React, { useEffect, useState } from 'react';
// import LoggedInNav from '../components/LoggedInNav';
// import TableComponent4 from '../components/MembersTable/TableComponent4';
// import CreateMemberModal from '../components/CreateMemberModal';
// import DownFooter from '../components/DownFooter.jsx'
// import { instance } from '../config/AxiosConfig.jsx';
// import { Progress } from '@nextui-org/react';

// const Members = () => {
//   const [members, setMembers] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     try {
//       const fetchMembers = async () => {
//         const response = await instance.get("/members/getMembers")
//         setMembers(response.data.members);
//       }
//       fetchMembers()
//     } catch (error) {
//       console.log(error);
//     }
//   }, [])

//   return (
//     <div className="bg-black text-gray-200 min-h-screen">
//       <LoggedInNav />
//       {
//         isLoading ? (<Progress
//           size="sm"
//           color='success'
//           isIndeterminate
//           aria-label="Loading..."
//           className="max-w-full flex-grow"
//         />) : (<div>
//           <div className="p-8 flex flex-col items-center">
//             <h1 className="text-3xl font-bold mb-8 text-center">Members</h1>
//             <div className='w-full lg:w-2/3'>
//               <TableComponent4 members={members} />
//             </div>
//           </div>
//           <div className='w-full pb-10'>
//             <CreateMemberModal />
//           </div>
//         </div>)
//       }
//       <DownFooter />
//     </div>
//   );
// };

// export default Members;


import React, { useEffect, useState } from 'react';
import LoggedInNav from '../components/LoggedInNav';
import TableComponent4 from '../components/MembersTable/TableComponent4';
import CreateMemberModal from '../components/CreateMemberModal';
import DownFooter from '../components/DownFooter.jsx';
import { instance } from '../config/AxiosConfig.jsx';
import { Progress } from '@nextui-org/react';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await instance.get("/members/getMembers");
        setMembers(response.data.members);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <LoggedInNav />
      <div className="flex-grow">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Progress
              size="sm"
              color='success'
              isIndeterminate
              aria-label="Loading..."
              className="max-w-full"
            />
          </div>
        ) : (
          <div>
            <div className="p-8 flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-8 text-center">Members</h1>
              <div className='w-full lg:w-2/3'>
                <TableComponent4 members={members} />
              </div>
            </div>
            <div className='w-full pb-10'>
              <CreateMemberModal />
            </div>
          </div>
        )}
      </div>
      <DownFooter />
    </div>
  );
};

export default Members;


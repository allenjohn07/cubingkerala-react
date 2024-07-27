import React, { useState } from 'react';
import LoggedInNav from '../components/LoggedInNav';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Select, SelectItem, Button, User } from "@nextui-org/react";
import DownFooter from '../components/DownFooter.jsx';

const dummyRankings = [
  { name: "Junior Garcia", wcaid: "2017JOHN14", average: "12.34" },
  { name: "Alex Johnson", wcaid: "2017JOHN14", average: "10.87" },
  { name: "Maria Rodriguez", wcaid: "2017JOHN14", average: "15.23" },
  { name: "John Doe", wcaid: "2017JOHN14", average: "14.56" },
  { name: "Emily Davis", wcaid: "2017JOHN14", average: "11.78" },
  { name: "Michael Brown", wcaid: "2017JOHN14", average: "13.45" },
  { name: "Jessica Miller", wcaid: "2017JOHN14", average: "12.67" },
  { name: "David Wilson", wcaid: "2017JOHN14", average: "9.34" },
  { name: "Sophia Martinez", wcaid: "2017JOHN14", average: "14.21" },
  { name: "James Anderson", wcaid: "2017JOHN14", average: "13.89" }
];

const Rankings = () => {
  const [event, setEvent] = useState('333');
  const [round, setRound] = useState('Average');

  const handleEventChange = (value) => {
    setEvent(value);
  };

  const handleRoundChange = (value) => {
    setRound(value);
  };

  const handleSubmit = () => {
    // Implement the logic to filter rankings based on selected event and round
    console.log(`Selected Event: ${event}, Selected Round: ${round}`);
  };

  return (
    <div className="bg-gradient-to-tr from-black to-gray-800 text-gray-100 min-h-screen">
      <LoggedInNav />
      <div className="p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-center">Rankings</h1>
        <div className='w-full lg:w-2/3'>
          <div className='w-full flex justify-end py-2'>
            <div className='flex items-end w-[350px] gap-2'>
              <Select labelPlacement='outside' label="event"
                variant='bordered'
                selectedValue={event}
                onChange={(e) => handleEventChange(e.target.value)}
              >
                <SelectItem value="333">3x3x3</SelectItem>
                <SelectItem value="444">4x4x4</SelectItem>
                <SelectItem value="555">5x5x5</SelectItem>
                <SelectItem value="666">6x6x6</SelectItem>
                <SelectItem value="777">7x7x7</SelectItem>
                <SelectItem value="333bf">3x3x3 Blindfolded</SelectItem>
              </Select>
              <Select labelPlacement='outside' label="round"
                variant='bordered'
                selectedValue={round}
                onChange={(e) => handleRoundChange(e.target.value)}
              >
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Average">Average</SelectItem>
              </Select>
              <Button
              size='xs'
                auto
                onClick={handleSubmit}
                className='bg-black text-white'
              >
                Submit
              </Button>
            </div>
          </div>
          <Table radius='sm' isStriped aria-label="Rankings Table" className="max-w-full mx-auto text-black">
            <TableHeader>
              <TableColumn className='bg-black'>Rank</TableColumn>
              <TableColumn className='bg-black'>WCA ID</TableColumn>
              <TableColumn className='bg-black'>Name</TableColumn>
              <TableColumn className='bg-black'>Result</TableColumn>
              <TableColumn className='bg-black'>NR</TableColumn>
              <TableColumn className='bg-black'>CR</TableColumn>
              <TableColumn className='bg-black'>WR</TableColumn>
            </TableHeader>
            <TableBody>
              {dummyRankings.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{member.wcaid}</TableCell>
                  <TableCell><div className='flex items-center'> <User avatarProps={{radius:"lg", size:"sm"}}></User> {member.name}</div></TableCell>
                  <TableCell>{member.average}</TableCell>
                  <TableCell>{member.average}</TableCell>
                  <TableCell>{member.average}</TableCell>
                  <TableCell>{member.average}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <DownFooter />
    </div>
  );
};

export default Rankings;

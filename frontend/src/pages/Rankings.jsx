import React, { useEffect, useState } from 'react';
import LoggedInNav from '../components/LoggedInNav';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Select, SelectItem, User } from "@nextui-org/react";
import DownFooter from '../components/DownFooter.jsx';
import { instance } from '../config/AxiosConfig.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Progress } from '@nextui-org/react';

const Rankings = () => {
  const [event, setEvent] = useState('333');
  const [round, setRound] = useState('singles');
  const [members, setMembers] = useState([]);
  const [memberResults, setMemberResults] = useState([]);
  const [sortedResults, setSortedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await instance.get("/members/getMembers");
        setMembers(response.data.members);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    const fetchPersonResults = async () => {
      try {
        const results = await Promise.all(
          members.map(member => axios.get(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/${member.wcaid}.json`))
        );
        const data = results.map(result => result.data);
        setMemberResults(data);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false)
      }, 500);
      }
    };

    if (members.length > 0) {
      fetchPersonResults();
    }
  }, [members]);

  useEffect(() => {
    if (memberResults.length > 0) {
      sortMembers(memberResults, event, round);
    }
  }, [event, round, memberResults]);

  const convertMillisecondsToTime = (milliseconds) => {
    if (milliseconds < 0) {
      return 'DNF';
    }

    let totalSeconds = milliseconds / 100;
    if (totalSeconds < 60) {
      return totalSeconds.toFixed(2);
    } else {
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = (totalSeconds % 60).toFixed(2);
      return `${minutes}.${seconds < 10 ? '0' : ''}${seconds}`;
    }
  };

  const sortMembers = (results, event, round) => {
    const sortedMembers = results.slice().sort((a, b) => {
      const aEvent = a.rank[round]?.find(r => r.eventId === event);
      const bEvent = b.rank[round]?.find(r => r.eventId === event);

      const aBest = aEvent ? aEvent.best : Infinity;
      const bBest = bEvent ? bEvent.best : Infinity;

      return aBest - bBest;
    });

    setSortedResults(sortedMembers);
  };

  const returnImageUrl = (id) => {
    return members.find(i => i.wcaid === id).imageUrl;
  };

  return (
    <div className="bg-black text-gray-200 flex flex-col justify-between min-h-screen">
      <div>
        <LoggedInNav />
        {isLoading ? (
            <Progress
              size="sm"
              color='success'
              isIndeterminate
              aria-label="Loading..."
              className="max-w-full flex-grow"
            />
        ) : (
          <div className="px-8 py-0 lg:py-8 flex flex-col items-center animate-fadeIn">
            <h1 className="text-3xl font-bold mb-8 text-center">Rankings</h1>
            <div className='w-full lg:w-2/3'>
              <div className='w-full flex justify-end py-2'>
                <div className='flex items-end w-[350px] gap-3'>
                  <Select color='success' radius='none' value={event} onChange={(e) => setEvent(e.target.value)} labelPlacement='outside' label="event" variant='underlined'>
                    <SelectItem key={"222"} value="333">2x2x2</SelectItem>
                    <SelectItem key={"333"} value="333">3x3x3</SelectItem>
                    <SelectItem key={"444"} value="444">4x4x4</SelectItem>
                    <SelectItem key={"555"} value="555">5x5x5</SelectItem>
                    <SelectItem key={"666"} value="666">6x6x6</SelectItem>
                    <SelectItem key={"777"} value="777">7x7x7</SelectItem>
                    <SelectItem key={"333bf"} value="333bf">3x3x3 Blindfolded</SelectItem>
                    <SelectItem key={"333fm"} value="333fm">3x3x3 Fewest Moves</SelectItem>
                    <SelectItem key={"333oh"} value="333oh">3x3x3 One-Handed</SelectItem>
                    <SelectItem key={"minx"} value="minx">Megaminx</SelectItem>
                    <SelectItem key={"pyram"} value="333bf">Pyraminx</SelectItem>
                    <SelectItem key={"sq1"} value="sq1">Square-1</SelectItem>
                    <SelectItem key={"skewb"} value="skewb">Skewb</SelectItem>
                    <SelectItem key={"clock"} value="clock">Clock</SelectItem>
                    {/* <SelectItem key={"333mbf"} value="333mbf">3x3x3 Multi-Blind</SelectItem> */}
                    {/* <SelectItem key={"444bf"} value="444bf">4x4x4 Blindfolded</SelectItem> */}
                    {/* <SelectItem key={"555bf"} value="555bf">5x5x5 Blindfolded</SelectItem> */}
                  </Select>
                  <Select color='success' radius='none' value={round} onChange={(e) => setRound(e.target.value)} labelPlacement='outside' label="round" variant='underlined'>
                    <SelectItem key={"singles"} value="singles">Single</SelectItem>
                    <SelectItem key={"averages"} value="averages">Average</SelectItem>
                  </Select>
                </div>
              </div>
              <Table radius='sm' aria-label="Rankings Table" classNames={{
                wrapper: "max-h-[382px] text-gray-200 bg-zinc-900",
              }}>
                <TableHeader>
                  <TableColumn className='bg-black cursor-default'>Rank</TableColumn>
                  <TableColumn className='bg-black cursor-default'>WCA ID</TableColumn>
                  <TableColumn className='bg-black cursor-default min-w-[270px]'>Name</TableColumn>
                  <TableColumn className='bg-black cursor-default'>Result</TableColumn>
                  <TableColumn className='bg-black cursor-default'>NR</TableColumn>
                  <TableColumn className='bg-black cursor-default'>CR</TableColumn>
                  <TableColumn className='bg-black cursor-default'>WR</TableColumn>
                </TableHeader>
                <TableBody>
                  {sortedResults?.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell className='bg-green-500 text-black border-b-1 border-b-black w-2 font-semibold'>{index + 1}</TableCell>
                      <TableCell className='hover:text-blue-500 border-b-1 border-b-zinc-800'><Link to={`/persons/${member.id}`}>{member.id}</Link></TableCell>
                      <TableCell className='border-b-1 border-b-zinc-800'>
                        <div className='flex items-center cursor-default'>
                          <User avatarProps={{ radius: "lg", size: "sm", src: `${returnImageUrl(member.id)}` }} />
                          {member.name}
                        </div>
                      </TableCell>
                      <TableCell className='font-semibold cursor-default border-b-1 border-b-zinc-800'>
                        {
                          event === "333fm" && round === "singles" ? (member.rank[round].find(r => r.eventId === "333fm")?.best) : member.rank[round]?.find(r => r.eventId === event) ? convertMillisecondsToTime(member.rank[round].find(r => r.eventId === event).best) : ''
                        }
                      </TableCell>
                      <TableCell className='cursor-default border-b-1 border-b-zinc-800'>{member.rank[round]?.find(r => r.eventId === event)?.rank?.country ?? ''}</TableCell>
                      <TableCell className='cursor-default border-b-1 border-b-zinc-800'>{member.rank[round]?.find(r => r.eventId === event)?.rank?.continent ?? ''}</TableCell>
                      <TableCell className='cursor-default border-b-1 border-b-zinc-800'>{member.rank[round]?.find(r => r.eventId === event)?.rank?.world ?? ''}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className='text-xs text-center text-gray-500 mt-5'>event: {event} | round: {round}</p>
          </div>
        )}
      </div>
      <DownFooter />
    </div>
  );
};

export default Rankings;








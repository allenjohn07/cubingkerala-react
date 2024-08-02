import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import axios from 'axios';
import { Tooltip, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';


const ResultsTable = ({ result, eventId }) => {
    const [names, setNames] = useState({});

    useEffect(() => {
        const fetchNames = async () => {
            const namesObj = {};
            for (const table of result) {
                const response = await axios(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/${table.personId}.json`);
                namesObj[table.personId] = response.data.name;
            }
            setNames(namesObj);
        };
        fetchNames();
    }, [result]);


    function convertMillisecondsToTime(milliseconds) {
        if (milliseconds < 0) {
            return 'DNF';
        }

        let totalSeconds = milliseconds / 100;

        if (totalSeconds < 60) {
            return totalSeconds.toFixed(2);
        } else {
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = (totalSeconds % 60).toFixed(2);
            if (seconds < 10) {
                return `${minutes}.0${seconds}`;
            }
            return `${minutes}.${seconds}`;
        }
    }

    return (
        <div className='flex flex-col items-start p-2'>
            <span className={`cubing-icon event-${eventId} px-2 cursor-default text-lg`}><span className='px-2'>{eventId}</span></span>
            <Table radius='sm' aria-label="Example static collection table" className="custom-table cursor-default">
                <TableHeader className="custom-table-header">
                    <TableColumn className='bg-black '>#</TableColumn>
                    <TableColumn className='bg-black '>Name</TableColumn>
                    <TableColumn className='bg-black '>Best</TableColumn>
                    <TableColumn className='bg-black '>Average</TableColumn>
                </TableHeader>
                <TableBody>
                    {
                        result.map((table, i) => (
                            <TableRow key={i} className="custom-table-row text-gray-200">
                                <TableCell className='cursor-default w-5 bg-success text-black font-semibold border-b-1 border-b-black' >{table.position}</TableCell>
                                <TableCell className='hover:text-blue-500 cursor-pointer border-b-1 border-b-zinc-800'><Link to={`/persons/${table.personId}`}>{names[table.personId]}</Link></TableCell>
                                <TableCell className='cursor-default font-semibold border-b-1 border-b-zinc-800'>{table.eventId === "333fm" ? (Math.ceil((convertMillisecondsToTime(table.best)) * 100)) : table.eventId === "333mbf" ? 'n/a' : convertMillisecondsToTime(table.best)}</TableCell>
                                <TableCell className='cursor-default font-semibold border-b-1 border-b-zinc-800'>{table.eventId === "333mbf" ? 'n/a' :
                                    convertMillisecondsToTime(table.average)}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default ResultsTable;

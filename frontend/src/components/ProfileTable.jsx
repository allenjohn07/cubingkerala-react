import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";

const ProfileTable = ({ person }) => {
    const [single, setSingle] = useState([]);
    const [average, setAverage] = useState([]);
    const [mergedResult, setMergedResult] = useState([]);

    useEffect(() => {
        if (person) {
            setSingle(person.rank.singles || []);
            setAverage(person.rank.averages || []);
        }
    }, [person]);

    useEffect(() => {
        if (single.length > 0 && average.length > 0) {
            const mergedResults = single.map(single => {
                const averages = average.find(avg => avg.eventId === single.eventId) || {};
                return {
                    eventId: single.eventId,
                    bestSingle: single.best,
                    bestAverage: averages.best || null,
                    singleRank: single.rank,
                    averageRank: averages.rank || {}
                };
            });
            setMergedResult(mergedResults);
        }
    }, [single, average]);

    console.log(mergedResult);

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
        <Table radius='sm' isStriped className='mt-10 text-gray-900' aria-label="Example static collection table">
            <TableHeader>
                <TableColumn className='bg-black text-gray-100'>Event</TableColumn>
                <TableColumn className='bg-black text-gray-100'>NR</TableColumn>
                <TableColumn className='bg-black text-gray-100'>WR</TableColumn>
                <TableColumn className='bg-black text-gray-100'>Best</TableColumn>
                <TableColumn className='bg-black text-gray-100'>Average</TableColumn>
                <TableColumn className='bg-black text-gray-100'>WR</TableColumn>
                <TableColumn className='bg-black text-gray-100'>NR</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    mergedResult?.map((obj, index) => (
                        <TableRow key={index}>
                            <TableCell><Tooltip radius='sm' placement='left' content={obj.eventId}><span className={`cubing-icon event-${obj.eventId} px-2 text-lg cursor-pointer`}></span></Tooltip></TableCell>
                            <TableCell className='text-gray-600'>{obj.singleRank.country}</TableCell>
                            <TableCell className='text-gray-600'>{obj.singleRank.world}</TableCell>
                            <TableCell className='font-semibold'>{obj.eventId === "333fm" ? (Math.ceil((convertMillisecondsToTime(obj.bestSingle)) * 100)) : obj.eventId === "333mbf" ? 'n/a' : convertMillisecondsToTime(obj.bestSingle)}</TableCell>
                            <TableCell className='font-semibold'>{obj.eventId === "333mbf" ? 'n/a' :
                                    convertMillisecondsToTime(obj.bestAverage)}</TableCell>
                            <TableCell className='text-gray-600'>{obj.averageRank.world}</TableCell>
                            <TableCell className='text-gray-600'>{obj.averageRank.country}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}

export default ProfileTable;
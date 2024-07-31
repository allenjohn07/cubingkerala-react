import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import LoggedInNav from '../components/LoggedInNav';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './Map.css';
import { IoMdClose } from "react-icons/io";
import '@cubing/icons';
import ResultsTable from '../components/ResultsTable';
import DownFooter from '../components/DownFooter';
import { Tooltip as EventMarker } from '@nextui-org/react';
import { Progress } from "@nextui-org/react";

const CompetitionInfo = () => {
    const { compId } = useParams();
    const [competitionDetails, setCompetitionDetails] = useState(null);
    const [competitionResults, setCompetitionResults] = useState([]);
    const [coordinates, setCoordinates] = useState({
        latitude: '',
        longitude: ''
    });
    const [mapVisible, setMapVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCompetitionDetails = async () => {
            try {
                const response = await axios.get(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/${compId}.json`);
                setCompetitionDetails(response.data);
                setCoordinates({ latitude: response.data.venue.coordinates.latitude, longitude: response.data.venue.coordinates.longitude });
                const results = await axios.get(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/results/${compId}.json`);
                setCompetitionResults(results.data.items.filter((comp) => comp.round === 'Final' && comp.position <= 3));
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchCompetitionDetails();
    }, [compId]);

    const groupByEventId = (items) => {
        return items.reduce((acc, item) => {
            if (!acc[item.eventId]) {
                acc[item.eventId] = [];
            }
            acc[item.eventId].push(item);
            return acc;
        }, {});
    };

    const groupedItems = groupByEventId(competitionResults);

    return (
        <div className="flex flex-col min-h-screen bg-black text-gray-400">
            <LoggedInNav />
            <div className="flex-grow">
                {isLoading ? (
                    <Progress
                        size="sm"
                        color='success'
                        isIndeterminate
                        aria-label="Loading..."
                        className="max-w-full flex-grow"
                    />
                ) : (
                    <div className='p-8'>
                        <h1 className="text-xl lg:text-3xl font-bold pb-8 text-center text-gray-100">{competitionDetails?.name}</h1>
                        {mapVisible ? (
                            <div>
                                <div className='flex justify-end py-2'>
                                    <IoMdClose onClick={() => setMapVisible(!mapVisible)} className='hover:bg-gray-100 rounded-sm cursor-pointer' />
                                </div>
                                <MapContainer center={[coordinates.latitude, coordinates.longitude]} zoom={13} scrollWheelZoom={true}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[coordinates.latitude, coordinates.longitude]}>
                                        <Tooltip>
                                            {competitionDetails?.venue.address}
                                        </Tooltip>
                                    </Marker>
                                </MapContainer>
                            </div>
                        ) : null}
                        <div>
                            <div className='flex items-center gap-1 pt-10 pb-2'>
                                <p className='font-semibold'>
                                    <span className='font-normal'>{new Date(competitionDetails?.date.from).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} - {new Date(competitionDetails?.date.till).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                </p>
                            </div>
                            <div className='flex items-center gap-1 pb-2'>
                                <p className='font-semibold'>
                                    <span className='font-normal'>{competitionDetails?.city}</span>
                                    <span className='text-normal font-normal hover:underline ml-3 lg:ml-5 cursor-pointer text-success' onClick={() => setMapVisible(!mapVisible)}>Map</span>
                                </p>
                            </div>
                            <div className='flex items-center pb-2'>
                                <p className='font-semibold'>
                                    {competitionDetails?.organisers.map((organiser, index) => (
                                        <span key={index} className='font-normal flex pr-4'>{organiser.name}</span>
                                    ))}
                                </p>
                            </div>
                            <div className='flex items-center gap-1 pb-2'>
                                <p className='font-semibold'>
                                    {competitionDetails?.events.map((event, index) => (
                                        <EventMarker key={index} content={event}>
                                            <span className={`cubing-icon event-${event} pr-4`}></span>
                                        </EventMarker>
                                    ))}
                                </p>
                            </div>
                        </div>
                        {competitionResults.length < 1 ? (
                            <div className='py-8 lg:py-20 text-start'>
                                <h1 className="text-2xl lg:text-3xl font-semibold text-success">Results will be available after the competition.</h1>
                                <Link to={`https://www.worldcubeassociation.org/competitions/${compId}/register`}>
                                    <span className='hover:underline'>Register for {competitionDetails?.name}</span>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-3xl font-semibold py-8 text-center text-success">Results</h1>
                                <div className='grid grid-cols-1 lg:grid-cols-2 p-4 gap-3'>
                                    {Object.entries(groupedItems)?.map(([eventId, items], index) => (
                                        <ResultsTable key={index} eventId={eventId} result={items} />
                                    ))}
                                </div>
                                <Link to={`https://www.worldcubeassociation.org/competitions/${compId}/results/by_person`}>
                                    <div className='text-center text-[12px] lg:text-[16px] hover:underline pt-10'>
                                        Complete Competition Results
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
            <DownFooter />
        </div>
    );
};

export default CompetitionInfo;



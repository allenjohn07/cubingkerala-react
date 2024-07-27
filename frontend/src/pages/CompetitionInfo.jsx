import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CiCalendar } from "react-icons/ci";
import LoggedInNav from '../components/LoggedInNav';
import { MdOutlinePlace } from "react-icons/md";
import { VscOrganization } from "react-icons/vsc";
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import './Map.css'
import { IoMdClose } from "react-icons/io";
import { GrAppsRounded } from "react-icons/gr";
import '@cubing/icons'
import ResultsTable from '../components/ResultsTable';
import DownFooter from '../components/DownFooter';

const CompetitionInfo = () => {
    const { compId } = useParams();
    const [competitionDetails, setCompetitionDetails] = useState(null);
    const [competitionResults, setCompetitionResults] = useState([]);
    const [coordinates, setCoordinates] = useState({
        latitude: '',
        longitude: ''
    })
    const [mapVisible, setMapVisible] = useState(false)

    console.log(compId);

    useEffect(() => {
        const fetchCompetitionDetails = async () => {
            try {
                const response = await axios.get(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/${compId}.json`);
                setCompetitionDetails(response.data);
                setCoordinates({ latitude: response.data.venue.coordinates.latitude, longitude: response.data.venue.coordinates.longitude })
                const results = await axios.get(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/results/${compId}.json`)
                setCompetitionResults(results.data.items.filter((comp) => comp.round === 'Final' && comp.position <= 3))
            } catch (error) {
                console.log(error);
            }
        };

        fetchCompetitionDetails();
    }, [compId]);

    console.log(competitionDetails);
    console.log(competitionResults);

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
        <div className="min-h-screen bg-gradient-to-tr from-black to-gray-800 text-gray-400">
            <LoggedInNav />
            <div className='p-8'>
                <h1 className="text-3xl font-bold pb-8 text-center text-gray-100">{competitionDetails?.name}</h1>
                {
                    mapVisible ?
                        <div>
                            <div className='flex justify-end py-2'><IoMdClose onClick={() => setMapVisible(!mapVisible)} className='hover:bg-gray-100 rounded-sm cursor-pointer' /></div>
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
                        </div> : null
                }
                <div>
                    <div className='flex items-center gap-1 pt-10 pb-2'>
                        <CiCalendar size={"20px"} />
                        <p className='font-semibold'>Date : <span className='font-normal'>{new Date(competitionDetails?.date.from).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} - {new Date(competitionDetails?.date.till).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span></p>
                    </div>
                    <div className='flex items-center gap-1 pb-2'>
                        <MdOutlinePlace size={"20px"} />
                        <p className='font-semibold'>City : <span className='font-normal'>{competitionDetails?.city}</span> <span className='text-normal font-normal underline ml-5 cursor-pointer text-blue-700' onClick={() => setMapVisible(!mapVisible)}>Location</span></p>
                    </div>
                    <div className='flex items-center gap-1 pb-2'>
                        <VscOrganization size={"20px"} />
                        <p className='font-semibold'>Organisers :
                            {
                                competitionDetails?.organisers.map((organiser, index) =>
                                    <span key={index} className='font-normal px-2'>{organiser.name}</span>)
                            }
                        </p>
                    </div>
                    <div className='flex items-center gap-1 pb-2'>
                        <GrAppsRounded size={"17px"} />
                        <p className='font-semibold'>Events :
                            {
                                competitionDetails?.events.map((event, index) =>
                                    <span key={index} className={`cubing-icon event-${event} px-2`}></span>)
                            }
                        </p>
                    </div>
                </div>
            </div>
            <h1 className="text-3xl font-semibold pb-8 text-center text-blue-700">Results</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 p-4 gap-3'>
                {Object.entries(groupedItems).map(([eventId, items], index) => (
                    <ResultsTable key={index} eventId={eventId} result={items} />
                ))}
            </div>
            <DownFooter/>
        </div>
    );
};

export default CompetitionInfo;

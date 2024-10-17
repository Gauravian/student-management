import React, { useEffect, useState } from 'react'
import Leftside from '../leftside/Leftside'
import axios from 'axios';



function Table() {

    const [timetable, setTimetable] = useState([]);
    const [profData, setProfData] = useState([]);


    useEffect(() => {

        axios.get('http://localhost:4005/api/prof')
            .then(response => {
                // setTimetable(response.data);
                // console.log(response.data);
                const data = response.data;

                const timetableArray = Array.isArray(data) ? data : Object.values(data);
                // setTimetable(timetableArray);
                console.log(timetableArray);


                if (Array.isArray(timetableArray) && Array.isArray(timetableArray[3])) {
                    setProfData(timetableArray[3]);


                }
            })
            .catch(error => {
                console.log(error);

            });

    }, []);






    useEffect(() => {

        axios.get('http://localhost:4005/api/timetable')
            .then(response => {

                const data = response.data;

                const timetableArray = Array.isArray(data) ? data : Object.values(data);

                console.log(timetableArray);


                if (Array.isArray(timetableArray) && Array.isArray(timetableArray[3])) {
                    setTimetable(timetableArray[3]);


                }
            })
            .catch(error => {
                console.log(error);

            });
    }, []);


    return (
        <>



            <div className='flex h-screen ml-24 '>


                <Leftside />
                <div className=' ml-10 mt-4 '>
                    <div className='my-2'>
                        <h1 className='text-start  text-red-900 text-4xl font-bold'>Time Table</h1>
                    </div>

                    <div className="overflow-x-auto">

                        <div className="overflow-x-auto">
                            <table className="table">

                                <thead>



                                    <tr className='border border-black'>
                                        <th>Sr.no</th>
                                        <th>Time</th>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                        <th>Saturday</th>
                                    </tr>
                                </thead>


                                <tbody className='border border-black'>
                                    {
                                        timetable.map((item, index) => (
                                            <tr key={index} className='border border-black'>
                                                <td>{item.id}</td>
                                                <td>{item.Time}</td>
                                                <td>{item.Monday}</td>
                                                <td>{item.Tuesday}</td>
                                                <td>{item.Wednesday}</td>
                                                <td>{item.Thursday}</td>
                                                <td>{item.Friday}</td>
                                                <td>{item.Saturday}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tbody className='border border-black'>

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className='font-bold'>:- Faculty Name -:</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table">
                                <thead className='border border-black'>
                                    <tr className='border border-black'>
                                        <th>Sr.no</th>
                                        <th>Subject Name</th>
                                        <th>Faculty Short Name</th>
                                        <th>Faculty Name</th>

                                    </tr>
                                </thead>
                                <tbody className='border border-black'>

                                    {
                                        profData.map((item, index) => (
                                            <tr key={index} className='border border-black'>
                                                <td>{item.id}</td>
                                                <td>{item.subject_name}</td>
                                                <td>{item.faculty_short_name}</td>
                                                <td>{item.faculty_name}</td>

                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>


                </div>
            </div>

        </>
    )
}


export default Table
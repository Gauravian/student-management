
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Icon from '../leftside/Icon';

function Teacher() {

   

    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await axios.get('http://localhost:4005/api/teacher');
            setPendingRequests(response.data.data);
        };
        fetchRequests();
    }, []);
    return (
        <>
            <div className='flex '>
                <div className='w-[30%] h-screen ml-24 bg-blue-500 rounded-r-2xl'>
                    <Icon />
                </div>
                <div className='w-60% ml-7'>


                    <div className='h-[10vh]' >

                        <h1 className='text-start  text-red-900 text-4xl font-bold '>Teachers Page</h1>

                    </div>
                    <div className='overflow-y-auto flex-1' style={{ maxHeight: "calc(94vh - 10vh )" }}>
                        
                        


                        <ul className='' >
                            <table className="table">
                            

                                <thead>
                               



                                    <tr className='border border-black  '>
                                        <th>Sr.no</th>
                                        <th>name</th>
                                        <th>email</th>
                                        <th>Role</th>
                                        <th >std</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>


                                <tbody className='border border-black'>
                                
                                    {pendingRequests.map(request => (
                                        <tr key={request.email} className=' '>

                                            <td>{request.id}</td>
                                            <td>{request.name}</td>
                                            <td>({request.email})</td>
                                            <td>({request.role})</td>
                                            <td className=" my-2 mx-4 btn btn-outline btn-success" >Std :- {request.std}</td>
                                            <td className="   text-blue-700 rounded-lg my-2 mx-2" ><button className='bg-blue-700 text-white rounded-xl px-2 py-3 hover:border-[2px] hover:border-blue-500 hover:bg-white hover:text-blue-500'>Status :- {request.isApproved}</button></td>



                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </ul>
                    </div>
                    <div className='bg-white w-[100%] p-3'>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Teacher
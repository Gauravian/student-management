import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from '../leftside/Icon';




function Admin() {
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await axios.get('http://localhost:4005/api/requests');
            setPendingRequests(response.data.data);
        };
        fetchRequests();
    }, []);

    const handleApprove = async (email) => {
        try {
            await axios.post('http://localhost:4005/api/approve', { email });
            alert(`User ${email} has been approved and can now log in.`);

            // Refresh the list of pending requests after approval
            setPendingRequests(pendingRequests.filter(user => user.email !== email));
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    const handleDeny = async (email) => {
        try {
            await axios.post('http://localhost:4005/api/denyuser', { email });
            alert(`User ${email} has been denied.`);

            // Refresh the list of pending requests after denial
            setPendingRequests(pendingRequests.filter(user => user.email !== email));
        } catch (error) {
            console.error('Error denying user:', error);
        }
    };

    return (
        <div className='flex '>
            <div className='w-[30%] h-screen ml-24 bg-blue-500 rounded-r-2xl'>
                <Icon />
            </div>
            <div className='w-60% ml-7'>


                <div className='h-[10vh]' >

                    <h1 className='text-start  text-red-900 text-4xl font-bold '>Admin Page</h1>
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
                                    
                                    <th>Approval</th>
                                    <th>Delete </th>

                                </tr>
                            </thead>
                            <tbody className='border border-black'>
                                {pendingRequests.map(request => (

                                    <tr key={request.email} className=' '>

                                        <td>{request.id}</td>
                                        <td>{request.name}</td>
                                        <td>({request.email})</td>
                                        <td>({request.role})</td>
                                        <td className=" my-2 mx-4 btn btn-outline btn-success" onClick={() => handleApprove(request.email)} > Approve </td>
                                        <td className="   text-blue-700 rounded-lg my-2 mx-2" >
                                            <button className='bg-red-500 text-white rounded-xl px-2 py-3 hover:border-[2px] hover:border-red-500 hover:bg-white hover:text-red-500 duration-200' onClick={() => handleDeny(request.email)}>Delete
                                                </button>
                                                </td>



                                    </tr>
                                    // <li key={request.email} className='flex flex-row text-center justify-between  justify-items-center items-center '>
                                    //     <div>
                                    //         <p className=' m-4 '>{request.id}</p>
                                    //     </div>
                                    //     <div>
                                    //         <p className=' m-4 '>{request.name}</p>
                                    //     </div>
                                    //     <div>
                                    //         <p className=' m-4'> ({request.email})</p>
                                    //     </div>
                                    //     <div>
                                    //         <p className=' m-4'> ({request.role})</p>
                                    //     </div>
                                    //     <div className=' flex gap-4'>
                                    //         <button className="btn btn-outline btn-secondary" onClick={() => handleApprove(request.email)}>Approve</button>
                                    //         <button className="btn btn-outline btn-error" onClick={() => handleDeny(request.email)}>Delete</button>
                                    //     </div>
                                    // </li>

                                ))}
                            </tbody>
                        </table>
                    </ul>
                </div>
                <div className='bg-white w-[100%] p-3'>

                </div>
            </div>
        </div>
    );
}

export default Admin
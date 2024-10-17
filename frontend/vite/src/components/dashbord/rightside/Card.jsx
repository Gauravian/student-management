import React, { useEffect, useState } from 'react'
import { IoMdInformationCircleOutline } from "react-icons/io";





function Card() {
    const [userRole, setUserRole] = useState('');
    useEffect(() => {
        // Example: Replace with actual logic to fetch the user role
        const storedRole = localStorage.getItem('logginRole'); // Assume "admin" or "teacher"
        setUserRole(storedRole);
    }, []);





    return (
        <>

            <div className='cursor-pointer hover:scale-105 duration-300'>
                <div className="card bg-base-100 w-[405px] shadow-xl gap-3">

                    <div className="card-body ">
                        <div className="card-actions justify-end">
                            <IoMdInformationCircleOutline className='cursor-pointer hover:text-blue-600' size={30} />
                        </div>



                        <div className='flex flex-row gap-2'>
                            <h2 className="card-title">Name :- </h2>
                            <p className='flex justify-start justify-items-center text-lg font-semibold'>{localStorage.getItem('logginUser')}</p>
                        </div>
                        {userRole !== 'Admin' && userRole !== 'Teacher' && (
                            <div className='flex flex-row gap-2'>
                                <h2 className="card-title">Std :- </h2>
                                <p className='flex justify-start justify-items-center text-lg font-semibold'>12</p>
                            </div>
                        )}


                        <div className='flex flex-row gap-2'>
                            <h2 className="card-title">Role :- </h2>
                            <p className='flex justify-start justify-items-center text-lg font-semibold'>{localStorage.getItem('logginRole')}</p>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <h2 className="card-title">Email :- </h2>
                            <p className='flex justify-start justify-items-center text-lg font-semibold'>{localStorage.getItem('logginEmail')}</p>
                        </div>




                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
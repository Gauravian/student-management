import React from 'react'
import { FaBookReader } from "react-icons/fa";
import { FaTableCellsLarge } from "react-icons/fa6";
import Card from './Card';
import { NavLink } from 'react-router-dom';


function StudentDash() {
    return (
        <>
            <div className='p-6 flex flex-col gap-10 '>
                <div>
                    <h1 className='text-start  text-red-900 text-4xl font-bold'>Student DashBoard</h1>
                </div>
                
                <div className='flex flex-row gap-6'>

                    <div>

                        <Card/>
                    </div>
                    

                    <NavLink to='/dashbord/table' className="card  w-96 h-44 shadow-xl bg-red-500 cursor-pointer">

                        
                        <div className="card-body">
                            <h2 className="card-title">
                                Time Table
                                
                            </h2>
                            
                            <div className="card-actions justify-start">
                                <FaTableCellsLarge className=' ' size={35} />
                                
                            </div>
                        </div>
                    </NavLink>

                    
                    

                
                </div>

            </div>
        </>
    )
}

export default StudentDash
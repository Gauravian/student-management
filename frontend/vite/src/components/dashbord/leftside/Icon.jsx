import React, { useEffect, useState } from 'react'
import { MdDashboard } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineMenu } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { RiAdminFill } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";



function Icon() {

  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Example: Replace with actual logic to fetch the user role
    const storedRole = localStorage.getItem('logginRole'); // Assume "admin" or "teacher"
    setUserRole(storedRole);
  }, []);
  return (
    <>

        <div className='my-8  px-10' >
        <MdOutlineMenu size={35} className ='font-bold animate-bounce' />

        </div>
      <div className=' text-white font-bold text-2xl '>
        <div className=' flex flex-col gap-10 my-10  px-16 justify-center justify-items-center text-center items-center'>

          <div className="avatar">
            <div className="w-36 rounded-full border-[5px] cursor-pointer">
              <img src="https://img.freepik.com/premium-photo/minimalist-cartoon-profile-pic-featuring-faceless-character-with-specs-small-goatee_1283595-32732.jpg" />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-10 my-5 text-start  px-10'>

          <NavLink to='/dashbord' className='gap-3 flex hover:bg-blue-950 hover:rounded-xl cursor-pointer hover:px-2 hover:py-2 duration-300' ><MdDashboard size={30} />Dashbord</NavLink>

          
          
          {userRole !== 'Teacher' && userRole !== 'Student' && (
            <NavLink to='/admin' className='gap-3 flex hover:bg-blue-950 hover:rounded-xl cursor-pointer hover:px-2 hover:py-2 duration-300'>
              <RiAdminFill size={30} />Admin Page
            </NavLink>
          )}

          {/* Show Teacher Page only if the user is not an admin */}
          {userRole !== 'Admin' && userRole !== 'Student' && (
            <NavLink to='/teacher' className='gap-3 flex hover:bg-blue-950 hover:rounded-xl cursor-pointer hover:px-2 hover:py-2 duration-300'>
              <FaChalkboardTeacher size={30} />Teachers Page
            </NavLink>
          )}
          <h1 className='gap-3 flex hover:bg-blue-950 hover:rounded-xl cursor-pointer hover:px-2 hover:py-2 duration-300'><FaBook size={30} />Study Materials</h1>
          <h1 className='gap-3 flex hover:bg-blue-950 hover:rounded-xl cursor-pointer hover:px-2 hover:py-2 duration-300'><PiStudentBold size={30} />View Attendance</h1>
        </div>


      </div>


    </>
  )
}

export default Icon
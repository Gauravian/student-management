import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'



function Navbar() {

  const [auth, setAuth] = useState(false);
  const location = useLocation();
  useEffect(() => {
    let token = localStorage.getItem('token')
    if (!token) {
      setAuth(false)
    } else {
      setAuth(true)

    }
  }, [location.pathname])

  const handleNavbar = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('logginEmail');
    localStorage.removeItem('logginRole');
    localStorage.removeItem('logginUser');

    setAuth(false)
  }

  return (
    <>
      <div>
        <div className='shadow-2xl mx-24 my-5 '>
          <div className="navbar bg-base-100  ">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl"><NavLink to='/'>Student Management</NavLink></a>
            </div>
            {
              !auth ?
                <div className="flex-none gap-2">
                  <div className=' flex gap-6 '>

                    <button className='bg-blue-500 text-white font-semibold text-base p-2 px-4 rounded-md border hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:scale-105 duration-300' ><NavLink to='/login' >Login</NavLink></button>
                    <button className='border-[2px] border-blue-500  text-blue-500 font-semibold text-base p-1 px-3 rounded-md hover:bg-blue-500 hover:text-white hover:scale-110 duration-300'><NavLink to='/register'>SignUp</NavLink></button>
                  </div>
                </div> : <button className='border-[2px] border-red-500  text-red-500 font-semibold text-base p-1 px-6 mr-4 rounded-md hover:bg-red-500 hover:text-white hover:scale-110 duration-300 ' onClick={handleNavbar}><NavLink to='/login'>Log out</NavLink></button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
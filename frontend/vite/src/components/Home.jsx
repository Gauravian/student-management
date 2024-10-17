import React from 'react'
import photo from '../assets/what-is-a-student-management-system-2.png'

function Home() {
  return (
    <>
    <div className='flex flex-col gap-5 justify-center justify-items-center text-center items-center'>
        <h1 className='text-5xl font-bold'>Welcome To Student Management System..!!!
        </h1>
        <img src={photo} className=' ' alt="" width={500} height={500}/>
    </div>

    </>
  )
}

export default Home
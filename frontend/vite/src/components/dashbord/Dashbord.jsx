import React from 'react'
import Leftside from './leftside/Leftside'
import Rightside from './rightside/Rightside'



function Dashbord() {
  return (
    <>
    <div className='flex h-screen mx-24'>
      
      <Leftside/>
      <Rightside/>
    </div>
    
    </>
  )
}

export default Dashbord
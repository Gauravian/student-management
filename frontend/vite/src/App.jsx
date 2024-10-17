
import Login from './components/Login'
import Navbar from './components/Navbar'
import Registration from './components/Registration'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Dashbord from './components/dashbord/Dashbord'
import Table from './components/dashbord/rightside/Table'
import Otp from './components/Otp'
import Admin from './components/dashbord/rightside/Admin'
import PrivateRoutes from './components/PrivateRoutes'

import Teacher from './components/dashbord/rightside/Teacher'



function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/register/otp' element={<Otp />} />
        {/* <Route path='/dashboard/admin' element={<Cardsecond />} /> */}
        {/* <Route path='/teacher' element={<Teacher/>} /> */}
        {/* <Route path='/admin' element={<Admin/>} /> */}


        {/* Protect dashboard and admin routes */}
        <Route path="/dashbord" element={
          <PrivateRoutes allowedRoles={['Admin', 'Teacher', 'Student']}>
            <Dashbord />
          </PrivateRoutes>
        } />

        <Route path="/dashbord/table" element={
          <PrivateRoutes allowedRoles={['Admin', 'Student','Teacher']}>
            <Table />
          </PrivateRoutes>
        } />

        <Route path="/admin" element={
          <PrivateRoutes allowedRoles={['Admin']}>
            <Admin />
          </PrivateRoutes>
        } />

        <Route path="/teacher" element={
          <PrivateRoutes allowedRoles={['Teacher']}>
           <Teacher/>
          </PrivateRoutes>
        } />
      </Routes>
    </>
  )
}

export default App

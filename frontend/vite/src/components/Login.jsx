import React from 'react'


import { NavLink, useNavigate } from 'react-router-dom'
import { IoPersonCircleOutline } from "react-icons/io5";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaKey } from "react-icons/fa6";
import axios from 'axios'
import { useState } from 'react';


function Login() {

    const navigate = useNavigate();
    const [data, setdata] = useState({
        email: '',
        password: '',
        role: '',
        name: '',

    })

    console.log(data);

    const handlechanges = (e) => {

        const { name, value } = e.target;

        setdata({ ...data, [name]: value });


    }




    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:4005/api/login', data)
                .then((res) => {
                    if (res.status === 201) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('logginEmail', res.data.userData[0].email);
                        localStorage.setItem('logginRole', res.data.userData[0].role);
                        localStorage.setItem('logginUser', res.data.userData[0].name);

                        const userRole = res.data.userData[0].role;
                        const isApproved = res.data.userData[0].isApproved;
    
                        if (isApproved === 'denied' || isApproved === 'pending') {
                            alert("Your account is either pending approval or denied.");
                        } else {
                            alert("Login successful!");


        
                            // Redirect based on the role
                            if (userRole === 'Admin') {
                                navigate('/admin');  // Redirect to Admin dashboard
                            } else if(userRole === 'Teacher') {
                                navigate('/teacher');  // Redirect to generic dashboard
                            } else{
                                navigate('/dashbord'); 
                            }
                        }
                    }
                });
        } catch (error) {
            // If error response is available, display the error message
            if (error.response && error.response.status === 400) {
                alert(error.response.data.msg || "Something went wrong. Please try again.");
            } else {
                alert("An unexpected error occurred. Please try again later.");
            }
            console.log(error);
        }






        const { name, email, password, } = data;

        if (name === '') {
            alert("Please enter your Name");
        } else if (email === '') {
            alert("Please enter your email");

        } else if (!email.includes('@')) {
            alert("Please enter your valid email");
        } else if (password === '') {
            alert("Please enter your password");
        } else if (password.length < 6) {
            alert("password must be 6 characters");

        } else {
            console.log("user validation succefully completed !!!");
            


        }
    }



    return (
        <>

            <section className='flex justify-center justify-items-center '>

                

                <div className='shadow-2xl my-6 w-[40%]  '>
                    <div className='mt-7'>
                        <h1 className='text-center font-semibold text-3xl'>Welcome Back, To The Login </h1>
                        <p className='text-center'>Please Login..!!!</p>

                    </div>

                    <form action="">
                        <div className='flex flex-col ml-28 gap-2 mt-9 '>
                            <label className='text-lg font-semibold flex text-center gap-1'>Choose Your Role:<IoPersonCircleOutline size={25} /></label>

                            <select name="role" onChange={handlechanges} id="cars" className='w-[40%] border border-black p-1'>
                                <option value="Teacher" className='font-medium text-base'>teacher</option>
                                <option value="Student" className='font-medium text-base'>student</option>
                                <option value="Admin" className='font-medium text-base'>admin</option>

                            </select>
                        </div>
                        <div className='flex flex-col ml-28 gap-2 mt-9 '>
                            <label className='flex gap-1 text-center' htmlFor="">Name<HiOutlineMailOpen /></label>
                            <input name='name' onChange={handlechanges} type="name" placeholder="Type here" className="input input-bordered w-[80%] " />
                        </div>
                        <div className='flex flex-col ml-28 gap-2 mt-9 '>
                            <label className='flex gap-1 text-center' htmlFor="">Email<HiOutlineMailOpen /></label>
                            <input name='email' onChange={handlechanges} type="email" placeholder="Type here" className="input input-bordered w-[80%] " />
                        </div>

                        <div className='flex flex-col ml-28 gap-2 mt-9 '>
                            <label className='flex gap-1' htmlFor="">Password <FaKey /></label>
                            <input name='password' onChange={handlechanges} type="password" placeholder="Type here" className="input input-bordered w-[80%] " />
                        </div>
                        <div className='flex flex-col ml-40 gap-2 mt-9 text-center my-8 '>
                            <button className='bg-blue-500 w-[60%] py-2 rounded-xl font-semibold text-lg' onClick={handlesubmit}>Login</button>
                        </div>
                        <div className='flex flex-col ml-22 gap-2 mt-7 text-center my-8 '>
                            <p className='text-base'>Don't Have Any Account Please  <NavLink to='/register' className='text-blue-500 underline cursor-pointer'>Register</NavLink></p>
                        </div>
                       
                    </form>
                </div>
            </section>
        </>
    )

}

export default Login


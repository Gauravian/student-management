import  { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaKey } from "react-icons/fa6";
import axios from 'axios'




function Registration() {
    const navigate = useNavigate();
    const [data, setdata]=useState({
        email:'',
        name:'',
        password:'',
        role:'',
        std:''
    })

    console.log(data);

    const handlechanges = (e) => {

        const {name,value}=e.target;
    
        setdata({...data,[name]:value});
        
        
    }

    const handlesubmit = async(e) => {
        e.preventDefault()
        try {

            await axios.post('http://localhost:4005/api/register',data)
            .then((res) => {
                console.log(res)
                
                
            })

            
        } catch (error) {
            console.log(error);
            
            
        }

        const {name,email,password,} = data;

        if(name === ''){
          alert("Please enter your Name");
        }else if(email === ''){
          alert("Please enter your email");
    
        }else if(!email.includes('@')){
          alert("Please enter your valid email");
        }else if(password === ''){
          alert("Please enter your password");
        }else if(password.length < 6){
          alert("password must be 6 characters");
        } else{
          console.log("user validation succefully completed !!!");
          navigate('/login')
          
        }

    }
  return (
    <>
    
            <section className='flex justify-center justify-items-center '>
                <div className='shadow-2xl my-6 w-[40%]  '>
                    <div className='mt-7'>
                        <h1 className='text-center font-semibold text-3xl'>Welcome, To The Registration </h1>
                        <p className='text-center mt-3'>Please Fill Your Details..!!!</p>

                    </div>

                    <form  method="POST" >
                        <div className='flex flex-col ml-28 gap-2 mt-9 '>
                            <label className='text-lg font-semibold flex text-center gap-1'>Choose Your Role:<IoPersonCircleOutline size={25}/></label>

                            <select name="role" id="person" onChange={handlechanges}  className='w-[40%] border border-black p-1'>
                                <option  value="Teacher" className='font-medium text-base' >teacher</option>
                                <option value="Student" className='font-medium text-base' >student</option>
                                <option value="Admin" className='font-medium text-base' >admin</option>

                            </select>
                        </div>



                        <div className='flex flex-col ml-28 gap-2 mt-9 '>
                            <label className='flex text-center gap-1' htmlFor="">Email <HiOutlineMailOpen/></label>
                            <input   name="email" type="email" placeholder="Type here" className="input input-bordered w-[80%] " onChange={handlechanges} />
                        </div>
                        <div className='flex flex-col ml-28 gap-2 mt-9 '>
                            <label className='flex text-center gap-1' htmlFor="">Name <IoPersonSharp/></label>
                            <input onChange={handlechanges} name='name' type="name" placeholder="Type here" className="input input-bordered w-[80%] " />
                        </div>
                        <div className='flex flex-col ml-28 gap-2 mt-9 '>
                            <label className='flex text-center gap-1' htmlFor="">STD <FaKey/></label>
                            <input onChange={handlechanges}  name='std' type="std" placeholder="Type here" className="input input-bordered w-[80%] " />
                        </div>
                        <div className='flex flex-col ml-28 gap-2 mt-9 '>
                            <label className='flex text-center gap-1' htmlFor="">Password <FaKey/></label>
                            <input onChange={handlechanges}  name='password' type="password" placeholder="Type here" className="input input-bordered w-[80%] " />
                        </div>
                        <div className='flex flex-col ml-40 gap-2 mt-9 text-center my-8 '>
                            <button className='bg-blue-500 w-[60%] py-2 rounded-xl font-semibold text-lg hover:text-white' onClick={handlesubmit}><NavLink to='/register/otp'>Sign Up</NavLink></button>
                        </div>
                        <div className='flex flex-col ml-22 gap-2 mt-7 text-center my-8 '>
                            <p className='text-base'>You have Already Account Please  <NavLink to='/login' className='text-blue-500 underline cursor-pointer'>Login</NavLink></p>
                        </div>
                    </form>
                </div>
            </section>

        

    </>
  )
}

export default Registration



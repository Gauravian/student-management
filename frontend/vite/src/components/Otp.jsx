import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Otp() {
  const [data, setData] = useState({
    otp: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Handle input changes
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Handle form submission
  const submitButton = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4005/api/verify', data);
      console.log(res);
      
      if (res.status === 201) {
        alert("OTP verification successful. Redirecting to login.");
        navigate('/login'); // Redirect to the login page after OTP verification
      } else {
        setError("OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setError("An error occurred while verifying the OTP. Please try again.");
    }
  };

  return (
    <>
      <section className='flex justify-center justify-items-center'>
        <div className='shadow-2xl my-6 w-[40%]'>
          <div className='mt-7'>
            <h1 className='text-center font-semibold text-3xl'>Welcome, To The Registration</h1>
            <p className='text-center mt-3'>Please Fill Your Details..!!!</p>
          </div>

          <form method="POST" onSubmit={submitButton}> 
            <div className='flex flex-col ml-28 gap-2 mt-9'>
              <label className='flex text-center gap-1' htmlFor="otp">OTP Verification</label>
              <input
                onChange={handleChanges}
                name="otp"
                type="text"
                placeholder="Enter OTP"
                className="input input-bordered w-[80%]"
                required
              />
            </div>

            <div className='flex flex-col ml-40 gap-2 mt-9 text-center my-8'>
              <button
                type="submit"
                className='bg-blue-500 w-[60%] py-2 rounded-xl font-semibold text-lg hover:text-white'>
                Submit
              </button>
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>}

            <div className='flex flex-col ml-22 gap-2 mt-7 text-center my-8'>
              <p className='text-base'>
                Try once again  
                <NavLink to='/register' className='text-blue-500 underline cursor-pointer'>Register</NavLink>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Otp;

import React from 'react'
import { Link } from 'react-router-dom'

const Usercancel = () => {
  return (
    <div>
      <div className='becompanion-box'>
    <div className='flex gap-6'>
     <Link to={'/companioncancel'}>   <div className='font-bold '>
            Companion cancelation
        </div>
        </Link>
        <div className='font-bold bottom-border'>
            user cancelation
        </div>
    </div>
    <div className='flex justify-between font-bold my-3 text-sm text-slate-500 p-3'>
        
        <h1>User detail</h1>
        <h1>Companion detail</h1>
        <h1>booking date</h1>
        <h1>Booking time</h1>
        <h1>Cancellation  time</h1>
    </div>
    <hr />
    
    <div className='flex justify-between items-center hover:bg-slate-200 p-3'>
    <div className='rate-profile flex items-center'>
    <img src="https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg" alt="profile"  />

        <h1>Arpit yadav</h1>
    </div>
    <div>
        Oreo
    </div>
    <div>
        12 May 2025
    </div>
    <div>
        11.00AM-2.00PM
    </div>
    <div>
        14 may 2.00PM
    </div>
    </div>

   </div>
    </div>
  )
}

export default Usercancel

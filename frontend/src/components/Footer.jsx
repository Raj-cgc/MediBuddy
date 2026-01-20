import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    {/* Left section */}
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui dicta nisi aliquid accusantium omnis sed laborum, soluta eaque commodi velit eius nostrum consequuntur nemo at veniam illum voluptatibus odio?</p>
                </div>

                <div>
                    {/* Center section */}
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    {/* Right section */}
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91-7004155718</li>
                        <li>rajkumarbxr78@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div>
                {/* Copyright text */}
                <div>
                    <hr />
                    <p className='py-5 text-sm text-center'>Copyright 2025@ MediBuddy - All Rights Reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
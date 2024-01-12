import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className="flex justify-center items-center border border-gray-200 shadow-md">
            <div className="flex p-4 justify-between items-center w-11/12">
                <div className="p-4 rounded-full border border-blue-500 overflow-hidden">
                    <span className='font-semibold'>ALLSHETR-JOB</span>
                </div>
                <div className="">
                    <ul className='flex justify-between items-center'>
                        <li className='p-4'><Link href={"#"}>Jobs</Link></li>
                        <li className='p-4'><Link href={"#"}>Companies</Link></li>
                        <li className='p-4'><Link href={"#"}>Services</Link></li>
                        <li className='p-4'><input type="text" name="search jobs here" id="search-job" /></li>
                    </ul>
                </div>
                <div>
                    <ul className="flex justify-between items-center">
                        <li className='p-4'><Link href={"#"}>Icon</Link></li>
                        <li className='p-4'><Link href={"#"}>Profile</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
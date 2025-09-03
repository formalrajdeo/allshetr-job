import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className="flex justify-center items-center border border-gray-200 shadow-md mt-4">
            <div className="flex p-4 justify-between items-center w-11/12">
                <div className="p-4 rounded-full border border-blue-500 overflow-hidden">
                    <span className='font-semibold'>ALLSHETR-JOB</span>
                </div>
                <div className="">
                    <ul className='flex justify-between items-center'>
                        <li className='p-4'><Link href={"#"}>About us</Link></li>
                        <li className='p-4'><Link href={"#"}>help center</Link></li>
                        <li className='p-4'><Link href={"#"}>Provacy policy</Link></li>
                    </ul>
                </div>
                <div>
                    <ul className="flex justify-between items-center">
                        <li className='p-4'><Link href={"#"}>Facebook</Link></li>
                        <li className='p-4'><Link href={"#"}>LinkedIn</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer
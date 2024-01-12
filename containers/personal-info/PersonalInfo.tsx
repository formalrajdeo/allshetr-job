'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { PROFILE_IMG } from '@/assets/images'
import Link from 'next/link'

const PersonalInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    return (
        <div className="flex justify-center items-center mt-8">
            <div className="flex p-4 justify-between items-center rounded-xl w-11/12 border border-gray-200 shadow-md">
                <div className="p-4 rounded-full border-4 border-green-500 overflow-hidden">
                    <Image
                        src={PROFILE_IMG}
                        width={100}
                        height={100}
                        alt="Picture of the author"
                        className="rounded-full"
                    />
                </div>
                <div className='flex flex-col justify-between items-center w-full p-4'>
                    <div className="w-full border-b-2 border-gray-200 pb-8 mb-8">
                        <div className="">
                            <span className='font-semibold pr-4'>Rajdeo Prasad</span>
                            <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="" type="button" onClick={toggleModal}>
                                E
                            </button>
                        </div>
                        <div className="">
                            <span className='text-sm text-gray-400'>Profile last updated - <span className='text-black'>Today</span></span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full text-sm">
                        <div className="">
                            <ul className='flex flex-col justify-between items-center'>
                                <li className='p-2 w-full'><span>Thane, INDIA</span></li>
                                <li className='p-2 w-full'><span>2 Years 3 Months</span></li>
                                <li className='p-2 w-full'><span>6,00,000</span></li>
                            </ul>
                        </div>
                        <div className="flex justify-start pl-8 pr-12 border-l-2 border-gray-200">
                            <ul className='flex flex-col justify-start items-center'>
                                <li className='p-2 w-full'><span>9987847479</span></li>
                                <li className='p-2 w-full'><span>formal.rajdeo@gmail.com</span></li>
                                <li className='p-2 w-full'><span>Available to join in 15 Days or less</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Main modal --> */}
            <div
                id="crud-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`${isModalOpen ? 'fixed' : 'hidden'
                    } overflow-y-auto overflow-x-hidden inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50`}
            >
                <div className="absolute w-full max-w-md p-4 md:p-5 rounded-lg shadow bg-white">
                    {/* Modal content */}
                    <div className="relative rounded-lg">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
                            <h3 className="text-lg font-semibold">
                                Basic details
                            </h3>
                            <button type="button" className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal"
                                onClick={() => toggleModal()}>
                                <span className=''>X</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form className="p-4">
                            <div className="flex flex-col justify-center items-start">
                                <div className="mb-4 w-full">
                                    <span className="text-sm font-semibold">Name</span>
                                    <div className="mt-2">
                                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 w-full" placeholder="Enter your name" required />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-8">
                                    <span className="text-sm font-medium">MCA at ASM Institute Mumbai</span>
                                    <span className="text-sm text-gray-400">To edit go to education section.</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center me-4">
                                        <input id="red-radio" type="radio" value="" name="colored-radio" className="w-4 h-4 bg-gray-300 border-gray-300" />
                                        <label htmlFor="red-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fresher</label>
                                    </div>
                                    <div className="flex items-center me-4">
                                        <input id="green-radio" type="radio" value="" name="colored-radio" className="w-4 h-4 bg-gray-300 border-gray-300" />
                                        <label htmlFor="green-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Experinced</label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <span className='text-sm font-medium'>Total experience</span>
                                    <div className="flex justify-between items-center">
                                        <div className="">
                                            <select id="category" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 py-2.5 px-12">
                                                <option value="0">0 Year</option>
                                                <option value="1">1 Year</option>
                                                <option value="2">2 Years</option>
                                                <option value="3">3 Years</option>
                                            </select>
                                        </div>
                                        <div className="pl-2">
                                            <select id="category" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 py-2.5 px-12">
                                                <option value="0">0 Year</option>
                                                <option value="1">1 Year</option>
                                                <option value="2">2 Years</option>
                                                <option value="3">3 Years</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <span className='mb-2 text-sm font-medium'>Total annual salary</span>
                                    <div className="flex justify-between items-center">
                                        <div className="">
                                            <select id="category" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 w-16">
                                                <option value="rs">Rs</option>
                                                <option value="do">Do</option>
                                            </select>
                                        </div>
                                        <div className="pl-2">
                                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5" placeholder="Type product name" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <span className='mb-2 text-sm font-medium'>Salary breakdown</span>
                                    <div className="flex justify-between items-center">
                                        <select id="category" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 w-full">
                                            <option value="rs">Fixed</option>
                                            <option value="do">Fixed + Variable</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end items-center text-sm font-semibold">
                                <div className="pr-4 text-blue-500">
                                    <Link href="#">Cancel</Link>
                                </div>
                                <div className="">
                                    <button type="submit"
                                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo
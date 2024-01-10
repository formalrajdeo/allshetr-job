import React from 'react'

const Education = () => {
    return (
        <div className="">
            <div className="flex justify-between items-center">
                <div className="">
                    <span className='font-semibold'>Education</span>
                </div>
                <div className="">
                    <span className='font-semibold text-blue-500'>Add education</span>
                </div>
            </div>
            <div className="pt-4 text-sm">
                <div className="flex flex-col justify-start items-start pb-4">
                    <div><span className='font-semibold'>MCA Computers</span></div>
                    <div><span className=''>ASM Institute Mumbai</span></div>
                    <div><span className='text-gray-400'>2018-2021 | Full-time</span></div>
                </div>
                <div className="flex flex-col justify-start items-start pb-4">
                    <div><span className='font-semibold'>B.Sc Computers</span></div>
                    <div><span className=''>GVM COLLEGE, THANE</span></div>
                    <div><span className='text-gray-400'>2015-2018 | Full-time</span></div>
                </div>
                <div className="flex flex-col justify-start items-start pb-4">
                    <div><span className='font-semibold'>Class XII</span></div>
                    <div><span className=''>Maharashtra</span></div>
                    <div><span className='text-gray-400'>2015</span></div>
                </div>
                <div className="flex flex-col justify-start items-start pb-4">
                    <div><span className='font-semibold'>Class X</span></div>
                    <div><span className=''>Maharashtra</span></div>
                    <div><span className='text-gray-400'>2013</span></div>
                </div>
            </div>
        </div>
    )
}

export default Education
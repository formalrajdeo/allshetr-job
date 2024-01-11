import React from 'react'

const Projects = () => {
    return (
        <div className="">
            <div className="flex justify-between items-center">
                <div className="">
                    <span className='font-semibold'>Projects</span>
                </div>
                <div className="">
                    <span className='font-semibold text-blue-500'>Add project</span>
                </div>
            </div>
            <div className="pt-4 text-sm">
                <div className="flex flex-col justify-start items-start pb-4">
                    <div><span className='font-semibold'>portfolio</span></div>
                    <div><span className=''>Self Work (Thane: Offsite)</span></div>
                    <div><span className='text-gray-400'>Jan 2024 to Present (Part Time)</span></div>
                    <div><span className='text-gray-500'>Editable resume</span></div>
                </div>
            </div>
        </div>
    )
}

export default Projects
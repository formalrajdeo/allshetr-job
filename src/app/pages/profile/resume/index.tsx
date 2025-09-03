import React from 'react'

const Resume = () => {
    return (
        <div className=''>
            <div className="">
                <span className='font-semibold'>Resume</span>
                <p className='text-sm text-gray-350 py-4'>Resume is the most important document recruiters look for. Recruiters generally do not look at profiles without resumes.</p>
            </div>
            <div className="flex justify-between items-center pb-2">
                <div className="w-full">
                    <span className='font-semibold'>rajdeo_oct_2023_resume.pdf</span>
                    <p className='text-sm text-gray-500'>Uploaded on Sep 27, 2023</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="p-4">U</div>
                    <div className="p-4">D</div>
                </div>
            </div>
            <div
                className="bg-gray-50 text-center px-4 rounded flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed mx-auto font-[sans-serif]">
                <div className="py-6">
                </div>
                <div className="py-6">
                    <input type="file" id='uploadFile1' className="hidden" />
                    <label htmlFor="uploadFile1"
                        className="block px-6 py-2.5 rounded text-gray-600 text-sm tracking-wider font-semibold border-none outline-none bg-gray-200 hover:bg-gray-100">Update resume</label>
                    <p className="text-xs text-gray-400 mt-4">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                </div>
            </div>
        </div>
    )
}

export default Resume
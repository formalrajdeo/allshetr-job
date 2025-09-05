import Link from 'next/link'
import React from 'react'

const Accomplishments = () => {
    return (
        <div className="">
            <span className='font-semibold'>Accomplishments</span>
            <div className="pt-4 py-4 border-b-2 border-gray-200">
                <div className="flex justify-between items-center">
                    <div className="">
                        <span className='font-semibold'>Online profile</span> <br />
                        <span className='text-sm text-gray-400'>Add link to online profiles (e.g. Linkedin, Facebook etc.).</span>
                    </div>
                    <div className="">
                        <span className='font-semibold text-blue-500'>Add</span>
                    </div>
                </div>
                <div className="pt-4 text-sm">
                    <div className="flex flex-col justify-start items-start pb-4">
                        <div><span className='font-semibold'>GITHUB</span></div>
                        <div><span className='text-blue-500'><Link href="https://github.com/formalrajdeo">https://github.com/formalrajdeo</Link></span></div>
                        <div><span className='text-gray-400'>All my repos</span></div>
                    </div>
                    <div className="flex flex-col justify-start items-start pb-4">
                        <div><span className='font-semibold'>LinkedIn</span></div>
                        <div><span className='text-blue-500'><Link href="https://www.linkedin.com/in/rajdeo-prasad-a27b49203">https://www.linkedin.com/in/rajdeo-prasad-a27b49203</Link></span></div>
                        <div><span className='text-gray-400'>LinkedIn desc</span></div>
                    </div>
                </div>
            </div>
            <div className="pt-4 py-4 border-b-2 border-gray-200">
                <div className="flex justify-between items-center">
                    <div className="">
                        <span className='font-semibold'>Work sample</span> <br />
                        <span className='text-sm text-gray-400'>Add link to your projects (e.g. Github links etc.).</span>
                    </div>
                    <div className="">
                        <span className='font-semibold text-blue-500'>Add</span>
                    </div>
                </div>
                <div className="pt-4 text-sm">
                    <div className="flex flex-col justify-start items-start pb-4">
                        <div><span className=''>Profile</span></div>
                        <div><span className='text-blue-500'><Link href="https://formalrajdeo.github.io/rajdeoprasad/">https://formalrajdeo.github.io/rajdeoprasad/</Link></span></div>
                        <div><span className='text-gray-400'>Duration: Jan 2023 - Jan 2023</span></div>
                        <div><span className='text-gray-400'>Portfolio desc</span></div>
                    </div>
                </div>
            </div>
            <div className="pt-4 py-4 border-b-2 border-gray-200">
                <div className="flex justify-between items-center">
                    <div className="">
                        <span className='font-semibold'>White paper / Research publication / Journal entry</span> <br />
                        <span className='text-sm text-gray-400'>Add links to your online publications.</span>
                    </div>
                    <div className="">
                        <span className='font-semibold text-blue-500'>Add</span>
                    </div>
                </div>
                {/* <div className="pt-4 text-sm">
                    <div className="flex flex-col justify-start items-start pb-4">
                        <div><span className=''>Profile</span></div>
                        <div><span className='text-blue-500'><Link href="https://formalrajdeo.github.io/rajdeoprasad/">https://formalrajdeo.github.io/rajdeoprasad/</Link></span></div>
                        <div><span className='text-gray-400'>Duration: Jan 2023 - Jan 2023</span></div>
                        <div><span className='text-gray-400'>Portfolio desc</span></div>
                    </div>
                </div> */}
            </div>
            <div className="pt-4 py-4 border-b-2 border-gray-200">
                <div className="flex justify-between items-center">
                    <div className="">
                        <span className='font-semibold'>Presentation</span> <br />
                        <span className='text-sm text-gray-400'>Add links to your online presentations (e.g. Slideshare presentation links etc.).</span>
                    </div>
                    <div className="">
                        <span className='font-semibold text-blue-500'>Add</span>
                    </div>
                </div>
                {/* <div className="pt-4 text-sm">
                    <div className="flex flex-col justify-start items-start pb-4">
                        <div><span className=''>Profile</span></div>
                        <div><span className='text-blue-500'><Link href="https://formalrajdeo.github.io/rajdeoprasad/">https://formalrajdeo.github.io/rajdeoprasad/</Link></span></div>
                        <div><span className='text-gray-400'>Duration: Jan 2023 - Jan 2023</span></div>
                        <div><span className='text-gray-400'>Portfolio desc</span></div>
                    </div>
                </div> */}
            </div>
            <div className="pt-4 py-4 border-b-2 border-gray-200">
                <div className="flex justify-between items-center">
                    <div className="">
                        <span className='font-semibold'>Patent</span> <br />
                        <span className='text-sm text-gray-400'>Add details of patents you have filed.</span>
                    </div>
                    <div className="">
                        <span className='font-semibold text-blue-500'>Add</span>
                    </div>
                </div>
                {/* <div className="pt-4 text-sm">
                    <div className="flex flex-col justify-start items-start pb-4">
                        <div><span className=''>Profile</span></div>
                        <div><span className='text-blue-500'><Link href="https://formalrajdeo.github.io/rajdeoprasad/">https://formalrajdeo.github.io/rajdeoprasad/</Link></span></div>
                        <div><span className='text-gray-400'>Duration: Jan 2023 - Jan 2023</span></div>
                        <div><span className='text-gray-400'>Portfolio desc</span></div>
                    </div>
                </div> */}
            </div>
            <div className="pt-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="">
                        <span className='font-semibold'>Certification</span> <br />
                        <span className='text-sm text-gray-400'>Add details of certifications you have achieved/completed</span>
                    </div>
                    <div className="">
                        <span className='font-semibold text-blue-500'>Add</span>
                    </div>
                </div>
                {/* <div className="pt-4 text-sm">
                    <div className="flex flex-col justify-start items-start pb-4">
                        <div><span className=''>Profile</span></div>
                        <div><span className='text-blue-500'><Link href="https://formalrajdeo.github.io/rajdeoprasad/">https://formalrajdeo.github.io/rajdeoprasad/</Link></span></div>
                        <div><span className='text-gray-400'>Duration: Jan 2023 - Jan 2023</span></div>
                        <div><span className='text-gray-400'>Portfolio desc</span></div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Accomplishments
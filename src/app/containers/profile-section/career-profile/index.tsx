import React from 'react'
const CAREER_PROFILE = [
    { field: "Current industry", value: "Insurance" },
    { field: "Department", value: "Engineering - Software & QA" },
    { field: "Role category", value: "Software Development" },
    { field: "Job role", value: "Full Stack Developer" },
    { field: "Desired job type", value: "permanent" },
    { field: "Desired employment type", value: "Full Time" },
    { field: "Preferred shift", value: "Day" },
    { field: "Preferred work location", value: "Mumbai (All Areas), Mumbai, Thane" },
    { field: "Expected salary", value: "₹8,00,000" },
]
const CareerProfile = () => {
    return (
        <div className="">
            <div className="">
                <span className='font-semibold'>Career profile</span>
            </div>
            <div className="pt-4 text-sm grid grid-cols-2 gap-3">
                {CAREER_PROFILE && CAREER_PROFILE.map((career, career_idx) => {
                    return (
                        <div key={career_idx} className="flex flex-col justify-start items-start pb-4">
                            <div><span className='text-gray-400'>{career.field}</span></div>
                            <div><span className=''>{career.value}</span></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CareerProfile
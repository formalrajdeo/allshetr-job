import React from 'react'
const SKILL_DATA = [
    { skill: "Node.js", version: "-", last_used: "-", experience: "2 Years 3 Months" },
    { skill: "React.js", version: "-", last_used: "-", experience: "2 Years 3 Months" },
    { skill: "Javascript", version: "-", last_used: "-", experience: "2 Years 3 Months" },
    { skill: "MongoDB", version: "-", last_used: "-", experience: "2 Years 3 Months" },
]
const ItSkills = () => {
    return (
        <div className="">
            <div className="flex justify-between items-center">
                <div className="">
                    <span className='font-semibold'>IT skills</span>
                </div>
                <div className="">
                    <span className='font-semibold text-blue-500'>Add details</span>
                </div>
            </div>
            <div className="flex flex-col pt-4 text-sm">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Skills</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Version</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Last used</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Experience</th>
                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500"></th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {SKILL_DATA && SKILL_DATA.map((skill, skill_idx) => {
                                        return (
                                            <tr key={skill_idx}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm ">{skill.skill}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{skill.version}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{skill.last_used}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{skill.experience}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">P</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItSkills
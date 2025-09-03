import React from 'react'
const PERSONAL_DETAILS = [
    { field: "Personal", value: "male, Single / unmarried, Single parent" },
    { field: "Career break", value: "No" },
    { field: "Date of birth", value: "13 May 1998" },
    { field: "Work permit", value: "Add Work permit" },
    { field: "Category", value: "General" },
    { field: "Address", value: "Indira nagar tekdi, rupa devi, pada no 2, wagle estate, Thane(W), Thane, 400604" },
    { field: "Differently abled", value: "No" },
]
const SKILL_DATA = [
    { language: "English", proficiency: "Proficient", read: "Y", write: "Y", speak: "Y" },
    { language: "Hindi", proficiency: "Proficient", read: "Y", write: "Y", speak: "Y" },
]
const PersonalDetails = () => {
    return (
        <div className="">
            <div className="">
                <span className='font-semibold'>Personal details</span>
            </div>
            <div className="">
                <div className="pt-4 text-sm grid grid-cols-2 gap-3 border-b-2 border-gray-200">
                    {PERSONAL_DETAILS && PERSONAL_DETAILS.map((personal, personal_idx) => {
                        return (
                            <div key={personal_idx} className="flex flex-col justify-start items-start pb-4">
                                <div><span className='text-gray-400'>{personal.field}</span></div>
                                <div><span className=''>{personal.value}</span></div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-col pt-4 text-sm">
                    <div className="flex justify-between items-center py-4">
                        <div className="">
                            <span className='font-semibold'>Languages</span>
                        </div>
                        <div className="">
                            <span className='font-semibold text-blue-500'>Add languages</span>
                        </div>
                    </div>
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Languages</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Proficiency</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Read</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Write</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Speak</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {SKILL_DATA && SKILL_DATA.map((lang, lang_idx) => {
                                            return (
                                                <tr key={lang_idx}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{lang.language}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{lang.proficiency}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{lang.read}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{lang.write}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{lang.speak}</td>
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
        </div>
    )
}

export default PersonalDetails
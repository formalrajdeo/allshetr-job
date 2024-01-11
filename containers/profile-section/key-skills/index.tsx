import React from 'react'

const SKILLS_SET = [
    'Mern Stack',
    'Javascript',
    'JSON',
    'Node.Js',
    'MongoDB',
    'Express',
    'Backend Development',
    'Rest API Development',
    'Postgresql',
    'API',
    'Node Express',
    'MySQL Database',
    'MySQL',
    'Sequelize',
    'Nosql Databases',
    'Redis',
    'Nestjs',
    'Backend',
    'Socket.Io',
]
const KeySkills = () => {
    return (
        <div className="">
            <span className='font-semibold'>Key skills</span>
            <div className="flex flex-wrap pt-4 text-sm">
                {SKILLS_SET && SKILLS_SET.map((d, i) => {
                    return (
                        <span key={i} className='p-2 m-1 rounded-2xl border border-gray-400'>{d}</span>
                    )
                })}
            </div>
        </div>
    )
}

export default KeySkills
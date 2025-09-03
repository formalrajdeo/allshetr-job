import React from 'react'

const Employment = () => {
    return (
        <div className="">
            <div className="flex justify-between items-center">
                <div className="">
                    <span className='font-semibold'>Employment</span>
                </div>
                <div className="">
                    <span className='font-semibold text-blue-500'>Add employment</span>
                </div>
            </div>
            <div className="pt-4 text-sm">
                <div className="flex flex-col justify-start items-start pb-4">
                    <div><span className='font-semibold'>Software Developer</span></div>
                    <div><span className=''>Bigiota</span></div>
                    <div><span className='text-gray-400'>Full-time | Jul 2023 to Oct 2023 (4 months)</span></div>
                    <div><span>Client : HDFC ERGO Description : Worked on projects related to insurance.</span></div>
                </div>
                <div className="flex flex-col justify-start items-start pb-4">
                    <div><span className='font-semibold'>Cloud Associate</span></div>
                    <div><span className=''>Niveus Solution</span></div>
                    <div><span className='text-gray-400'>Full-time | Jan 2022 to Feb 2023 (1 year 2 months)</span></div>
                    <div>
                        <span>Client : ICICI BANK Description : I worked as a key member of the team responsible for developing and maintaining the online account creation system. My primary focus was on enabling customers to create saving accounts, apply for credit cards, and avail two-wheeler loans through the b...
                        </span>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start pb-4">
                    <div><span className='font-semibold'>Software Developer</span></div>
                    <div><span className=''>Exits Consultancy Services (ECS)</span></div>
                    <div><span className='text-gray-400'>Full-time | Apr 2021 to Jan 2022 (10 months)</span></div>
                    <div><span>Working in a team of 6 on developing software for managing cases, legal matter, client relationships. My job is to create api for different modules using NodeJS, ExpressJS and MongoDB. Also having working knowledge of scraping using nodejs library like puppeteer, cheerio and worked...</span></div>
                </div>
            </div>
        </div>
    )
}

export default Employment
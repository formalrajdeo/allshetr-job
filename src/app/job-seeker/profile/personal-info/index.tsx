import Image from 'next/image'
import { PROFILE_IMG } from '@/app/assets/images'

const PersonalInfo = () => {
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
                            <button>E</button>
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
        </div>
    )
}

export default PersonalInfo
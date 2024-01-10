import React from 'react'
import Link from 'next/link'
import Resume from './resume'
import ResumeHeadline from './resume-headline'
import KeySkills from './key-skills'
import Employment from './employment'
import Education from './education'
import ItSkills from './it-skills'
import Projects from './projects'
import ProfileSummary from './profile-summary'
import Accomplishments from './accomplishments'
import CareerProfile from './career-profile'
import PersonalDetails from './personal-details'

const Section = () => {
  return (
    <main className='flex justify-center items-center'>
      <div className="m-4 flex justify-between items-start w-11/12">
        <div className="flex flex-col p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mr-8 rounded-xl">
          <div className="pb-4">
            <span className='font-bold'>Quicks links</span>
          </div>
          <ul className='text-sm px-4'>
            <li className='p-3 text-start'><Link href={"#resume"}>Resume</Link></li>
            <li className='p-3 text-start'><Link href={"#resume-headline"}>Resume headline</Link></li>
            <li className='p-3 text-start'><Link href={"#key-skills"}>Key skills</Link></li>
            <li className='p-3 text-start'><Link href={"#jobs"}>Jobs</Link></li>
            <li className='p-3 text-start'><Link href={"#employment"}>Employment</Link></li>
            <li className='p-3 text-start'><Link href={"#education"}>Education</Link></li>
            <li className='p-3 text-start'><Link href={"#it-skills"}>IT skills</Link></li>
            <li className='p-3 text-start'><Link href={"#projects"}>Projects</Link></li>
            <li className='p-3 text-start'><Link href={"#profile-summary"}>Profile summary</Link></li>
            <li className='p-3 text-start'><Link href={"#accomplishments"}>Accomplishments</Link></li>
            <li className='p-3 text-start'><Link href={"#career-profile"}>Career profile</Link></li>
            <li className='p-3 text-start'><Link href={"#personal-details"}>Personal details</Link></li>
          </ul>
        </div>
        <div className="w-full">
          <section id="resume" className='p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-xl'>
            <Resume />
          </section>
          <section id="resume-headline" className='my-4 p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-xl'>
            <ResumeHeadline />
          </section>
          <section id="key-skills" className='my-4 p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-xl'>
            <KeySkills />
          </section>
          <section id="employment" className='my-4 p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-xl'>
            <Employment />
          </section>
          <section id="education" className='my-4 p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-xl'>
            <Education />
          </section>
          <section id="it-skills" className='my-4 p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-xl'>
            <ItSkills />
          </section>
          <section id="projects" className='my-4 p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-xl'>
            <Projects />
          </section>
          <section id="profile-summary" className='my-4 p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-xl'>
            <ProfileSummary />
          </section>
          <section id="accomplishments" className='my-4 p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-xl'>
            <Accomplishments />
          </section>
          <section id="career-profile" className='my-4 p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-xl'>
            <CareerProfile />
          </section>
          <section id="personal-details" className='my-4 p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-xl'>
            <PersonalDetails />
          </section>
        </div>
      </div>
    </main>
  )
}

export default Section
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
import PersonalInfo from './personal-info/PersonalInfo'

const sections = [
  { id: 'resume', label: 'Resume', Component: Resume },
  { id: 'resume-headline', label: 'Resume headline', Component: ResumeHeadline },
  { id: 'key-skills', label: 'Key skills', Component: KeySkills },
  { id: 'employment', label: 'Employment', Component: Employment },
  { id: 'education', label: 'Education', Component: Education },
  { id: 'it-skills', label: 'IT skills', Component: ItSkills },
  { id: 'projects', label: 'Projects', Component: Projects },
  { id: 'profile-summary', label: 'Profile summary', Component: ProfileSummary },
  { id: 'accomplishments', label: 'Accomplishments', Component: Accomplishments },
  { id: 'career-profile', label: 'Career profile', Component: CareerProfile },
  { id: 'personal-details', label: 'Personal details', Component: PersonalDetails },
]

const SectionWrapper = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <section id={id} className='my-4 p-4 border border-gray-200 shadow-md rounded-xl'>
    {children}
  </section>
)

const QuickLinks = () => {
  return (
    <div className="flex flex-col p-4 border border-gray-200 shadow-md mr-8 rounded-xl">
      <div className="pb-4">
        <span className='font-bold'>Quick links</span>
      </div>
      <ul className='text-sm px-4'>
        {sections.map(({ id, label }) => (
          <li key={id} className='p-3 text-start'>
            <Link href={`#${id}`}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ProfilePage = () => {
  return (
    <>
      <PersonalInfo />
      <main className='flex justify-center items-center'>
        <div className="m-4 flex justify-between items-start w-11/12">
          <QuickLinks />
          <div className="w-full">
            {sections.map(({ id, Component }) => (
              <SectionWrapper key={id} id={id}>
                <Component />
              </SectionWrapper>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default ProfilePage;

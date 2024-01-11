import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import PersonalInfo from '@/containers/personal-info/PersonalInfo'
import ProfileSection from '@/containers/profile-section'
import React from 'react'

const page = () => {
  return (
    <>
      <Navbar />
      <PersonalInfo />
      <ProfileSection />
      <Footer />
    </>
  )
}

export default page

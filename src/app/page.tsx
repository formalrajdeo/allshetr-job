
import React from 'react'
import Navbar from './components/navbar'
import PersonalInfo from './containers/personal-info/PersonalInfo'
import ProfileSection from './containers/profile-section'
import Footer from './components/footer'

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

import Navbar from '@/components/navbar'
import Profile from '@/containers/profile/Profile'
import Section from '@/containers/section'
import React from 'react'

const page = () => {
  return (
    <>
      <Navbar />
      <Profile />
      <Section />
    </>
  )
}

export default page

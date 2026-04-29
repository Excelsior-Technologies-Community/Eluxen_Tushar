import React from 'react'
import Navbar from '../components/Navbar'
import PageHero from '../components/PageHero'
import PremiumCare from '../components/PremiumCare'
import Contact from '../components/Contact'
import Footer from '../components/Footer_1'
import OurTeam from '../components/OurTeam'

const TeamPage = () => {
  return (
    <>
     <div style={{ position: "relative" }}>
        <Navbar />
        <PageHero pageName="team" />
      </div>
      <OurTeam />
      <PremiumCare />
      <Contact />
      <Footer />
    
    
    </>
  )
}

export default TeamPage

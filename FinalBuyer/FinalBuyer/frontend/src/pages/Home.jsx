import React from 'react'
import Hero from '../components/Hero'
import LastestCollection from '../components/LastestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Beginner from './Beginner'
import KidClo from '../components/KidClo'
const Home = () => {
  return (
    <div>
      <Beginner/>
      <Hero/>
      <KidClo/>
      <OurPolicy/>
      <LastestCollection/>
      <BestSeller/>    
      <NewsletterBox/>
    </div>
  )
}

export default Home

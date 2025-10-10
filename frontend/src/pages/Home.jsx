import React from 'react'
import Header from '../components/header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Baner from '../components/Baner'
import FeaturesCards from '../components/FeaturesCards'

const Home = () => {
  return (
    <div>
      <Header />
      <FeaturesCards />
      <SpecialityMenu />
      <TopDoctors />
      <Baner />
    </div>
  )
}

export default Home
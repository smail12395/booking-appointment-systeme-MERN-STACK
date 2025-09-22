import React from 'react'
import Header from '../components/header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Baner from '../components/Baner'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Baner />
    </div>
  )
}

export default Home
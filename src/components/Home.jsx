import React from 'react'
import banner from '../assets/banner_img.avif'

const Home = () => {
  return (
    <div className='home-page'>
      <img className='banner' src={banner} alt="" />
    </div>
  )
}

export default Home
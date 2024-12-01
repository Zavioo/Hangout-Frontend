import React, { useEffect } from 'react'
import moon from '../assets/moon.png'
import stars from '../assets/stars.png'
import boy from '../assets/boy.png'
import { Link } from 'react-router-dom'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Home = () => {

  useEffect(() => {
    Aos.init({
      duration: 1500, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (



    <div style={{ height: "115vh" }} className='tw-bg-main '>

      <img data-aos="fade-right" className=' tw-w-screen tw-absolute' src={moon} alt="" />
      <img data-aos="fade-left" className=' tw-w-screen tw-absolute' src={stars} alt="" />
      <img data-aos="zoom-in-up" className=' tw-w-screen tw-absolute' src={boy} alt="" />

      <div data-aos="fade-up-right" className='   tw-w-2/5 tw-absolute' style={{ top: '40%', left: '8%' }} >
        <h3 className='tw-text-2xl tw-text-white ' > Welcome to Hangout</h3>
        <p className='tw-text-white'> <span className=' tw-text-base '>Unite Your Story with the World.</span> <br />
          Share your life’s moments and be inspired by others journeys. </p>
        <p className='tw-text-white'> Click to <Link to='/register'> <button data-aos="zoom-in" className=" tw-w-15 tw-text-xl tw-m-1 " >  Get Started </button></Link> </p>
      </div>

    </div>
  )
}

export default Home
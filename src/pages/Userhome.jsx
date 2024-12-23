import React, { useContext } from 'react'
import Header from '../components/Header'
import Profile from '../components/Profile'
import { ActiveTabContext, StateContext } from '../ContextApi/StateContext'
import Feeds from '../components/Feeds'


const Userhome = () => {

  const { sharedState } = useContext(StateContext);
  
  

  return (

    <>
      {sharedState === 'Initial State' ?
        <div className=' tw-h-auto ' style={{ backgroundColor: "rgb(243, 243, 243)" }}>
          <Header />
          <Feeds /> 
        </div>
        : sharedState === 'Updated State' && <div className=' grid-container ' >
          <div className='grid-item1 '>
            <Profile />
          </div>
          <Header />
          < div className='grid-item3 tw-overflow-y-auto '>
            <Feeds />
          </div>
        </div>
         }
      

    </>
  )
}

export default Userhome
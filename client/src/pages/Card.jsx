import React, { useState } from 'react'
import CardLandingPage from '../components/CardLandingPage';

const Card = () => {

  const [isLandingVisible, setIsLandingVisible] = useState(true)

  return (

    <div className='w-full h-full'>

      { isLandingVisible ? (
        <CardLandingPage/>
      ) 

      : null

      }
      </div>
      
  )
}

export default Card
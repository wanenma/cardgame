import React from 'react'
import './card.css'

const Card = ({image,type}) => {
  return (
    <div className='cardContainer'>
        <img src={image}/>

      
    </div>
  )
}

export default Card

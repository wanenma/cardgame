import React from 'react'
import './card.css'

const Card = ({image,onClick}) => {
  return (
    <div className='cardContainer' onClick={onClick}>
        <img src={image} alt="pokemon"/>

      
    </div>
  )
}

export default Card

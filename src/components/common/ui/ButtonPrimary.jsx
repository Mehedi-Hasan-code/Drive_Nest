import React from 'react'

const ButtonPrimary = ({label, onClick}) => {
  return (
    <button onClick={onClick} className='btn'>{label}</button>
  )
}

export default ButtonPrimary
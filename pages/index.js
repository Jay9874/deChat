import { useState, useEffect, useContext } from 'react'
import { Filter, Friend } from '../Components'
const chatApp = () => {
  return (
    <div>
      <Filter />
      <Friend />
    </div>
  )
}

export default chatApp

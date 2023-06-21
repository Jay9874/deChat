import React from 'react'
import Style from './Loader.module.css'
import Image from 'next/image'
import images from '../../assets'


export default function Loader() {
  return (
    <div className={Style.loader}>
      <div className={Style.loader_box}>
      <Image src={images.loader} alt='loader' height={100} width={100} />
      </div>
    </div>
    
  )
}

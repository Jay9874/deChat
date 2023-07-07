import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Style from './Card.module.css'
import images from '../../../assets'
import Link from 'next/link'

const Card = ({ friend }) => {
  return (
    <Link
      href={{
        pathname: '/',
        query: { name: `${friend.name}`, pubkey: `${friend.pubkey}` }
      }}
      className={Style.chat_card_link}
    >
      <div className={Style.card}>
        <div className={Style.card_box}>
          <div className={Style.card_box_left}>
            <Image
              src={images.accountName}
              alt='user'
              height={50}
              width={50}
              className={Style.card_box_left_img}
            />
          </div>
          <div className={Style.card_box_right}>
            <h3>{friend.name}</h3>
            <p>{friend.pubkey.slice(0, 25)}...</p>
            <div className={Style.card_box_right_end}></div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card

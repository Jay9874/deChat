import React from 'react'
import Style from './UserCard.module.css'
import Image from 'next/image'
import images from '../../assets'

export default function UserCard ({ user, i, address, addFriend }) {
  return (
    <div className={Style.userCard}>
      <div className={Style.userCard_box}>
        <Image
          className={Style.userCard_box_img}
          src={images[`image${i + 1}`]}
          alt='user'
          height={100}
          width={100}
        />
        <div className={Style.userCard_box_info}>
          <h1>{user.name}</h1>
          <p>{user.accountAddress.slice(0, 25)}...</p>
          <button onClick={() => addFriend(user.name, user.accountAddress)}>Add Friend</button>
        </div>
      </div>
      <small className={Style.number}>{i + 1}</small>
    </div>
  )
}

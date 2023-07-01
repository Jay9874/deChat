import { useEffect, useState } from 'react'
import Style from './UserCard.module.css'
import Image from 'next/image'
import images from '../../assets'

export default function UserCard ({
  user,
  i,
  address,
  addFriend,
  alreadyFriend
}) {
  const [isFriend, setIsFriend] = useState(false )
  useEffect(() => {
    const checkFriend = async () => {
      const res = await alreadyFriend(address, user.address)
      setIsFriend(res)
    }
    checkFriend()
  }, [address, user.address, alreadyFriend])
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
          <p>{user.address.slice(0, 25)}...</p>
          <div className={Style.userCard_box_info_status}>
            {isFriend ? (
              <button
                className={Style.userCard_box_info_status_btn}
                disabled={true}
              >
                <ion-icon
                  size='large'
                  name='checkmark-circle-outline'
                ></ion-icon>
                Friend
              </button>
            ) : (
              <button onClick={() => addFriend(user.name, user.address)}>
                <ion-icon
                  className={Style.icon_add_friend}
                  size='large'
                  name='person-add-outline'
                ></ion-icon>
                Add Friend
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

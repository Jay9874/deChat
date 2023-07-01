import { useEffect, useState, useContext } from 'react'

// Internal imports
import Style from '../styles/alluser.module.css'
import { ChatAppContext } from '../Context/ChatAppContext'
import { UserCard } from '../Components'

const alluser = () => {
  const { userList, addFriend, account, alreadyFriend } = useContext(ChatAppContext)
  return (
    <div>
      <div className={Style.alluser_info}>
        <h1>Registered Users</h1>
        <p>Make them your friends.</p>
      </div>
      <div className={Style.alluser}>
        {userList.map((user, index) => {
          return (
            user.address != account && (
              <UserCard
                key={index}
                user={user}
                i={index}
                address={account}
                addFriend={addFriend}
                alreadyFriend={alreadyFriend}
              />
            )
          )
        })}
      </div>
    </div>
  )
}

export default alluser

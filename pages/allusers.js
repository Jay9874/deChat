import { useEffect, useState, useContext } from 'react'

// Internal imports
import Style from '../styles/alluser.module.css'
import { ChatAppContext } from '../Context/ChatAppContext'
import { UserCard } from '../Components'

const alluser = () => {
  const { userList, addFriend } = useContext(ChatAppContext)
  return (
    <div>
      <div className={Style.alluser_info}>
        <h1>All Users</h1>
        <p>Here you can see all the users of this app</p>
      </div>
      <div className={Style.alluser}>
        {userList.map((user, index) => (
          <UserCard
            key={index}
            user={user}
            i={index}
            address={user.address}
            addFriend={addFriend}
          />
        ))}
      </div>
    </div>
  )
}

export default alluser

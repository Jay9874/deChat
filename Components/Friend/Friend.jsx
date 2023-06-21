import { useState, useContext, useEffect } from 'react'
import Style from './Friend.module.css'
import Card from './Card/Card'
import Chat from './Chat/Chat'
import Image from 'next/image'
import images from '../../assets'
import { ChatAppContext } from '../../Context/ChatAppContext'

export default function Friend () {
  const {
    sendMessage,
    account,
    friendList,
    readMessage,
    friendMsg,
    username,
    currentUsername,
    currentUserAddress,
    loading,
    userInfo
  } = useContext(ChatAppContext)
  return (
    <div className={Style.friend}>
      <div className={Style.friend_box}>
        <div className={Style.friend_box_left}>
          {friendList.map((friend, index) => {
            return (
              <Card
                key={index}
                friend={friend}
                index={index}
                readMessage={readMessage}
                userInfo={userInfo}
              />
            )
          })}
        </div>
        <div className={Style.friend_box_right}>
          <Chat 
            sendMessage={sendMessage}
            readMessage={readMessage}
            username={username}
            currentUsername={currentUsername}
            currentUserAddress={currentUserAddress}
            loading={loading}
            userInfo={userInfo}
            account={account}
            friendMsg={friendMsg}
          />
        </div>
      </div>
    </div>
  )
}

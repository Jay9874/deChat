import { useState, useContext, useEffect, use } from 'react'
import Style from './Friend.module.css'
import Card from './Card/Card'
import Chat from './Chat/Chat'
import { ChatAppContext } from '../../Context/ChatAppContext'
import { useRouter } from 'next/router'

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
  const searchPara = useRouter()
  return (
    <div className={Style.friend}>
      <div className={Style.friend_box}>
        {!searchPara.query.name ? (
          <h4>Select a user below to chat</h4>
        ) : (
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
        )}

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
      </div>
    </div>
  )
}

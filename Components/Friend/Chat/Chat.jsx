import { useState, useEffect, useRef, useContext } from 'react'
import Image from 'next/image'
import Style from './Chat.module.css'
import images from '../../../assets'
import { useRouter } from 'next/router'
import { convertTimestamp } from '../../../Utils/apiFeatures'
import { Loader } from '../..'
import { ChatAppContext } from '../../../Context/ChatAppContext'

const Chat = ({
  sendMessage,
  readMessage,
  username,
  currentUsername,
  currentUserAddress,
  loading,
  friendMsg
}) => {
  const { setCurrentUserAddress, setCurrentUsername } =
    useContext(ChatAppContext)
  // useStates
  const [message, setMessage] = useState('')
  const [chatData, setChatData] = useState({
    name: '',
    pubkey: ''
  })
  const chatBox = useRef(null)
  const router = useRouter()

  useEffect(() => {
    setChatData(router.query)
    var elem = chatBox.current
    elem.scrollTop = elem.scrollHeight
    setCurrentUserAddress(router.query.address)
    setCurrentUsername(router.query.name)
  }, [router.query])

  // Functions
  const handleSend = e => {
    // e.preventDefault()
    console.log(message, chatData.pubkey)
    sendMessage(chatData.pubkey, message)
    setMessage('')
  }

  return (
    <div className={Style.chat}>
      {currentUsername && currentUserAddress ? (
        <div className={Style.chat_user_info}>
          <Image src={images.accountName} alt='user' height={70} width={70} />
          <div className={Style.chat_user_info_box}>
            <h3>{currentUsername}</h3>
            <p className={Style.show}>{currentUserAddress.slice(0, 25)}...</p>
          </div>
        </div>
      ) : (
        <h4>Select a user to chat</h4>
      )}

      <div ref={chatBox} className={Style.chat_msg_container}>
        {friendMsg ? (
          friendMsg.map((message, index) => {
            return (
              <div key={index} className={Style.chat_box}>
                {message.sender === chatData.pubkey ? (
                  <div className={Style.chat_msg_recieved}>
                    <p key={index}>{message.msg}</p>
                    <small>Time: {convertTimestamp(message.timestamp)}</small>
                    <div className={Style.chat_msg_recieved_ind}>
                      <div></div>
                    </div>
                  </div>
                ) : (
                  <div className={Style.chat_msg_sent}>
                    <p key={index}>{message.msg}</p>
                    <small>Time: {convertTimestamp(message.timestamp)}</small>
                    <div className={Style.chat_msg_sent_ind}>
                      <div></div>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <h4>No messages</h4>
        )}
      </div>

      {/* chat box bottom menu */}
      {currentUserAddress && currentUsername && (
        <div className={Style.chat_box_send}>
          <div className={Style.chat_box_actions}>
            <ion-icon
              className={Style.chat_box_smile_icon}
              name='happy-outline'
            ></ion-icon>

            <input
              type='text'
              placeholder='Type a message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <ion-icon
              className={Style.chat_box_file_icon}
              name='attach-outline'
            ></ion-icon>

            {loading ? (
              <Loader />
            ) : (
              <ion-icon
                onClick={handleSend}
                className={Style.chat_box_send_icon}
                name='send-outline'
              ></ion-icon>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat

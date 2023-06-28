import { useState, useEffect, useContext, use } from 'react'
import Image from 'next/image'
import Style from './Chat.module.css'
import images from '../../../assets'
import { useRouter } from 'next/router'
import { convertTimestamp } from '../../../Utils/apiFeatures'
import { Loader } from '../..'
import { useSearchParams } from 'next/navigation'

const Chat = ({
  sendMessage,
  readMessage,
  username,
  currentUsername,
  currentUserAddress,
  loading,
  readUser,
  account,
  friendMsg
}) => {
  // useStates
  const [message, setMessage] = useState('')
  const [chatData, setChatData] = useState({
    name: '',
    pubkey: ''
  })
  const router = useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    if (!searchParams) return
    setChatData(router.query)
  }, [searchParams])
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
      <div className={Style.chat_box_box}>
        <div className={Style.chat_msg_container}>
          {friendMsg ? (
            friendMsg.map((message, index) => {
              return (
                <div key={index} className={Style.chat_box}>
                  {message.sender === chatData.pubkey ? (
                    <div className={Style.chat_msg_recieved}>
                      <p key={index}>{message.msg}</p>
                      <small>Time: {convertTimestamp(message.timestamp)}</small>
                    </div>
                  ) : (
                    <div className={Style.chat_msg_sent}>
                      <p key={index}>{message.msg}</p>
                      <small>Time: {convertTimestamp(message.timestamp)}</small>
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <h4>No messages</h4>
          )}
        </div>
      </div>
      {/* chat box bottom menu */}
      {currentUserAddress && currentUsername && (
        <div className={Style.chat_box_send}>
          <div className={Style.chat_box_send_img}>
            <Image
              src={images.smile}
              alt='emoji'
              height={50}
              width={50}
              className={Style.chat_box_send_smile}
            />
            <input
              type='text'
              placeholder='Type a message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <Image
              src={images.file}
              alt='file'
              height={50}
              width={50}
              className={Style.chat_box_send_img_file}
            />
            {loading ? (
              <Loader />
            ) : (
              <Image
                src={images.send}
                alt='send'
                height={50}
                width={50}
                className={Style.chat_box_send_img_send}
                onClick={() => {
                  sendMessage(chatData.pubkey, message), setMessage('')
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat

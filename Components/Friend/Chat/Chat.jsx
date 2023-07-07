import { useState, useEffect, useRef, useContext } from 'react'
import Image from 'next/image'
import Style from './Chat.module.css'
import images from '../../../assets'
import { useRouter } from 'next/router'
import { convertTimestamp } from '../../../Utils/apiFeatures'
import { Loader } from '../..'
import { ChatAppContext } from '../../../Context/ChatAppContext'

const Chat = ({ sendMessage, loading }) => {
  const { setError, readMessage } = useContext(ChatAppContext)
  // useStates
  const [message, setMessage] = useState('')
  const [friendMsg, setFriendMsg] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [recipient, setRecipient] = useState({
    name: '',
    pubkey: ''
  })

  const messageListRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    setRecipient({ name: router.query.name, pubkey: router.query.pubkey })
    fetchMessages()
    scrollToBottom()
  }, [router.query])

  // Functions
  const handleSend = async e => {
    try {
      e.preventDefault()
      await sendMessage(recipient.pubkey, message)
      setMessage('')
    } catch (err) {
      setError(`Error: ${err}`)
    }
  }

  const fetchMessages = async () => {
    try {
      const fetchedMsg = await readMessage(router.query.pubkey)
      setFriendMsg(fetchedMsg)
      await scrollToBottom()
      setLoadingData(false)
    } catch (err) {
      setError(`Error: ${err}`)
    }
  }

  const scrollToBottom = async() => {
    const scrollHeight = messageListRef.current.scrollHeight
    console.log(scrollHeight)
    const height = messageListRef.current.clientHeight
    console.log(height)
    const maxScrollTop = scrollHeight - height
    messageListRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
  }

  return (
    <div className={Style.chat}>
      {recipient ? (
        <div className={Style.chat_user_info}>
          <Image src={images.accountName} alt='user' height={70} width={70} />
          <div className={Style.chat_user_info_box}>
            <h3>{recipient.name}</h3>
            <p className={Style.show}>{recipient.pubkey.slice(0, 25)}...</p>
          </div>
        </div>
      ) : (
        <h4>Select a user to chat</h4>
      )}

      <div ref={messageListRef} className={Style.chat_msg_container}>
        {loadingData ? (
          <h4>Getting messages...</h4>
        ) : (
          friendMsg.map((message, index) => (
            <div key={index} className={Style.chat_box}>
              {message.sender === recipient.pubkey ? (
                <div className={Style.chat_msg_recieved}>
                  <p>{message.msg}</p>
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
          ))
        )}
      </div>

      {/* chat box bottom menu */}
      {recipient && (
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

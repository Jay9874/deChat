import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Style from './Filter.module.css'
import { ChatAppContext } from '../../Context/ChatAppContext'
import images from '../../assets'
import { Model } from '..'

export default function Filter () {
  const { account, addFriend } = useContext(ChatAppContext)
  // useStates
  const [addNewFriend, setNewAddFriend] = useState(false)

  return (
    <div className={Style.filter}>
      <div className={Style.filter_box}>
        <div className={Style.filter_box_left}>
          <div className={Style.filter_box_left_search}>
            <Image
              src={images.search}
              alt='search'
              height={30}
              width={30}
              className={Style.filter_box_left_search_icon}
            />
            <input type='text' placeholder='Search' />
          </div>
        </div>
        <div className={Style.filter_box_right}>
          <button>
            <Image src={images.clear} alt='clear' height={30} width={30} />
            Clear Chat
          </button>
          <button onClick={() => setNewAddFriend(true)}>
            <Image src={images.user} alt='delete' height={30} width={30} />
            Add Friend
          </button>
        </div>
      </div>
      {/* Model */}
      {addNewFriend && (
        <div className={Style.filter_model}>
          <Model
            openBox={setNewAddFriend}
            head='Add Friend'
            info='Enter your friend name and address'
            title='Welcome to Chat App'
            subInfo='Enter your friend name and address'
            image={images.hero}
            functionName={addFriend}
            account={account}
          />
        </div>
      )}
    </div>
  )
}

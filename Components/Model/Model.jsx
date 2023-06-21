import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'

// Internal imports
import Style from './Model.module.css'
import { ChatAppContext } from '../../Context/ChatAppContext'
import images from '../../assets'
import { Loader } from '..'

export default function Model ({
  openBox,
  head,
  info,
  title,
  subInfo,
  image,
  functionName,
  account
}) {
  // useStates
  const [name, setName] = useState('')
  const [accountAddress, setAccountAddress] = useState('')
  const { loading, setError } = useContext(ChatAppContext)
  return (
    <div className={Style.model}>
      <div className={Style.model_box}>
        <div className={Style.model_box_left}>
          <Image src={image} alt='logo' height={700} width={700} />
        </div>
        <div className={Style.model_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{subInfo}</small>
          {/* Loader */}
          {loading ? (
            <Loader />
          ) : (
            <div className={Style.model_box_right_name}>
              <div className={Style.model_box_right_name_info}>
                <Image
                  src={images.username}
                  alt='username'
                  height={30}
                  width={30}
                />
                <input
                  type='text'
                  placeholder='Your name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className={Style.model_box_right_name_info}>
                <Image
                  src={images.account}
                  alt='username'
                  height={30}
                  width={30}
                />
                <input
                  type='text'
                  placeholder={account || 'Enter your account address'}
                  value={accountAddress}
                  onChange={e => setAccountAddress(e.target.value)}
                />
              </div>
              <div className={Style.model_box_right_name_btn}>
                <button onClick={() => functionName(name, accountAddress)}>
                  <Image src={images.send} alt='send' height={30} width={30} />
                  Submit
                </button>
                <button
                  onClick={() => {
                    setError('')
                    openBox(false)
                  }}
                >
                  <Image
                    src={images.close}
                    alt='close'
                    height={30}
                    width={30}
                  />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

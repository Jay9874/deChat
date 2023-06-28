import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

//Internal imports
import Style from './NavBar.module.css'
import { ChatAppContext } from '../../Context/ChatAppContext'
import { Model, Error } from '..'
import images from '../../assets'

export default function NavBar () {
  const [menuItems, setMenuItems] = useState([
    { name: 'Users', link: '/allusers' },
    { name: 'Chat', link: '/' },
    { name: 'Contacts', link: '/contacts' },
    { name: 'Profile', link: '/profile' },
  ])
  const [activeLink, setActiveLink] = useState(2)
  const [showModel, setShowModel] = useState(false)
  const [open, setOpen] = useState(false)
  const { account, username, connectWallet, createAccount, error } =
    useContext(ChatAppContext)
  return (
    <div className={Style.navBar}>
      <div className={Style.navBar_box}>
        <div className={Style.navBar_box_left}>
          <Image
            src={images.chat}
            alt='logo'
            className={Style.navBar_box_left_logo}
            height={50}
            width={50}
          />
        </div>
        <div className={Style.navBar_box_right}>
          {/* Desktop */}
          <div className={Style.navBar_box_right_menu}>
            {menuItems.map((item, index) => (
              <div
                className={`${Style.navBar_box_right_menu_items} ${
                  activeLink === index ? 'active' : ''
                }`}
                key={index}
                onClick={() => setActiveLink(index)}
              >
                <a
                  href={item.link}
                  className={Style.navBar_box_right_menu_link}
                >
                  {item.name}
                </a>
              </div>
            ))}
          </div>
          {/* Mobile */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((item, index) => (
                <div
                  className={`${Style.mobile_menu_items} ${
                    activeLink === index ? 'active' : ''
                  }`}
                  key={index}
                  onClick={() => setActiveLink(index)}
                >
                  <a href={item.link} className={Style.mobile_menu_link}>
                    {item.name}
                  </a>
                </div>
              ))}
              {/* Close button */}
              <div
                className={Style.mobile_menu_btn}
                onClick={() => setOpen(false)}
              >
                <Image src={images.close} alt='close' height={50} width={50} />
              </div>
            </div>
          )}
          {/* connect wallet */}
          <div className={Style.navBar_box_right_connect}>
            {account === '' ? (
              <button onClick={() => connectWallet()}>Connect Wallet</button>
            ) : (
              <button onClick={() => setShowModel(true)}>
                <Image
                  src={username ? images.accountName : images.create2}
                  alt='user'
                  height={20}
                  width={20}
                />{' '}
                <p>{username || 'Create Account'}</p>
              </button>
            )}
          </div>
          {/* Mobile menu button */}
          <div
            className={Style.navBar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt='menu' height={30} width={30} />
          </div>
        </div>
      </div>
      {/* Model componet */}
      {showModel && (
        <div className={Style.modelBox}>
          <Model
            openBox={setShowModel}
            title='Welcome to'
            head='Lets Chat'
            info='Lets chat with your friends and family and have fun.'
            subInfo='Please enter your name to continue.'
            image={images.hero}
            functionName={createAccount}
            account={account}
          />
        </div>
      )}
      {error && <Error error={error} />}
    </div>
  )
}

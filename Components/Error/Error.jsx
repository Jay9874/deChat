import { useContext } from 'react'
import Style from './Error.module.css'
import Image from 'next/image'
import images from '../../assets'
import { ChatAppContext } from '../../Context/ChatAppContext'

export default function Error ({ error }) {
  const { setError } = useContext(ChatAppContext)
  return (
    <div className={Style.error}>
      <div className={Style.error_box}>
        <h1>
          Please fix this error:
          <br />
          <span>{error}</span>
        </h1>
      </div>
      <button
        onClick={() => {
          setError('')
        }}
        className={Style.error_cancel_btn}
      >
        Close
      </button>
    </div>
  )
}

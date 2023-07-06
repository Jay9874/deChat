import { createContext, useState, useEffect, useContext, use } from 'react'
import { useRouter } from 'next/router'

import {
  checkIfWalletIsConnected,
  connectWallet,
  connectingWithContract
} from '../Utils/apiFeatures'

export const ChatAppContext = createContext('hello')

export const ChatAppProvider = ({ children }) => {
  //useStates
  const [account, setAccount] = useState('')
  const [username, setUsername] = useState('')
  const [friendList, setFriendList] = useState([])
  const [friendMsg, setFriendMsg] = useState([])
  const [loading, setLoading] = useState(false)
  const [userList, setUserList] = useState([])
  const [error, setError] = useState('')

  //Chat user data
  const [currentUsername, setCurrentUsername] = useState('')
  const [currentUserAddress, setCurrentUserAddress] = useState('')
  const router = useRouter()

  //fectch data at load
  const fetchData = async () => {
    try {
      //Get contract
      const contract = await connectingWithContract()
      // //Get account
      const account = await connectWallet()
      setAccount(account)
      //Get username
      const userExist = await contract.checkUserExist(account)
      if (userExist) {
        const username = await contract.getUsername(account)
        setUsername(username)
        // // Get friend list
        const friendList = await contract.getMyFriendList()
        setFriendList(friendList)
        // Get all user list
      }
      const newUserList = await contract.getAllAppUser()
      newUserList.map(user => {
        const newAddress = user.accountAddress.toLowerCase()
        setUserList(prev => [...prev, { name: user.name, address: newAddress }])
      })
    } catch (err) {
      console.log(err)
      setError(`Please install Metamask and connect your wallet, ${err}`)
    }
  }
  useEffect(() => {
    const query = router.query
    if(query.name){
      setCurrentUsername(query.name)
      setCurrentUserAddress(query.address)
    }
    fetchData()
  }, [])

  //Read message
  const readMessage = async friendAddress => {
    try {
      //Get contract
      const contract = await connectingWithContract()
      //Get message
      const friendMsg = await contract.readMessage(friendAddress)
      setFriendMsg(friendMsg)
    } catch (err) {
      setError(`Please check your friend address ${err}`)
    }
  }
  //Create account
  const createAccount = async (username, accountAddress) => {
    try {
      if (!username || !accountAddress)
        return setError('Please fill in all fields')
      //Get contract
      const contract = await connectingWithContract()
      //Create account
      const createAccount = await contract.createAccount(username)
      setLoading(true)
      createAccount.wait().then(() => {
        console.log(createAccount)
        setLoading(false)
        window.location.reload()
      })
      //Get account
      const account = await connectWallet()
      setAccount(account)
    } catch (err) {
      setError(
        `Please install Metamask and connect your wallet: ${err.message}`
      )
    }
  }

  //Add friend
  const addFriend = async (username, friendAddress) => {
    try {
      if (!username || !friendAddress)
        return setError('Please fill in all fields')
      //Get contract
      const contract = await connectingWithContract()
      //Add friend
      const addFriend = await contract.addFriend(friendAddress, username)
      console.log(addFriend)
      setLoading(true)
      addFriend.wait().then(() => {
        setLoading(false)
        window.location.reload()
      })
    } catch (err) {
      setError(`Please check your friend address and be sure its not you`)
    }
  }
  // Chech already friend
  const alreadyFriend = async (userAddress, friendAddress) => {
    try {
      //Get contract
      const contract = await connectingWithContract()
      //Check already friend
      const checkAlreadyFriend = await contract.checkAldreadyFriend(
        userAddress,
        friendAddress
      )
      return checkAlreadyFriend
    } catch (err) {
      setError(`Please check your friend address ${err}`)
    }
  }

  //Send message
  const sendMessage = async (friendAddress, message) => {
    try {
      // if (!friendAddress || !message) return setError('Cant send empty message')
      //Get contract
      const contract = await connectingWithContract()
      //Send message
      const sendMessage = await contract.sendMessage(friendAddress, message)
      setLoading(true)
      sendMessage.wait().then(() => {
        setLoading(false)
        window.location.reload()
      })
    } catch (err) {
      console.log(err)
      setError(`Please check your friend address ${err} `)
    }
  }

  //user info
  const userInfo = async userAddress => {
    const contract = await connectingWithContract()
    const username = await contract.getUsername(userAddress)
    setCurrentUsername(username)
    setCurrentUserAddress(userAddress)
  }

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriend,
        alreadyFriend,
        sendMessage,
        userInfo,
        connectWallet,
        checkIfWalletIsConnected,
        setError,
        userInfo,
        setCurrentUserAddress,
        setCurrentUsername,
        account,
        username,
        friendList,
        friendMsg,
        loading,
        userList,
        error,
        currentUsername,
        currentUserAddress
      }}
    >
      {children}
    </ChatAppContext.Provider>
  )
}

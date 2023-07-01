import { ethers } from 'ethers'
import web3Modal from 'web3modal'
import { ABI, ADDRESS } from '../Context/constants'

export const checkIfWalletIsConnected = async () => {
  try {
    if (!window.ethereum) return console.log('install metamask')

    const accounts = await window.ethereum.request({
      method: 'eth_accounts'
    })
    const firstAccount = accounts[0]
    return firstAccount
  } catch (err) {
    console.log('install metamask')
  }
}

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log('install metamask')

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
    const firstAccount = accounts[0]
    return firstAccount
  } catch (err) {
    console.log('install metamask')
  }
}

const fetchContract = signerOrProvider => {
  return new ethers.Contract(ADDRESS, ABI, signerOrProvider)
}

export const connectingWithContract = async () => {
  try {
    const newWeb3Modal = new web3Modal()
    const connection = await newWeb3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = fetchContract(signer)
    return contract
  } catch (err) {
    console.log(err)
  }
}

export const convertTimestamp = timestamp => {

  const newTime = new Date(timestamp.toNumber())
  console.log(newTime)
  const realTime =
    newTime.getHours() +
    '/' +
    newTime.getMinutes() +
    '/' +
    newTime.getSeconds() +
    ' Date: ' +
    newTime.getDate() +
    '/' +
    (newTime.getMonth() + 1) +
    '/' +
    newTime.getFullYear()

  return realTime
}

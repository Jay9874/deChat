require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config({ path: '.env' })

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL

const POLYGON_PRIVATE_KEY = process.env.POLYGON_PRIVATE_KEY

module.exports = {
  solidity: '0.8.18',
  networks: {
    mumbai: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [POLYGON_PRIVATE_KEY]
    }
  }
}

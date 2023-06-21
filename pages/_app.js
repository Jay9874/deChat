import '../styles/globals.css'
import { ChatAppProvider } from '../Context/ChatAppContext'
import { NavBar } from '../Components/index'

const MyApp = ({ Component, pageProps }) => {
  return (
      <ChatAppProvider>
        <NavBar />
        <Component {...pageProps} />
      </ChatAppProvider>
  )
}

export default MyApp

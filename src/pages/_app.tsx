import '../styles/global.scss'

import { Header } from '../components/Header';

import { PlayerContextProvider } from '../contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <Header />
      <main className='flex'>
        {/* <div className="flex-1"> */}
        <Component {...pageProps} />
        {/* </div> */}
      </main>
    </PlayerContextProvider>

  )
}
export default MyApp

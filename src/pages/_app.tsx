import '../styles/global.scss'

import { Header } from '../components/Header';
import { PlayerBottom } from '../components/PlayerBottom'

import { PlayerContextProvider } from '../contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <Header />
      <main className='flex flex-col'>
        {/* <div className="flex-1"> */}
        <Component {...pageProps} />
        {/* </div> */}
      </main>
      <PlayerBottom />
    </PlayerContextProvider>

  )
}
export default MyApp

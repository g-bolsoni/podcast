import '../styles/global.scss'

import { PlayerContextProvider } from '../contexts/PlayerContext';
import { Header } from '../components/Header';
import { PlayerBottom } from '../components/PlayerBottom'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <Header />
      <main className='flex flex-col'>
        <Component {...pageProps} />
      </main>
      <PlayerBottom />
    </PlayerContextProvider >

  )
}
export default MyApp

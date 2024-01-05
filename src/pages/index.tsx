import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import { GetStaticProps } from 'next';
import { api } from '../services/api'
import { format, parseISO } from 'date-fns'
import { usePlayer } from '../contexts/PlayerContext';
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head';
import ptBR from 'date-fns/locale/pt-BR'
import styles from './home.module.scss'

type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;

}

type HomeProps = {
  //episodes: Array<{Episode}>
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = usePlayer();

  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <div className="px-16 w-full h-[calc(100vh_-_190px)] overflow-x-hidden">
      <Head>
        <title>Home | Podcastr</title>
      </Head>

      {/*Lista dos episódios recentes*/}
      <section className={styles.latesEpisodes}>
        <h2 className='mt-12 mb-6'>Ultimos lançamentos</h2>

        <ul className='list-none grid grid-cols-2 gap-6'>
          {latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id} className='relative bg-white border border-1 border-gray-100 p-5 rounded-3xl flex items-center' >
                <Image
                  className='w-24 h-24 rounded-lg'
                  width={96}
                  height={96}
                  alt={episode.title}
                  src={episode.thumbnail}
                  objectFit="cover"
                />

                <div className="flex-1 ml-4">
                  <Link href={`/episode/${episode.id}`} className='block text-gray-800 font-semibold no-underline hover:underline leading-6'>
                    {episode.title}
                  </Link>
                  <p className='text-sm mt-1 max-w-[70%] whitespace-nowrap overflow-hidden text-ellipsis'>{episode.members}</p>
                  <span className='inline-block mt-2 text-xs'>{episode.publishedAt}</span>
                  <span className='inline-block mt-2 text-xs'>{episode.durationAsString}</span>
                </div>

                <button type="button" className='absolute right-8 bottom-8 w-10 h-10 bg-white outline outline-2 outline-gray-100 rounded-xl transition-all duration-200 hover:brightness-95 flex justify-center items-center' onClick={() => playList(episodeList, index)}>
                  <img className='w-6 h-6' src="/play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/*Lista com os episódios  */}
      <section className="pb-8">
        <h2 className='mt-12 mb-6'>Todos os episódios</h2>
        <table className='w-full' cellSpacing={0}>
          <thead>
            <tr>
              <th className='p-3 outline outline-1 outline-gray-100 text-gray-200 uppercase font-medium text-xs text-left'></th>
              <th className='p-3 outline outline-1 outline-gray-100 text-gray-200 uppercase font-medium text-xs text-left'>Podcast</th>
              <th className='p-3 outline outline-1 outline-gray-100 text-gray-200 uppercase font-medium text-xs text-left'>Integrantes</th>
              <th className='p-3 outline outline-1 outline-gray-100 text-gray-200 uppercase font-medium text-xs text-left'>Data</th>
              <th className='p-3 outline outline-1 outline-gray-100 text-gray-200 uppercase font-medium text-xs text-left'>Duração</th>
              <th className='p-3 outline outline-1 outline-gray-100 text-gray-200 uppercase font-medium text-xs text-left'></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td className='p-3 outline outline-1 outline-gray-100 text-xs' style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      className='w-full h-full rounded-lg'
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover" />
                  </td>
                  <td className='p-3 outline outline-1 outline-gray-100'>
                    <Link className='text-gray-800 font-semibold no-underline leading-6 text-base hover:underline' href={`/episode/${episode.id}`}>
                      {episode.title}
                    </Link>
                  </td>
                  <td className='p-3 outline outline-1 outline-gray-100'>{episode.members}</td>
                  <td className='p-3 outline outline-1 outline-gray-100' style={{ width: 125 }}>{episode.publishedAt}</td>
                  <td className='p-3 outline outline-1 outline-gray-100'>{episode.durationAsString}</td>
                  <td className='p-3 outline outline-1 outline-gray-100'>
                    <button type="button" className='w-8 h-8 bg-white outline outline-3 outline-gray-100 rounded-lg transition-all duration-200 hover:brightness-95 flex justify-center items-center' onClick={() => playList(episodeList, index + latestEpisodes.length)}>
                      <img src="/play-green.svg" alt="Tocar Episódio" className='w-5 h-5' />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  }); // Pegar os dados da api e definindo alguns parametros

  //Formatar os dados que vem da API

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url
    };
  });


  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(0, episodes.length);
  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}

// below are 3 diferent ways to consume the api data: SPA / SSR / SSG

/////////////////////// SPA usign react state onload:

/*
import { useEffect } from 'react' 

export default function Home() {
  useEffect (() => { // this function execute every load
    fetch('http://localhost:3333/episodes')
    .then(response => response.json()) // convert response in json
    .then(data => console.log(data)) // take json and console it
  }, []) 

  return (
  <h1>index</h1>
  )
}
*/

/////////////////////// SSR usign node:

/*
export default function Home(props) {
  console.log(props.episodes); // without brownser js, it runs on terminal, before visual load
 return (
  <>
  <h1>index</h1>
  <p>{JSON.stringify(props.episodes)}</p> 
  </>
  )
}
export async function getServerSideProps() // execute before others
{
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return{
    props: {
      episodes: data,
    }
  }
}
*/

// SSG -> require a "yarn build" and the "yarn start (not dev)"

import { GetStaticProps } from 'next'; // importing the types of the function (parameters and returns)
import { api } from '../services/api';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  duration: number;
  durationAsString: string;
  url: string;
}

type HomeProps = {
  episodes: Episode[];
}

export default function Home(props) {
 return (
  <>
  <h1>index</h1>
  <p>{JSON.stringify(props.episodes)}</p> 
  </>
  )
}
export const getStaticProps: GetStaticProps = async () => // execute before others
{
  // axios things:
  const { data } = await api.get('episodes', {
    params:
    {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    };
  })

  return{
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8,
  }
}

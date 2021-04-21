// below are 3 diferent ways to consume the api data: SPA / SSR / SSG

// SPA usign react state onload:

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

// SSR usign node:

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

/*

*/

export default function Home(props) {
 return (
  <>
  <h1>index</h1>
  <p>{JSON.stringify(props.episodes)}</p> 
  </>
  )
}
export async function getStaticProps() // execute before others
{
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return{
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}

import '../styles/global.scss'
/*
to use the posdast data: yarn add json-server -D ("fake api" with the file server.json)
and add "server": "json-server server.json -w -d 750 -p 3333"
finally, a yarn server
*/
// tsx = typescript + jsx (xml into javascript)
import { Header } from '../components/Header'
import { Player } from '../components/Player'

import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header/>
        <Component {...pageProps}/>
      </main>
      <Player/>
    </div>
  )
}

export default MyApp

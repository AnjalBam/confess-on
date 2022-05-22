import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ConfessOn</title>
      </Head>
      <main>
        <h1 className={styles.title} id='helloworld'>Hello There</h1>
      </main>
    </div>
  )
}

export default Home

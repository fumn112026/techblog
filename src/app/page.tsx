import styles from './page.module.css'
import { client } from '../libs/microcms/client'

export default async function Home() {
  const data = await client.get({ endpoint: 'blog' })
  return (
    <main className={styles.main}>
      <h1>My Tech Blog</h1>
      <ul>
        {data.contents.map((content) => (
          <li key={content.id}>
            <h2>{content.title}</h2>
            <p>{content.publishedAt}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

"use client"
import { useState, useEffect } from "react"
import { ChangeLog } from "@/types"
import styles from "./styles.module.css"

const page = () => {
  const [changeLog, setChangeLog] = useState<ChangeLog[]>([])

  const getChangeLog = async () => {
    const res = await fetch('/api/changelog')
    const data = await res.json()
    return data
  }

  useEffect(() => {
    getChangeLog().then((data) => setChangeLog(data))
  }, [])

  return (
    <section className={styles.main}>
      <h1 className={styles.title}>Changelog</h1>
      <article className={styles.article}>
        <ul className={styles.list}>
          {changeLog?.map((changeLog) => (
            <li key={changeLog.version} className={styles.changeLog}>
              <h2 className={styles.version}>{changeLog.version}</h2>
              <ul className={styles.changes}>
                {changeLog.changes.map((change) => (
                  <li key={change.title} className={styles.change}>
                    <h3>{change.title}</h3>
                    {change.description && <p>{change.description}</p>}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

export default page
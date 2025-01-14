"use client"
import { useState, useEffect } from "react"
import { ChangeLog } from "@/types"
import styles from "./styles.module.css"

const Page = () => {
  const [changeLogs, setChangeLogs] = useState<ChangeLog[]>([])

  const getChangeLog = async () => {
    const res = await fetch('/api/changelog')
    const data = await res.json()
    return data
  }

  useEffect(() => {
    const fetchChangeLog = async () => {
      const data = await getChangeLog()
      setChangeLogs(data)
    }
    fetchChangeLog()
  }, [])

  return (
    <section className={styles.main}>
      <h1 className={styles.title}>Changelog</h1>
      <article className={styles.article}>
        <ul className={styles.list}>
          {
            changeLogs?.map((log) => (
              <li key={log.version} className={styles.changeLog}>
                <h2 className={styles.version}>{log.version}</h2>
                <ul className={styles.changes}>
                  {
                    log.changes.map((change) => (
                      <li key={change.title} className={styles.change}>
                        <div className={styles.changeHeader}>
                          <span className={`${styles.typeBadge} ${styles[change.type]}`}>{change.type}</span>
                          <h3>{change.title} ({change.scope})</h3>
                        </div>
                        {change.description && <p className={styles.description}>{change.description}</p>}
                      </li>
                    ))
                  }
                </ul>
              </li>
            ))}
        </ul>
      </article>
    </section>
  )
}

export default Page

import { Commands } from '@/types'
import styles from './styles.module.css'

export const CommandsTable = ({ commands }: { commands: Commands[] }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableRow}>
          <th className={styles.tableHeader}><p>Comando</p></th>
          <th className={styles.tableHeader}><p>Descripción</p></th>
        </tr>
      </thead>
      <tbody>
        {commands?.map(({ command, description }, index) => (
          <tr key={index} className={styles.tableRow}>
            <td className={styles.tableCell}><p>{command}</p></td>
            <td className={styles.tableCell}><p>{description}</p></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
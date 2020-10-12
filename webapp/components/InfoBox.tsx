import styles from '../styles/InfoBox.module.css'

export default function InfoBox({title, text, button, onClick}) {

  return (
    <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
        <button className={styles.button} onClick={onClick}>{button}</button>
    </div>
  )
}

import styles from './popup.module.scss'

type Props = {
    isActive: boolean,
    time: number,
    turns: number,
    resetGame: (state: boolean) => void
}

export default function Popup({ isActive, time, turns, resetGame }: Props) {
    return (
        <div className={isActive ? `${styles.popup} ${styles.active}` : styles.popup}>
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <span className={styles.close} onClick={() => resetGame(true)}>X</span>
                    <h2>Game Over!</h2>
                    <div>
                        <p><span>Time:</span> {time} seconds</p>
                        <p><span>Turns:</span> {turns}</p>
                    </div>
                    <button onClick={() => resetGame(false)}>Again</button>
                </div>
            </div>
        </div>
    )
}
import styles from './gameplay.module.scss'

export default function Gameplay() {
    return (
        <section className={styles.gameplay}>
            <div className="container">
                <div className={styles.content}>
                    <h2>Gameplay</h2>
                    <ul>
                        <li>On each turn, a player selects two facedown cards.</li>
                        <li>If the two cards match, they are removed from the game board and the player earns points.</li>
                        <li>If the cards do not match, they are flipped face down again, and the players turn ends.</li>
                        <li>Players take turns in succession until all pairs have been matched and removed from the board.</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
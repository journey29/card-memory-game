import styles from './about.module.scss'

export default function About() {
    return (
        <section className={styles.about}>
            <div className="container">
                <div className={styles.content}>
                    <h2>About game</h2>
                    <p>
                        A card memory game, often known as a &quot;memory matching game&quot; or &quot;concentration game,&quot; is a popular type of
                        single-player or multiplayer game that challenges players memory and cognitive skills.</p>
                    <p>The objective of the game is to find pairs of matching cards from a shuffled set of facedown cards laid out in a grid formation.
                        It is commonly played using a deck of standard playing cards or custom cards with images, numbers, or symbols.</p>
                </div>
            </div>
        </section>
    )
}

'use client'
import { useEffect, useState } from 'react'
import styles from './main.module.scss'
import Link from 'next/link'
import {data} from '../../cards'

export default function Main() {
    const [flipped, setFlipped] = useState<boolean>(false);
    const [randomNumber, setRandomNumber] = useState<number>(0);

    const randomValue = () => {
        return Math.floor(Math.random() * data.length)
    }

    useEffect(() => {
        const randomNumber = randomValue();
        setRandomNumber(randomNumber)
    }, []);

    return (
        <section className={styles.main}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.text_content}>
                        <h1>Card Memore Game</h1>
                        <p>The main goal of the card memory game is to uncover all the matching pairs of cards on the game board.</p>
                        <Link href="/game">Play</Link>
                    </div>
                    <div className={styles.images}>
                        <div className={flipped ? styles.img_content : ''} onClick={() => setFlipped(!flipped)}>
                            <img className={styles.front} src={data[randomNumber].value} alt="front" />
                            <img className={styles.back} src="/back_side.png" alt="backside" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
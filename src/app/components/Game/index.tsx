'use client'
import { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import styles from './game.module.scss'
import { ICard } from '../../types'
import { data } from '../../cards'
import Link from 'next/link'

export default function Game() {
    const [cards, setCards] = useState<ICard[]>([]);
    const [turn, setTurn] = useState<number>(0);
    const [choiceOne, setChoiceOne] = useState<ICard | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<ICard | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false)

    const shuffleCards = (limit: number) => {
        const limitedCards = data.slice(0, limit);

        const shuffledCards = [...limitedCards, ...limitedCards]
            .sort(() => Math.random() - 0.5)
            .map(card => ({ ...card, id: Math.random() }));

        setCards(shuffledCards);
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurn(0)
    }

    const handleChoice = (card: ICard) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    };

    useEffect(() => {
        shuffleCards(4)
    }, [])


    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurn(prevTurn => prevTurn + 1)
        setDisabled(false)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.value === choiceTwo.value) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.value === choiceOne.value) {
                            return { ...card, matched: true }
                        } else {
                            return card
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    return (
        <main className={styles.main}>
            <div className="container">
                <div>
                    <Link className={styles.back} href="/">Back</Link>
                    <div className={styles.info}>
                        <div className={styles.turns}>Turns: {turn}</div>
                        <div className={styles.cards_quantity}>
                            <button onClick={() => shuffleCards(4)}>8</button>
                            <button onClick={() => shuffleCards(6)}>12</button>
                            <button onClick={() => shuffleCards(8)}>16</button>
                            <button onClick={() => shuffleCards(10)}>20</button>
                        </div>
                    </div>
                    <div className={styles.cards}>
                        {cards.map(card => (
                            <Card
                                key={card.id}
                                item={card}
                                handleChoice={handleChoice}
                                flipped={card === choiceOne || card === choiceTwo || card.matched}
                                disabled={disabled}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
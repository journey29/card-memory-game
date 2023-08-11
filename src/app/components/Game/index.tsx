'use client'
import { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import styles from './game.module.scss'
import { ICard } from '../../types'
import { data } from '../../cards'
import Link from 'next/link'
import Popup from '../Popup'
import QuantutySelect from '../QuantitySelect'

export default function Game() {
    const [cards, setCards] = useState<ICard[]>([]);
    const [turns, setTurns] = useState<number>(0);
    const [choiceOne, setChoiceOne] = useState<ICard | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<ICard | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [allMatched, setAllMatched] = useState<boolean>(false);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        let isIntervalActive = false;
    
        if (isActive && !allMatched) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
            isIntervalActive = true;
        }
    
        return () => {
            if (interval !== null && isIntervalActive) {
                clearInterval(interval);
            }
        };
    }, [isActive, allMatched]);


    const shuffleCards = (limit: number) => {
        const limitedCards = data.slice(0, limit);

        const shuffledCards = [...limitedCards, ...limitedCards]
            .sort(() => Math.random() - 0.5)
            .map(card => ({ ...card, id: Math.random(), matched:false }));

        setCards(shuffledCards);
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(0);
        setAllMatched(false);
    }

    const handleChoice = (card: ICard) => {
        setIsActive(true);
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    useEffect(() => {
        shuffleCards(4)
    }, [])

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurn => prevTurn + 1)
        setDisabled(false)
    }

    const handleReset = (isCloseBtn: boolean) => {
        if (isCloseBtn) {
            setSeconds(0);
            setIsActive(false)
            setAllMatched(false)
        } else {
            setSeconds(0);
            shuffleCards(cards.length / 2)
            setIsActive(false);
        }
    };

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.value === choiceTwo.value) {
                setCards(prevCards => {
                    const updatedCards = prevCards.map(card => {
                        if (card.value === choiceOne.value) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });

                    if (updatedCards.every(card => card.matched === true)) {
                        setAllMatched(true)
                    }

                    return updatedCards;
                });

                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    return (
        <main className={styles.main}>
            <div className="container">
                <div>
                    <Link className={styles.back} href="/">Back</Link>
                    <div className={styles.info}>
                        <div className={styles.turns}>Turns: {turns}</div>
                        <QuantutySelect shuffleCards={shuffleCards}/>
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
                    <Popup isActive={allMatched} time={seconds} turns={turns} resetGame={handleReset} />
                </div>
            </div>
        </main>
    )
}
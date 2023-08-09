'use client'
import { ICard } from "../../types"
import styles from './card.module.scss'

type Props = {
    item: ICard,
    handleChoice: (card: ICard) => void,
    flipped: boolean,
    disabled: boolean
}

export default function Card({ item, handleChoice, flipped, disabled }: Props) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(item)
        }
    }

    return (
        <div className={styles.card}>
            <div className={flipped ? styles.flipped : ""} style={{ backgroundColor: item.value }}>
                <img src={item.value} className={styles.front} alt="front img" />
                <img src="/back_side.png" className={styles.back} onClick={handleClick} alt="back img" />
            </div>
        </div>
    )
}

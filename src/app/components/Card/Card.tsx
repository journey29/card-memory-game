'use client'
import { ICard } from "../../types"
import styles from './card.module.scss'
import Image from "next/image"

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
                <Image
                    className={styles.front}
                    src={item.value}
                    width={150}
                    height={200}
                    alt='front'
                />
                <Image
                    className={styles.back}
                    src='/back_side.png'
                    alt='backside'
                    width={150}
                    height={200}
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}

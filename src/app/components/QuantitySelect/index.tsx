import styles from './quantity.module.scss'

type Props = {
    shuffleCards:(state:number)=> void
}

export default function QuantutySelect({shuffleCards}:Props) {
    return (
        <div className={styles.cards_quantity}>
            <button onClick={() => shuffleCards(4)}>8</button>
            <button onClick={() => shuffleCards(6)}>12</button>
            <button onClick={() => shuffleCards(8)}>16</button>
            <button onClick={() => shuffleCards(10)}>20</button>
        </div>
    )
}
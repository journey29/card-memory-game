import styles from './loader.module.scss'

export default function Loader() {
    return (
        <>
            <div className={styles.parent_container}>
                <div className={styles.loader}></div>
            </div>
        </>
    )
}
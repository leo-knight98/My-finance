import styles from './Loading.module.css';

function Loading() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Cargando...</p>
        </div>
    );
}

export default Loading;

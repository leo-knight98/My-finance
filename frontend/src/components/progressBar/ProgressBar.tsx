import styles from './ProgressBar.module.css';

type ProgressBarProps = {
    progress: number;
};

function ProgressBar(props: ProgressBarProps) {
    // Asegurarse de que el progreso no exceda 100%
    const progress = Math.min(props.progress, 100);

    // Función para determinar el mensaje principal según el progreso
    const getMainMessage = (progress: number) => {
        if (progress <= 20) return "Empezando el viaje...";
        if (progress <= 50) return "Avanzando...";
        if (progress <= 70) return "A punto de alcanzar la meta!";
        if (progress <= 90) return "Casi hecho!";
        return "¡Objetivo alcanzado!";
    };

    // Función para determinar el mensaje secundario
    const getSecondaryMessage = (progress: number) => {
        if (progress <= 20) return "¡Cada paso cuenta!";
        if (progress <= 50) return "Continúa con el buen trabajo!";
        if (progress <= 70) return "¡Vas muy bien, sigue así!";
        if (progress <= 90) return "¡No te detengas ahora!";
        return "¡Excelente trabajo!";
    };

    // Lógica para mostrar solo uno de los textos (principal o secundario)
    const showMainText = progress <= 50; // Muestra el texto principal si el progreso es 50% o menos
    const showSecondaryText = progress > 50; // Muestra el texto secundario si el progreso es mayor al 50%

    return (
        <div className={styles.parentDiv}>
            <div className={styles.emptyBar}>
                {/* Barra llena */}
                <div
                    className={styles.filledBar}
                    style={{ width: `${progress}%` }} // Usamos el valor de 'progress' limitado a 100%
                />
                {/* Texto centrado */}
                <span className={styles.centeredText}>
                    {showMainText && getMainMessage(progress)}
                    {showSecondaryText && getSecondaryMessage(progress)}
                </span>
            </div>
        </div>
    );
}

export default ProgressBar;

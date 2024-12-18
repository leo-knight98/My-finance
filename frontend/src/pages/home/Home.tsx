import React from 'react';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Primera sección: De qué trata la aplicación */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>¿Qué es esta aplicación?</h2>
        <p className={styles.sectionText}>
          Esta aplicación es una herramienta diseñada para facilitar la gestión de tus finanzas personales. 
          Permite organizar tus <span className={styles.sectionHighlight}>ingresos</span>, 
          <span className={styles.sectionHighlight}> gastos</span> y  
          <span className={styles.sectionHighlight}> deudas </span> de forma sencilla y eficiente. 
          Mantén el control de tu dinero con un sistema intuitivo y fácil de usar.
        </p>
      </section>

      {/* Segunda sección: En qué nos beneficia */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>¿En qué nos beneficia?</h2>
        <p className={styles.sectionText}>
          Con esta aplicación, puedes:
        </p>
        <ul className={styles.sectionText}>
          <li>Organizar tus transacciones y categorías financieras.</li>
          <li>Controlar tus <span className={styles.sectionHighlight}>deudas</span>, ya sea por pagar o por cobrar.</li>
          <li>Establecer y alcanzar tus <span className={styles.sectionHighlight}>objetivos financieros</span>.</li>
          <li>Mantener una visión clara de tus finanzas en todo momento.</li>
        </ul>
      </section>

      {/* Tercera sección: Quiénes somos */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>¿Quiénes somos?</h2>
        <p className={styles.sectionText}>
          Somos un equipo de estudiantes de Fundesplai en proceso de aprendizaje, 
          apasionados por la programación y por encontrar soluciones prácticas a los problemas del día a día:
        </p>
        <ul className={styles.sectionText}>
          <li>Alfredo Blum</li>
          <li>Leo Manach</li>
          <li>Josue Vilera</li>
        </ul>
        <p className={styles.sectionText}>
          Nos dedicamos a mejorar y expandir nuestras habilidades mientras desarrollamos proyectos útiles y accesibles para todos.
        </p>
      </section>
    </div>
  );
}

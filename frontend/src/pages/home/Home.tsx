import React, { useState, useEffect, useCallback } from 'react';
import styles from './Home.module.css';

type SectionType = {
  title: string;
  content: JSX.Element;
  imageUrl: string;
};

const sectionsData: SectionType[] = [
  {
    title: "¿Qué es JLA Finance?",
    content: (
      <p>
        Esta aplicación es una herramienta diseñada para facilitar la gestión de tus finanzas personales.
        Permite organizar tus <span className={styles.sectionHighlight}>ingresos</span>,
        <span className={styles.sectionHighlight}>gastos</span> y
        <span className={styles.sectionHighlight}>deudas</span> de forma sencilla y eficiente.
        Mantén el control de tu dinero con un sistema intuitivo y fácil de usar.
      </p>
    ),
    imageUrl: "/bg3.jpg",
  },
  {
    title: "¿En qué nos beneficia?",
    content: (
      <ul className={styles.sectionText}>
        <li>Organizar tus transacciones y categorías financieras.</li>
        <li>Controlar tus <span className={styles.sectionHighlight}>deudas</span>, ya sea por pagar o por cobrar.</li>
        <li>Establecer y alcanzar tus <span className={styles.sectionHighlight}>objetivos financieros</span>.</li>
        <li>Mantener una visión clara de tus finanzas en todo momento.</li>
      </ul>
    ),
    imageUrl: "/bg4.jpg",
  },
  {
    title: "¿Quiénes somos?",
    content: (
      <div className={styles.teamContainer}>
        <div className={styles.teamMember}>
          <img src="/alfredo.jpg" alt="Alfredo Blum" className={styles.teamPhoto} />
          <p><strong>Alfredo Blum</strong></p>
          <a href="https://www.linkedin.com/in/alfredoblumtorres/?originalSubdomain=es" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <div className={styles.teamMember}>
          <img src="/josu.jpg" alt="Josué Vilera" className={styles.teamPhoto} />
          <p><strong>Josué Vilera</strong></p>
          <a href="https://www.linkedin.com/in/josuévilera/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <div className={styles.teamMember}>
          <img src="/leo.jpg" alt="Leo Manach" className={styles.teamPhoto} />
          <p><strong>Leo Manach</strong></p>
          <a href="https://www.linkedin.com/in/leo-manach-231071226/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    ),
    imageUrl: "/bg3.jpg",
  },
  {
    title: "¿Cómo usar esta aplicación?",
    content: (
      <>
        <p>Sigue estos simples pasos para comenzar a usar la aplicación:</p>
        <ol className={styles.sectionText}>
          <li><span className={styles.sectionHighlight}>Regístrate:</span> Crea una cuenta con tus datos básicos.</li>
          <li><span className={styles.sectionHighlight}>Configura tus categorías:</span> Personaliza las categorías de ingresos, gastos y deudas según tus necesidades.</li>
          <li><span className={styles.sectionHighlight}>Agrega tus transacciones:</span> Registra cada ingreso o gasto con su respectiva categoría.</li>
          <li><span className={styles.sectionHighlight}>Consulta los reportes:</span> Analiza tus finanzas con gráficos y estadísticas.</li>
        </ol>
        <p>¡Así de fácil! Empieza ahora y toma el control de tus finanzas.</p>
      </>
    ),
    imageUrl: "/bg1.jpg",
  },
];

const Section: React.FC<SectionType & { isVisible: boolean }> = ({ title, content, imageUrl, isVisible }) => (
  <section
    className={`${styles.section} ${isVisible ? styles.visible : ''}`}
    style={{ backgroundImage: `url(${imageUrl})` }}
    aria-hidden={!isVisible}
  >
    <h2 className={styles.sectionTitle}>{title}</h2>
    {content}
  </section>
);

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<boolean[]>(new Array(sectionsData.length).fill(false));

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const sectionHeight = window.innerHeight;

    setVisibleSections(
      sectionsData.map((_, index) => {
        const sectionTop = index * sectionHeight;
        const sectionBottom = sectionTop + sectionHeight;
        return scrollPosition > sectionTop - sectionHeight / 2 && scrollPosition < sectionBottom;
      })
    );
  }, []);

  useEffect(() => {
    const debouncedScroll = () => setTimeout(handleScroll, 100);
    window.addEventListener('scroll', debouncedScroll);
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [handleScroll]);

  return (
    <div className={styles.mainHome}>
      <div className={styles.container}>
        {sectionsData.map((section, index) => (
          <Section
            key={index}
            {...section}
            isVisible={visibleSections[index]}
          />
        ))}
      </div>
    </div>
  );
}

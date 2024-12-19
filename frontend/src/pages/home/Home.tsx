import React, { useState, useEffect } from 'react'; 
import styles from './Home.module.css';

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<boolean[]>(new Array(4).fill(false)); // Inicialmente, las secciones no son visibles

  const sections = [
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
      imageUrl: "/bg3.jpg" // Ruta de la imagen desde la carpeta public
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
      imageUrl: "/bg4.jpg"
    },
    {
      title: "¿Quiénes somos?",
      content: (
        <>
          <p>
            Somos un equipo de estudiantes en proceso de aprendizaje,
            apasionados por la programación y por encontrar soluciones prácticas a los problemas del día a día:
          </p>
          <ul className={styles.sectionText}>
            <li>Alfredo Blum</li>
            <li>Leo Manach</li>
            <li>Josue Vilera</li>
          </ul>
          <p>
            Nos dedicamos a mejorar y expandir nuestras habilidades mientras desarrollamos proyectos útiles y accesibles para todos.
          </p>
        </>
      ),
      imageUrl: "/bg3.jpg"
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
      imageUrl: "/bg1.jpg"
    },
  ];

  // Función para manejar el scroll
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const sectionHeight = window.innerHeight;

    const updatedVisibleSections = sections.map((_, index) => {
      const sectionTop = index * sectionHeight; // Determinamos la posición superior de cada sección
      const sectionBottom = sectionTop + sectionHeight;

      // Si la sección está visible en el viewport, la mostramos
      return scrollPosition > sectionTop - sectionHeight / 2 && scrollPosition < sectionBottom;
    });

    setVisibleSections(updatedVisibleSections);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.mainHome}>
      <div className={styles.container}>
        {sections.map((section, index) => (
          <section
            key={index}
            className={`${styles.section} ${visibleSections[index] ? styles.visible : ''}`}
            style={{ backgroundImage: `url(${section.imageUrl})` }}
          >
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            {section.content}
          </section>
        ))}
      </div>
    </div>
  );
}

import React from 'react'
import style from './experiencia.module.css'
import { mancha } from '../../utils'
import luna from '../../assets/luna.png'
import astronauta from '../../assets/astronauta.jpg'
import videoFuego from '../../assets/videos/firemorado.mp4'
import { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const Experiencia = () => {
  const timelineRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [showTopIndicator, setShowTopIndicator] = useState(false);
  const [showBottomIndicator, setShowBottomIndicator] = useState(false);

  const checkScrollPosition = () => {
    if (timelineRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = timelineRef.current;
      setShowTopIndicator(scrollTop > 20);
      setShowBottomIndicator(scrollTop < scrollHeight - clientHeight - 20);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const timeline = timelineRef.current;
    if (timeline) {
      timeline.addEventListener('scroll', checkScrollPosition);
      return () => timeline.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.pageY - timelineRef.current.offsetTop);
    setScrollTop(timelineRef.current.scrollTop);
    timelineRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const y = e.pageY - timelineRef.current.offsetTop;
    const walk = (y - startY) * 2;
    timelineRef.current.scrollTop = scrollTop - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    timelineRef.current.style.cursor = 'grab';
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      timelineRef.current.style.cursor = 'grab';
    }
  };

  const scrollUp = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({
        top: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollDown = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({
        top: 200,
        behavior: 'smooth'
      });
    }
  };

  const experiencias = [
    {
      id: 1,
      cargo: "Full Stack Developer",
      empresa: "Depilzone",
      periodo: "2024 - Actualidad",
      descripcion: "Brindé mantenimiento y mejoras a un sistema ERP de ventas, trabajando con C# y .NET en el backend, Angular en el frontend, y gestionando consultas y optimización mediante SQL Server y procedimientos almacenados. Además, lideré de forma integral el desarrollo de un sistema de facturación, ejecutando el proyecto completamente por mi cuenta: desde el modelado de la base de datos en MySQL, la construcción del backend con NestJS utilizando arquitectura hexagonal, y el desarrollo del frontend en Angular, hasta la implementación de un microservicio en PHP con Laravel específicamente diseñado para la emisión de boletas electrónicas hacia SUNAT.",
      tecnologias: ["React", "TypeScript", "Angular", "Sql Server", "C#", ".NET", "NestJS", "Laravel", "MySQL" ]
    },
    {
      id: 2,
      cargo: "Full Stack Developer",
      empresa: "CFR Solutions",
      periodo: "2023 - 2024",
      descripcion: "Lideré un equipo de desarrollo para la creación integral de sistemas ERP, supervisando frontend, backend y la arquitectura general del proyecto. Participé activamente en la implementación utilizando PHP y Laravel en el backend, y Angular en el frontend. También me encargué del diseño y maquetación de las interfaces, así como de la modelación y gestión de bases de datos, asegurando una solución coherente, optimizada y escalable.",
      tecnologias: ["Laravel", "MySQL", "Angular", "PHP"]
    },
    {
      id: 3,
      cargo: "Full Stack Developer",
      empresa: "Portfolio Personal",
      periodo: "2022 - 2023",
      descripcion: "Trabajé en el desarrollo de proyectos personales utilizando Angular para el frontend y Node.js con Express para el backend. Diseñé y consumí APIs REST, gestioné bases de datos PostgreSQL y desarrollé funcionalidades completas orientadas a negocio.v Entre los proyectos realizados destacan: Desarrollo de un e-commerce, con gestión de productos, usuarios y pedidos. Implementación de un sistema de puntos integrado con pasarela de pagos Izipay. Enfocado en buenas prácticas, arquitectura limpia y aprendizaje continuo..",
      tecnologias: ["Node.js", "MongoDB", "Express", "React"]
    }
  ];

  return (
    <div className={style.contenedor_experiencia} data-scroll-section>
      <div className={style.contenedor_titulo}>
        <h1 className={style.titulo_experiencia}>
          Experiencia <span className={style.titulo_destacado}>Profesional</span>
          <img src={luna} className={style.imagen_luna} alt="luna" />
        </h1>
        <img src={mancha} className={style.imagen_decorativa} alt="decoracion" />
      </div>

      <div className={style.timeline_y_astronauta}>
        <div className={style.timeline_wrapper_con_indicadores}>
          {showTopIndicator && (
            <div className={style.indicador_scroll_top} onClick={scrollUp}>
              <FontAwesomeIcon icon={faChevronUp} className={style.icono_flecha} />
            </div>
          )}
          <div 
            className={style.timeline_container}
            ref={timelineRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div className={style.timeline_wrapper}>
              {experiencias.map((exp, index) => (
                <div key={exp.id} className={style.timeline_item}>
                  <div className={style.timeline_line}>
                    <div className={style.timeline_punto}></div>
                    {index !== experiencias.length - 1 && (
                      <div className={style.timeline_vertical}></div>
                    )}
                  </div>
                  <div className={style.timeline_content}>
                    <h3 className={style.cargo}>{exp.cargo}</h3>
                    <p className={style.empresa}>{exp.empresa}</p>
                    <p className={style.descripcion}>{exp.descripcion}</p>
                    <p className={style.periodo}>{exp.periodo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {showBottomIndicator && (
            <div className={style.indicador_scroll_bottom} onClick={scrollDown}>
              <FontAwesomeIcon icon={faChevronDown} className={style.icono_flecha} />
            </div>
          )}
        </div>
        <div className={style.imagen_astronauta_container}>
          <img src={astronauta} className={style.imagen_astronauta} alt="astronauta" />
        </div>
      </div>

      <div className={style.video_fuego_container}>
        <video 
          className={style.video_fuego}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoFuego} type="video/mp4" />
        </video>
        <div className={style.gradiente_fuego}></div>
      </div>
    </div>
  )
}

export default Experiencia

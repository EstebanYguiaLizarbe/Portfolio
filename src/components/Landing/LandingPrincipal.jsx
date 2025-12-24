// import React from 'react'
import style from '../Landing/landingprincipal.module.css'
import {techs, backendTechs, databaseTechs, perfil_1, mancha, smoke} from '../../utils'
import React, { useEffect, useRef, useState } from 'react'

const LandingPrincipal = () => {
  const techsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sections = ['FRONTEND TECHS', 'BACKEND TECHS', 'DATABASE TECHS'];
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Auto-desplazamiento cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000); // Cambia cada 4 segundos
    
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [currentIndex]); // Se reinicia cuando cambia el índice
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? sections.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 150);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === sections.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 150);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragDistance(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const distance = e.clientX - startX;
    setDragDistance(distance);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    // Si se arrastró más de 50px a la izquierda, ir a siguiente
    if (dragDistance < -50) {
      handleNext();
    }
    // Si se arrastró más de 50px a la derecha, ir a anterior
    else if (dragDistance > 50) {
      handlePrev();
    }
    
    setIsDragging(false);
    setDragDistance(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <div className={style.contenedor_princiapl}>
        <div>
          <div className={style.contenedor_titulo_principal}>
            <h1 className={style.titulo_principal}>Habilidades</h1>
            <img src={mancha} className={style.imagen_decorativa} alt="decoracion" />

          </div>

          <div 
            className={style.contenedor_techs}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {/* Triángulo izquierdo */}
            <button className={style.triangulo_izquierdo} onClick={handlePrev}>
              <div className={style.triangulo_left}></div>
            </button>

            <div>
              <h2 className={`${style.titulo_techs} ${isTransitioning ? style.titulo_transitioning : ''}`}>
                {sections[currentIndex]}
              </h2>

              <div className={`${style.contenedor_tech_card} ${isTransitioning ? style.transitioning : ''}`}>
                {
                  (currentIndex === 0 ? techs : currentIndex === 1 ? backendTechs : databaseTechs).map((tech, index) => (
                    <div className={style.tech_card} key={index}>
                        <img className={style.tech_logo} src={tech.src} alt={tech.name} />
                        <h3 className={style.tech_title}>
                          {tech.name}
                        </h3>
                    </div>
                  ))
                }

              </div>
            </div>

            {/* Triángulo derecho */}
            <button className={style.triangulo_derecho} onClick={handleNext}>
              <div className={style.triangulo_right}></div>
            </button>
          </div>

          <div className={style.contenedor_circulo}>
            {sections.map((_, index) => (
              <div 
                key={index}
                className={`${style.circulo} ${currentIndex === index ? style.circulo_activo : ''}`}
              ></div>
            ))}
          </div>
        </div>
        {/* --------------------------------- */}

        <div className={style.contenedor_imagen_perfil}>
          <video className={style.video_humo} loop autoPlay muted playsInline>
            <source src={smoke} type="video/mp4" />
          </video>
          <div className={style.gradiente_superior}></div>
          <div className={style.gradiente_derecho}></div>
          
          <div className={`${style.flip_card} ${isFlipped ? style.flipped : ''}`}>
            <div className={style.flip_card_inner}>
              {/* Parte frontal - Imagen */}
              <div className={style.flip_card_front}>
                <img src={perfil_1} alt="perfil_esteban" className={style.perfil} />
                <button className={style.boton_sobre_mi} onClick={handleFlip}>
                  <span>Sobre mí</span>
                  <span className={style.flecha}>→</span>
                </button>
              </div>
              
              {/* Parte trasera - Sobre mí */}
              <div className={style.flip_card_back}>
                <button className={style.boton_volver} onClick={handleFlip}>
                  <span className={style.flecha}>←</span>
                  <span>Volver</span>
                </button>
                <div className={style.contenido_sobre_mi}>
                  <h3 className={style.titulo_sobre_mi}>Sobre mí</h3>
                  <p className={style.texto_sobre_mi}>
                    Soy Esteban, desarrollador Full Stack con años de experiencia construyendo y escalando sistemas empresariales como ERP, facturación electrónica y aplicaciones web a medida.

                    He liderado proyectos de principio a fin (desde la arquitectura y bases de datos hasta el front) ayudando a empresas a optimizar procesos, reducir costos operativos y ganar control sobre su tecnología.

                    Trabajo con tecnologías modernas (Angular, .NET, NestJS, Laravel) y un enfoque claro: software robusto, escalable y 100% propiedad del cliente. 
                  </p>
                  <p className={style.texto_sobre_mi}>
                    Siempre busco aprender nuevas tecnologías y mejorar mis habilidades 
                    para ofrecer soluciones innovadoras y eficientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default LandingPrincipal
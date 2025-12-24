import React, { useEffect, useRef } from 'react'
import style from './landingcta.module.css'
import { perfil_1, fondoLanding } from '../../utils'
import manchado from '../../assets/manchado.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { gsap } from 'gsap'

const LandingCTA = () => {
  const tituloRef = useRef(null);
  const subtituloRef = useRef(null);
  const botonRef = useRef(null);
  const advertenciaRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Timeline principal
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animación del video de fondo
    tl.fromTo(videoRef.current, 
      { opacity: 0, scale: 1.2 },
      { opacity: 0.3, scale: 1, duration: 1.5 }
    )
    // Animación del título (izquierda a derecha)
    .fromTo(tituloRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1 },
      "-=0.5"
    )
    // Animación de los subtítulos
    .fromTo(subtituloRef.current.children,
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.2 },
      "-=0.3"
    )
    // Animación del botón
    .fromTo(botonRef.current,
      { opacity: 0, x: -60, scale: 0.8 },
      { opacity: 1, x: 0, scale: 1, duration: 0.4 },
      "-=0.5"
    )
    // Animación de la advertencia (izquierda a derecha con efecto deslizante)
    .fromTo(advertenciaRef.current,
      { opacity: 0, x: -100, rotationY: -15 },
      { opacity: 1, x: 0, rotationY: 0, duration: 1 },
      "-=0.3"
    );

  }, []);

  return (
    <div className={style.contenedor_landing_cta}>
      <video ref={videoRef} className={style.video_fondo} autoPlay loop muted playsInline>
        <source src={fondoLanding} type="video/mp4" />
      </video>
      
      <div className={style.contenedor_contenido}>
        
        <div className={style.seccion_texto}>
          <h1 ref={tituloRef} className={style.titulo_principal}>
            Deja de pagar software que <span className={style.texto_destacado}>
              <img src={manchado} alt="" className={style.imagen_manchado} />
              no es tuyo
            </span> y no se adapta a tu empresa.
          </h1>
          
          <div>
            <div ref={subtituloRef} className={style.contenedor_subtitulo}>
              <p className={style.subtitulo}>
                Desarrollo sistemas a medida (ERP, facturación, IA y apps web).
              </p>
              <p className={style.subtitulo_enfasis}>
                Código 100% tuyo. Sin licencias mensuales. Sin dependencia.
              </p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button ref={botonRef} className={style.boton_cta}>
                <FontAwesomeIcon icon={faWhatsapp} className={style.icono_whatsapp} />
                <span className={style.texto_boton}>Solicitar diagnóstico</span>
                <span className={style.flecha_boton}>→</span>
              </button>

              <p className={style.texto_pequeño} style={{ marginTop: '1rem' }}>
                Sin compromiso • Respuesta en 24h
              </p>
            </div>
          </div>

          <div ref={advertenciaRef} className={style.contenedor_advertencia}>
            <div className={style.linea_vertical}></div>
            <p className={style.texto_advertencia}>
              "Si tu sistema no es tuyo, tu empresa depende de él."
            </p>
          </div>
        </div>

      </div>

      <div className={style.gradiente}></div>
    </div>
  )
}

export default LandingCTA

import React, { useState, useEffect, useRef } from 'react'
import style from '../Landing/landing.module.css'
import logoEsteban from '../../assets/logo_esteban3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import LandingPrincipal from './LandingPrincipal';
import LandingCTA from './LandingCTA';
import Test from './Test';
import { franjaImg } from '../../utils';
import ProyectosFullstack from '../Proyectos/ProyectosFullstack';
import Experiencia from '../Experiencia/Experiencia';
import { gsap } from 'gsap';

const Landing = () => {
  const navItems = [
    { name: "Proyectos", href: "#proyectos" },
    { name: "Experiencia", href: "#experiencia" }
  ];
  const [showHeader, setShowHeader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1600);
  const headerRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    // Detección de tamaño de pantalla
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1600);
    };

    window.addEventListener('resize', handleResize);
    
    // Animación inicial del header SOLO UNA VEZ
    const initialAnimation = gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power3.out", 
        delay: 0.4,
        // Después de la animación, limpiar los estilos inline para que CSS tome control
        onComplete: () => {
          gsap.set(headerRef.current, { clearProps: "all" });
        }
      }
    );

    const bgBlack = document.querySelector(`.${style.bg_black}`);
    
    const handleScroll = () => {
      const proyectosSection = document.getElementById('proyectos');
      
      if (proyectosSection && bgBlack) {
        const proyectosTop = proyectosSection.offsetTop;
        const scrollPosition = bgBlack.scrollTop;
        
        // Ocultar header cuando llegamos a la sección de proyectos
        if (scrollPosition >= proyectosTop - 100) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
      }
    };

    if (bgBlack) {
      bgBlack.addEventListener('scroll', handleScroll);
      // Llamar una vez al montar para establecer estado inicial
      handleScroll();
    }
    
    return () => {
      if (bgBlack) {
        bgBlack.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={style.bg_black}>
      <header ref={headerRef} className={`${style.header_fixed} ${showHeader ? style.header_visible : style.header_hidden}`}>
        <nav className={style.navbar_container}>
          <div className={style.navbar_logo}>
            <a href="#inicio">
              <img src={logoEsteban} alt="Esteban Yguia" className={style.logo_esteban} />
            </a>
          </div>

          {/* Menú hamburguesa */}
          <button className={style.hamburger_menu} onClick={toggleMenu} aria-label="Menu">
            <span className={`${style.hamburger_line} ${menuOpen ? style.open : ''}`}></span>
            <span className={`${style.hamburger_line} ${menuOpen ? style.open : ''}`}></span>
            <span className={`${style.hamburger_line} ${menuOpen ? style.open : ''}`}></span>
          </button>

          {/* Menú desktop y móvil */}
          <div className={`${style.navbar_menu} ${menuOpen ? style.menu_open : ''}`}>
            <div className={style.navbar_container_links}>
              {navItems.map((item, index) => (
                <a 
                  key={index} 
                  href={item.href}
                  className={style.navbar_links}
                  onClick={closeMenu}
                >
                  {item.name.toUpperCase()}
                </a>
              ))}
            </div>

            <div className={style.navbar_container_links}>
              <a href="#quien-soy" className={style.boton_descargar_cv} onClick={closeMenu}>QUIEN SOY</a>
              <a href="https://www.linkedin.com/in/estebanyguia/" target="_blank" rel="noopener noreferrer" className={style.icono_container}>
                <FontAwesomeIcon className={style.icono} icon={faLinkedin}  />
              </a>

              <a href="" className={style.icono_container}>
                <FontAwesomeIcon className={style.icono} icon={faTiktok}  />
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* <div id="inicio">
        <LandingCTA />
      </div> */}

      <div id="quien-soy" className={style.general_container} data-scroll-section>
        <LandingPrincipal></LandingPrincipal>

        {isDesktop && (
          <div className={style.video_container}>
            <div className={style.franja_scroll}>
              <img src={franjaImg} alt="franja" className={style.imagen_franja} />
              <img src={franjaImg} alt="franja" className={style.imagen_franja} />
            </div>
            <div className={style.gradiente} ></div>
            <div className={style.gradiente_2} ></div>
          </div>
        )}
      </div>

      <div id="proyectos">
        <ProyectosFullstack />
      </div>

      <div id="experiencia">
        <Experiencia />
      </div>
        
    </div>
  )
}

export default Landing
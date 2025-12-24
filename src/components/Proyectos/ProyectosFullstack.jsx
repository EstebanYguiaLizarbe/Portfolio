import React, { useRef, useState, useEffect } from 'react'
import style from './proyectosfullstack.module.css'
import proyecto1 from '../../assets/proyectos/techtrove.jpg'
import proyecto2 from '../../assets/proyectos/paises.jpg'
import proyecto3 from '../../assets/proyectos/examio.jpg'
import proyecto4 from '../../assets/proyectos/puntos_sistema.png'
import proyecto5 from '../../assets/proyectos/factruracion.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import ModalProyecto from './ModalProyecto'

const ProyectosFullstack = () => {
  const proyectos = [
    { 
      imagen: proyecto1, 
      categoria: 'Tiendas Online',
      titulo: 'TechTrove E-Commerce',
      descripcion: 'Plataforma de comercio electrónico completa con sistema de autenticación, carrito de compras, procesamiento de pagos con Stripe, panel de administración para gestión de productos, órdenes y usuarios. Incluye búsqueda avanzada, filtros por categorías y sistema de reseñas.',
      video: 'https://www.youtube.com/embed/uWdIgftpvBI',
      caracteristicas: [
        { icon: '🔐', texto: 'Autenticación JWT' },
        { icon: '💳', texto: 'Pagos con MeradoPago' },
        { icon: '📱', texto: 'Responsive Design' },
        { icon: '⚡', texto: 'Optimizado' }
      ],
      tecnologias: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Redux', 'MercadoPago API', 'JWT', 'Bcrypt'],
      demoUrl: 'https://www.youtube.com/watch?v=16hp7OuyMQ4',
      githubUrl: ''
    },
    { 
      imagen: proyecto2, 
      categoria: 'Landing Pages',
      titulo: 'Countries Explorer',
      descripcion: 'Landing page interactiva para explorar información detallada sobre países del mundo. Incluye datos demográficos, económicos y culturales. Diseño moderno con animaciones suaves y experiencia de usuario optimizada.',
      video: 'https://www.youtube.com/embed/uWdIgftpvBI',
      caracteristicas: [
        // { icon: '🗺️', texto: 'Mapas Interactivos' },
        { icon: '📊', texto: 'Datos de Paises' },
        { icon: '🎨', texto: 'Diseño Moderno' },
        { icon: '🚀', texto: 'Alto Rendimiento' }
      ],
      tecnologias: ['React', 'Redux', 'API REST', 'CSS Modules', 'PostgreSQL', 'Node.js', 'Express', 'Sequelize'],
      demoUrl: '',
      githubUrl: 'https://github.com/EstebanYguiaLizarbe/HenryPiCountries'
    },
    { 
      imagen: proyecto3, 
      categoria: 'Web Apps',
      titulo: 'Dashboard de Ventas e Inventario',
      descripcion: 'Aplicación web para un administrador de sistema de ventas e inventario, que permite llenar automáticamente los datos fiscales y maximizar las ganancias.',
      video: 'https://www.youtube.com/embed/uWdIgftpvBI',
      caracteristicas: [
        { icon: '📝', texto: 'Manejo de Almacen' },
        // { icon: '🤖', texto: 'Calificación Automática' },
        { icon: '📈', texto: 'Análisis Estadístico' },
        { icon: '📄', texto: 'Reportes PDF' }
      ],
      tecnologias: ['Angular', 'PHP', 'Laravel', 'MySQL', 'TypeScript', 'Javascript', 'Laravel'],
      demoUrl: '',
      githubUrl: ''
    },
    { 
      imagen: proyecto4, 
      categoria: 'Web Apps',
      titulo: 'Sistema de Puntos y Recompensas',
      descripcion: 'Aplicación web para gestión de programas de fidelización y recompensas. Permite a las empresas crear sistemas de puntos, definir recompensas, rastrear transacciones y generar reportes de lealtad del cliente.',
      video: 'https://www.youtube.com/embed/uWdIgftpvBI',
      caracteristicas: [
        { icon: '🎁', texto: 'Sistema de Recompensas' },
        { icon: '💰', texto: 'Gestión de Puntos' },
        { icon: '📊', texto: 'Dashboard Analytics' },
        // { icon: '🔔', texto: 'Notificaciones' }
      ],
      tecnologias: ['Angular', 'SQLServer', 'NestJS', 'TypeScript', 'Docker', 'JWT', 'Bcrypt', 'RxJS'],
      demoUrl: '',
      githubUrl: ''
    },
    { 
      imagen: proyecto5, 
      categoria: 'Web Apps',
      titulo: 'Sistema de Facturación',
      descripcion: 'Software de facturación para pequeñas y medianas empresas. Genera facturas, control de inventario y gestión de clientes. Incluye reportes contables y exportación a diferentes formatos.',
      video: 'https://www.youtube.com/embed/uWdIgftpvBI',
      caracteristicas: [
        { icon: '🧾', texto: 'Facturación Electrónica' },
        // { icon: '📦', texto: 'Control de Inventario' },
        { icon: '👥', texto: 'Gestión de Clientes' },
        { icon: '💼', texto: 'Reportes Contables' }
      ],
      tecnologias: ['Angular', 'NestJS', 'Laravel', 'MySQL', 'Prisma', 'TypeScript', 'PHP', 'JWT', 'Bcrypt'],
      demoUrl: '',
      githubUrl: ''
    }
  ];
  
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentFilterIndex, setCurrentFilterIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProyecto, setSelectedProyecto] = useState(null);

  const filtros = ['Todos', 'Landing Pages', 'Web Apps', 'Tiendas Online'];
  
  // Filtrar proyectos según la categoría seleccionada
  const proyectosFiltrados = currentFilterIndex === 0 
    ? proyectos 
    : proyectos.filter(p => p.categoria === filtros[currentFilterIndex]);

  const handleOpenModal = (proyecto) => {
    setSelectedProyecto(proyecto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProyecto(null);
  };

  // Animación automática
  useEffect(() => {
    // Solo animar si hay suficientes proyectos para scroll infinito
    if (proyectosFiltrados.length < 3) return;

    let animationFrameId;
    let position = translateX;

    const animate = () => {
      if (!isDragging && !isPaused) {
        position -= 1; // Velocidad de desplazamiento
        
        // Calcular ancho de un conjunto de imágenes
        const singleSetWidth = (400 + 32) * proyectosFiltrados.length; // 400px imagen + 32px gap (2rem)
        
        // Reset cuando llegue al ancho de un conjunto completo
        if (Math.abs(position) >= singleSetWidth) {
          position = position + singleSetWidth;
        }
        
        setTranslateX(position);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isDragging, isPaused, translateX, proyectosFiltrados.length]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    animationRef.current = translateX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    // Solo permitir arrastre si hay suficientes proyectos
    if (proyectosFiltrados.length < 3) return;
    
    e.preventDefault();
    const currentX = e.clientX;
    const diff = currentX - startX;
    let newTranslate = animationRef.current + diff;
    
    // Calcular ancho de un conjunto de imágenes
    const singleSetWidth = (400 + 32) * proyectosFiltrados.length;
    
    // Loop infinito al arrastrar
    if (Math.abs(newTranslate) >= singleSetWidth) {
      newTranslate = newTranslate % singleSetWidth;
      animationRef.current = newTranslate - diff;
    } else if (newTranslate > 0) {
      // Si arrastra hacia la derecha más allá del inicio
      newTranslate = newTranslate - singleSetWidth;
      animationRef.current = newTranslate - diff;
    }
    
    setTranslateX(newTranslate);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeaveWrapper = () => {
    setIsPaused(false);
  };

  const handlePrevFilter = () => {
    setIsTransitioning(true);
    setTranslateX(0); // Reset position al cambiar filtro
    setTimeout(() => {
      setCurrentFilterIndex((prev) => (prev === 0 ? filtros.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 150);
  };

  const handleNextFilter = () => {
    setIsTransitioning(true);
    setTranslateX(0); // Reset position al cambiar filtro
    setTimeout(() => {
      setCurrentFilterIndex((prev) => (prev === filtros.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className={style.contenedor_proyectos} data-scroll-section>
      <div className={style.contenedor_titulo}>
        <h1 className={style.titulo_proyectos}>Proyectos FullStack</h1>
      </div>

      <div className={`${style.carousel_wrapper} ${isTransitioning ? style.carousel_transitioning : ''}`}>
        <div 
          className={`${style.carousel_track} ${isDragging ? style.dragging : ''} ${proyectosFiltrados.length < 3 ? style.carousel_static : ''}`}
          ref={trackRef}
          style={{
            transform: proyectosFiltrados.length >= 3 ? `translateX(${translateX}px)` : 'none'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={(e) => {
            handleMouseLeave(e);
            handleMouseLeaveWrapper(e);
          }}
        >
          {/* Múltiples copias para efecto infinito perfecto - solo si hay suficientes proyectos */}
          {proyectosFiltrados.length >= 3 ? (
            [...Array(4)].map((_, copyIndex) => (
              proyectosFiltrados.map((proyecto, index) => (
                <div key={`copy-${copyIndex}-${index}`} className={style.proyecto_completo}>
                  <div className={style.imagen_container}>
                    <img src={proyecto.imagen} alt={`Proyecto ${index + 1}`} className={style.proyecto_imagen} />
                    <button 
                      className={style.boton_ver_detalle}
                      onClick={() => handleOpenModal(proyecto)}
                    >
                      Ver detalle
                    </button>
                  </div>
                  <div className={style.botones_container}>
                    {proyecto.demoUrl ? (
                      <a href={proyecto.demoUrl} target="_blank" rel="noopener noreferrer" className={style.boton_demo}>
                        <FontAwesomeIcon icon={faGlobe} className={style.icono_demo} />
                        <span>Demo</span>
                      </a>
                    ) : (
                      <button 
                        className={style.boton_mostrar}
                        onClick={() => handleOpenModal(proyecto)}
                      >
                        <span>Mostrar</span>
                      </button>
                    )}
                    {proyecto.githubUrl && (
                      <a href={proyecto.githubUrl} target="_blank" rel="noopener noreferrer" className={style.boton_github}>
                        <FontAwesomeIcon icon={faGithub} className={style.icono_github} />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              ))
            ))
          ) : (
            proyectosFiltrados.map((proyecto, index) => (
              <div key={index} className={style.proyecto_completo}>
                <div className={style.imagen_container}>
                  <img src={proyecto.imagen} alt={`Proyecto ${index + 1}`} className={style.proyecto_imagen} />
                  <button 
                    className={style.boton_ver_detalle}
                    onClick={() => handleOpenModal(proyecto)}
                  >
                    Ver detalle
                  </button>
                </div>
                <div className={style.botones_container}>
                  {proyecto.demoUrl ? (
                    <a href={proyecto.demoUrl} target="_blank" rel="noopener noreferrer" className={style.boton_demo}>
                      <FontAwesomeIcon icon={faGlobe} className={style.icono_demo} />
                      <span>Demo</span>
                    </a>
                  ) : (
                    <button 
                      className={style.boton_mostrar}
                      onClick={() => handleOpenModal(proyecto)}
                    >
                      <span>Mostrar</span>
                    </button>
                  )}
                  {proyecto.githubUrl && (
                    <a href={proyecto.githubUrl} target="_blank" rel="noopener noreferrer" className={style.boton_github}>
                      <FontAwesomeIcon icon={faGithub} className={style.icono_github} />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={style.contenedor_ver_todos}>
        <button className={style.triangulo_izquierdo} onClick={handlePrevFilter}>
          <div className={style.triangulo_left}>
            <div className={style.triangulo_white_mini}></div>
          </div>
        </button>
        
        <h2 className={`${style.titulo_todos} ${isTransitioning ? style.titulo_transitioning : ''}`}>
          {filtros[currentFilterIndex]}
        </h2>
        
        <button className={style.triangulo_derecho} onClick={handleNextFilter}>
          <div className={style.triangulo_right}>
            <div className={style.triangulo_white_mini}></div>
          </div>
        </button>
      </div>

      <div className={style.contenedor_indicadores}>
        {filtros.map((_, index) => (
          <div 
            key={index}
            className={`${style.indicador} ${currentFilterIndex === index ? style.indicador_activo : ''}`}
            onClick={() => {
              setIsTransitioning(true);
              setTranslateX(0); // Reset position al cambiar filtro
              setTimeout(() => {
                setCurrentFilterIndex(index);
                setIsTransitioning(false);
              }, 150);
            }}
          ></div>
        ))}
      </div>

      {/* Modal */}
      <ModalProyecto 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        proyecto={selectedProyecto}
      />
    </div>
  )
}

export default ProyectosFullstack

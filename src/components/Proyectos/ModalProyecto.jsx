import React, { useEffect } from 'react'
import style from './modalproyecto.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const ModalProyecto = ({ isOpen, onClose, proyecto }) => {
  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Cerrar modal al presionar Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen || !proyecto) return null

  return (
    <div className={style.modal_overlay} onClick={onClose}>
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
        {/* Botón cerrar */}
        <button className={style.boton_cerrar} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Imagen del proyecto */}
        <div className={style.video_container}>
          <img 
            src={proyecto.imagen}
            alt={proyecto.titulo}
            className={style.proyecto_imagen_modal}
          />
        </div>

        {/* Información del proyecto */}
        <div className={style.info_container}>
          <h2 className={style.titulo_proyecto}>{proyecto.titulo}</h2>
          <p className={style.descripcion}>
            {proyecto.descripcion}
          </p>

          {/* Características */}
          <div className={style.caracteristicas}>
            {proyecto.caracteristicas?.map((caract, index) => (
              <div key={index} className={style.caracteristica_item}>
                <span className={style.caracteristica_icon}>{caract.icon}</span>
                <span>{caract.texto}</span>
              </div>
            ))}
          </div>

          {/* Tags de tecnologías */}
          <div className={style.tecnologias_container}>
            <h3 className={style.tecnologias_titulo}>Tecnologías utilizadas</h3>
            <div className={style.tags_container}>
              {proyecto.tecnologias?.map((tech, index) => (
                <span key={index} className={style.tag}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalProyecto

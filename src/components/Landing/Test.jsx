import React from 'react'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Test() {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
  
    useEffect(() => {
      gsap.to(contentRef.current, {
        y: "100%", // Se mueve completamente hacia abajo
        duration: 2, // Velocidad de la animación (ajústala según necesites)
        repeat: -1, // Se repite infinitamente
        ease: "linear", // Movimiento constante sin pausas
      });
    }, []);
  
    return (
      <div
        ref={containerRef}
        style={{
          width: "100px",
          height: "50px", // Tamaño fijo del área visible
          overflow: "hidden", // Oculta lo que sale del contenedor
          position: "relative",
          backgroundColor: "lightgray",
        }}
      >
        <div
          ref={contentRef}
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "-100%", // Comienza desde arriba
            width: "100%",
          }}
        >
          <div style={{ width: "100%", height: "50px", backgroundColor: "royalblue" }} />
          <div style={{ width: "100%", height: "50px", backgroundColor: "royalblue" }} />
        </div>
      </div>
    );
}

export default Test
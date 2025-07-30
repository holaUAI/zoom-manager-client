import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

export const Loading = ({ module }) => {
  const [error, setError] = useState(false);
  const animationRef = useRef(null);
  const errorTimeoutRef = useRef(null);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    // Simular error después de 10 segundos
    errorTimeoutRef.current = setTimeout(() => {
      setError(true);
    }, 10000);

    // Animación de pulsación
    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const phase = Math.floor(elapsed / 500) % 4;
      setPulseIndex(phase);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(errorTimeoutRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '300px',
        backgroundColor: '#f8fafc',
        color: '#ef4444',
        fontSize: '1rem',
        fontWeight: '500',
        textAlign: 'center',
        padding: '20px',
        border: '2px solid #fee2e2',
        borderRadius: '0.5rem',
        marginTop: '1rem'
      }}>
        Estamos teniendo problemas con el servidor, por favor inténtelo nuevamente
      </div>
    );
  }

  // Elementos comunes para ambos casos
  const commonLoadingElements = Array(3).fill(null).map((_, index) => {
    const isPulsing = index === pulseIndex;
    
    return (
      <div 
        key={index}
        style={{
          padding: '1rem',
          border: '1px solid #e2e8f0',
          borderRadius: '0.5rem',
          transition: 'all 200ms',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '0.75rem',
          backgroundColor: isPulsing ? '#f1f5f9' : '#ffffff',
          boxShadow: isPulsing ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        {/* Primera fila - Título y estado */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div style={{
            height: '1.25rem',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.25rem',
            width: '40%',
            animation: isPulsing ? 'pulse 1.5s infinite' : 'none'
          }}></div>
          <div style={{
            height: '1.25rem',
            backgroundColor: '#e2e8f0',
            borderRadius: '9999px',
            width: '20%',
            animation: isPulsing ? 'pulse 1.5s infinite' : 'none'
          }}></div>
        </div>
        
        {/* Segunda fila - Información secundaria */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{
            height: '1rem',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.25rem',
            width: '60%',
            animation: isPulsing ? 'pulse 1.5s infinite' : 'none'
          }}></div>
          <div style={{
            height: '1rem',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.25rem',
            width: '25%',
            animation: isPulsing ? 'pulse 1.5s infinite' : 'none'
          }}></div>
        </div>
        
        {/* Tercera fila - Valoración */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#e2e8f0',
                borderRadius: '2px',
                marginRight: '2px',
                animation: isPulsing ? 'pulse 1.5s infinite' : 'none'
              }}></div>
            ))}
          </div>
          <div style={{
            height: '0.875rem',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.25rem',
            width: '15%',
            animation: isPulsing ? 'pulse 1.5s infinite' : 'none'
          }}></div>
        </div>
      </div>
    );
  });

  return (
    <div style={{ marginTop: '1rem' }}>
      {/* Inyectamos los estilos de animación */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}
      </style>
      
      {commonLoadingElements}
      
      <div style={{
        textAlign: 'center',
        padding: '1rem',
        color: '#64748b',
        fontWeight: '500',
        animation: 'pulse 1.5s infinite'
      }}>
        Cargando {module}...
      </div>
    </div>
  );
};
import React, { useEffect } from 'react';

const Toast = ({ message, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff',
      borderRadius: '5px',
      zIndex: 1000,
    }}>
      {message}
    </div>
  );
};

export default Toast;

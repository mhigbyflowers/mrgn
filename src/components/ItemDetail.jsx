import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ItemDetail() {
  const location = useLocation();
  const { item, fileType } = location.state;

  const isVideo = fileType && fileType.startsWith('video');

  return (
    <div style={{ textAlign: 'center', padding: '1rem', backdround: 'red' }}>
      {isVideo ? (
        <video autoPlay loop style={{ height: '80vh',
            maxHeight: '80vw',
         }}>
          <source src={item.full} type={fileType} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={item.full} alt={item.name} style={{ height: '80vh',
            maxHeight: '80vw' }} />
      )}
      <p style={{fontSize:'1rem'}}>{item.name}</p>
    </div>
  );
}
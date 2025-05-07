import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function ItemDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { collection } = useParams();
  const { item, fileType } = location.state || {};

  useEffect(() => {
    if (!item || !fileType) {
      navigate(`/${collection}`); // Redirect to collection view if state is missing
    }
  }, [item, fileType, navigate, collection]);

  const handleBack = () => {
    navigate(`/${collection}`);
  };

  const isVideo = fileType && fileType.startsWith('video');

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={handleBack}
        style={{
          position: 'absolute',
          left: '1rem',
          right: '1rem',
          color: 'rgb(217, 196, 196',
          border: 'none',
          width: 'fit-content',
          height: '2rem',
          background: 'rgba(0,0,0,0.0)',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        &lt;-back
      </button>
      {item && (
        <>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.name}</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{item.desc}</p>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            {isVideo ? (
              <video autoPlay loop style={{ height: '80vh', maxHeight: '80vw' }}>
                <source src={item.full} type={fileType} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                src={item.full}
                alt={item.name}
                style={{ height: '80vh', maxHeight: '80vw' }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
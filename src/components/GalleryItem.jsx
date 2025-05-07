import React, { useEffect, useState } from 'react';



export default function GalleryItem({ item }) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (item) {
      const imageUrl = item.full.replace('ipfs://', 'https://ipfs.io/ipfs/');
      setImageSrc(imageUrl);
    }
  }, [item]);

  return (
    <div>
      <img
        src={imageSrc}
        alt={item.name}
        style={{ width: '100%', borderRadius: '0px' }}
      />
      <h4>{item.name}</h4>
      <p>{item.desc}</p>
      <a href={item.full} target="_blank" rel="noopener noreferrer">
        View on IPFS
      </a>
    </div>
  );
}
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

async function getFileType(url) {
  try {
    const response = await axios.head(url);
    return response.headers['content-type'];
  } catch (error) {
    console.error('Error fetching file type:', error);
    return null;
  }
}

function replaceSpaces(str) {
  return str.includes(' ') ? str.replace(/ /g, '-') : str;
}

export default function GalleryItem({ item }) {
  const navigate = useNavigate();
  const { collection } = useParams();

  const handleClick = async () => {
    const fileType = await getFileType(item.full);
    const name = replaceSpaces(item.name);
    navigate(`/${collection}/${name}`, { state: { item, fileType } });
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255 ,0.2)",
        height: '17rem',
        fontSize: '0.8em',
      }}
      onClick={handleClick}
    >
      <div
        style={{
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          minHeight: '12rem',
          border: '2px solid black',
          borderRadius: '5px',
        }}
      >
        <img
          src={item.thumbnail}
          alt={item.name}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'opacity 0.3s ease',
          }}
        />
      </div>
      <h4>{item.name}</h4>
      <p>{item.desc}</p>
    </div>
  );
}
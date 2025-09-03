import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function guessFromExtension(url) {
  try {
    const u = new URL(url);
    const pathname = u.pathname || '';
    const lower = pathname.toLowerCase();
    if (lower.endsWith('.mp4')) return 'video/mp4';
    if (lower.endsWith('.webm')) return 'video/webm';
    if (lower.endsWith('.mov')) return 'video/quicktime';
    if (lower.endsWith('.gif')) return 'image/gif';
    if (lower.endsWith('.png')) return 'image/png';
    if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  } catch {}
  return null;
}

async function getFileType(url) {
  try {
    const response = await axios.head(url);
    return response.headers['content-type'];
  } catch (e) {
    // Fallback: infer from extension if HEAD fails (common with some gateways)
    const guessed = guessFromExtension(url);
    if (!guessed) console.debug('Could not determine file type from HEAD or extension');
    return guessed;
  }
}

function replaceSpaces(str) {
  return str.includes(' ') ? str.replace(/ /g, '-') : str;
}

export default function GalleryItem({ item }) {

  const navigate = useNavigate();
  let { collection } = useParams();
  console.log(collection, "collection");
  
  if (collection === undefined || collection === null || collection === 'undefined' || collection === 'null') {
    collection = "hicetnunc";

  }

  
  const handleClick = async () => {
    console.log(collection,"collection");
    const fileType = await getFileType(item.full);
  const name = replaceSpaces(item.name);
  const pathId = item.tokenId ? String(item.tokenId) : name;
  navigate(`/${collection}/${pathId}`, { state: { item, fileType } });
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
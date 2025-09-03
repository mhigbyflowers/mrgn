import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GraphQLClient, gql } from 'graphql-request';

export default function ItemDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { collection, id } = useParams();
  const effectiveCollection = collection ?? "hicetnunc";
  const { item: stateItem, fileType: stateFileType } = location.state || {};
  const [item, setItem] = useState(stateItem || null);
  const [fileType, setFileType] = useState(stateFileType || null);
  const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY || 'https://ipfs.io/ipfs/';
  const endpoint = 'https://data.objkt.com/v3/graphql';

  const TOKEN_QUERY = gql`
    query TokenById($fa: String!, $tokenId: bigint!) {
      token(where: { fa_contract: { _eq: $fa }, token_id: { _eq: $tokenId } }) {
        token_id
        name
        description
        artifact_uri
        display_uri
      }
    }
  `;

  useEffect(() => {
    let cancelled = false;
    if (!stateItem && id && /^[0-9]+$/.test(id)) {
      const client = new GraphQLClient(endpoint);
      client.request(TOKEN_QUERY, { fa: effectiveCollection, tokenId: Number(id) })
        .then((data) => {
          if (cancelled) return;
          const t = data?.token?.[0];
          if (!t) {
            navigate(`/${effectiveCollection}`);
            return;
          }
          const resolved = {
            full: t.artifact_uri?.replace('ipfs://', IPFS_GATEWAY),
            thumbnail: t.display_uri?.replace('ipfs://', IPFS_GATEWAY),
            name: t.name || 'Unknown',
            desc: t.description || 'No description',
            tokenId: t.token_id,
          };
          setItem(resolved);
          // Best-effort fileType: infer from extension
          try {
            const u = new URL(resolved.full);
            const lower = (u.pathname || '').toLowerCase();
            if (lower.endsWith('.mp4')) setFileType('video/mp4');
            else if (lower.endsWith('.webm')) setFileType('video/webm');
            else if (lower.endsWith('.mov')) setFileType('video/quicktime');
            else if (lower.endsWith('.gif')) setFileType('image/gif');
            else if (lower.endsWith('.png')) setFileType('image/png');
            else if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) setFileType('image/jpeg');
          } catch {}
        })
        .catch(() => navigate(`/${effectiveCollection}`));
    } else if (!stateItem || !stateFileType) {
      // If we have a non-numeric id (slug) or missing state, fall back to collection
      navigate(`/${effectiveCollection}`);
    }
    return () => { cancelled = true };
  }, [stateItem, stateFileType, id, effectiveCollection, navigate]);

  const handleBack = () => {
   navigate(-1);
  };

  const isVideo = fileType && fileType.startsWith('video');
  console.log(item, "item");
  
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
          <a href={"https://objkt.com/tokens/" + effectiveCollection + "/" + item.tokenId} target="_blank" rel="noopener noreferrer">Objkt</a>
        </>
      )}
    </div>
  );
}
// src/components/ObjktGallery.jsx
import React, { useEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { useParams } from 'react-router-dom';
import GalleryItem from './GalleryItem';
import { useNavigate } from 'react-router-dom';

const endpoint = 'https://data.objkt.com/v3/graphql';

const GET_COLLECTION = gql`
  query MyCollection($contract: String!) {
    token(
      where: { fa_contract: { _eq: $contract } }
    ) {
      token_id
      display_uri
      artifact_uri
      name
      description
      fa {
        name
      }
    }
  }
`;

export default function ObjktGallery() {
  const navigate = useNavigate();
  const { collection } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const client = new GraphQLClient(endpoint);
    client
      .request(GET_COLLECTION, { contract: collection })
      .then((data) => {
        const cleaned = data.token.map((t) => {
          return {
            full: t.artifact_uri.replace('ipfs://', 'https://ipfs.io/ipfs/'),
            thumbnail: t.display_uri.replace('ipfs://', 'https://ipfs.io/ipfs/'),
            name: t.name || 'Unknown',
            desc: t.description || 'No description',
            collectionName: t.fa?.name || 'Unknown Collection',
          };
        });
        setItems(cleaned);
      })
      .catch(console.error);
  }, [collection]);
  const handleBack = () => {
    navigate("/");
  };
  return (
    
    <div style={{ textAlign: 'center', padding: '1rem' }}>
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
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
       {items[0]?.collectionName}
      </h1>
      <p style={{ fontSize: '.6rem' }}>
        Click on an item to view details
      </p>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(150px,1fr))',
      columnGap: '1rem',
      rowGap: '6rem'
    }}>

      {items.map((nft, index) => (
        <div style={{cursor:'pointer'}} key={index}>
          <GalleryItem item={nft} />
        </div>
      ))}
    </div>
    </div>
  );
}

// src/components/ObjktGallery.jsx
import React, { useEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { GalleryItem } from './GalleryItem';

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
    }
  }
`;

export default function ObjktGallery({ contractAddress }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const client = new GraphQLClient(endpoint);
    client
      .request(GET_COLLECTION, { contract: contractAddress })
      .then((data) => {
        const cleaned = data.token.map((t) => {
          return {
            full: t.artifact_uri.replace('ipfs://', 'https://ipfs.io/ipfs/'),
            thumbnail: t.display_uri.replace('ipfs://', 'https://ipfs.io/ipfs/'),
            name: t.name || 'Unknown',
            desc: t.description || 'No description',
          };
        });
        setItems(cleaned);
      })
      .catch(console.error);
  }, [contractAddress]);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))',
      gap: '1rem'
    }}>
      {items.map((nft, index) => (
        <div key={index}>
          <GalleryItem item={nft} />
        +</div>
      ))}
    </div>
  );
}

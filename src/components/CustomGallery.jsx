import React, { useEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import GalleryItem from './GalleryItem';
import { useNavigate } from 'react-router-dom';
const endpoint = 'https://data.objkt.com/v3/graphql';
const GET_CUSTOM_GALLERY = gql`
  query CustomGallery($fa: String!, $holder: String!) {
    token(
      where: {
        fa_contract: { _eq: $fa },
        holders: { holder_address: { _eq: $holder } }
      }
        order_by: { token_id: desc }
    ) {
      token_id
      name
      display_uri
      artifact_uri
      description
    creators {
        verified
        creator_address
    }
    }
  }
`;

export default function CustomGallery() {
    const [items, setItems] = useState([]);
    const fa = "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton";
    const holder = "tz1YrA1XwPqiVVC7L2hVapAbq2bm9aaGZtKQ";
    const navigate = useNavigate();
    useEffect(() => {
        const client = new GraphQLClient(endpoint);
        client
            .request(GET_CUSTOM_GALLERY, { fa, holder })
            .then((data) => {
                const cleaned = (data.token || []).map((t) => {
                    // Skip NFTs where the creator is the holder
                    if (t.creators && t.creators[0] && t.creators[0].creator_address !== holder) {
                        return null;
                    }
                    let meta = {};
                    if (typeof t.metadata === 'string') {
                        try { meta = JSON.parse(t.metadata); } catch {}
                    } else if (typeof t.metadata === 'object' && t.metadata !== null) {
                        meta = t.metadata;
                    }
                    let full = '';
                    let thumbnail = '';
                    if (t.artifact_uri) {
                        full = t.artifact_uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
                    }
                    if (t.display_uri) {
                        thumbnail =t.display_uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
                    }
                    
                    return {
                        full,
                        thumbnail,
                        name: t.name || meta.name || 'Unknown',
                        desc: t.description || 'No description',
                        collectionName: 'Custom Gallery',
                       
                    };
                }).filter(Boolean); // Remove nulls
                setItems(cleaned);
            })
            .catch(console.error);
    }, []);
    const handleBack = () => {
        navigate(-1);
      };

    return (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
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
            hic et nunc (hen)
            </h1>
            <div style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(4,minmax(150px,1fr))',
               columnGap: '1rem',
               rowGap: '6rem'
            }}>
                {items.map((nft, index) => (
                    <div style={{ cursor: 'pointer' }} key={index}>
                        <GalleryItem item={nft} />
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

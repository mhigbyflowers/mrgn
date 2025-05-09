import React, { useEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import GalleryItem from './GalleryItem';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const endpoint = 'https://data.objkt.com/v3/graphql';

const GET_TOKENS = gql`
  query GalleryTokens($fa: String, $holder: String) {
    token(
      where: {
        fa_contract: { _eq: $fa }
        ${/* Only add holders filter if $holder is provided */''}
        ${/* This will be handled in JS, not in the query string itself */''}
      }
      order_by: { token_id: desc }
    ) {
      token_id
      name
      display_uri
      artifact_uri
      description
      holders {
        holder_address
      }
      creators {
        verified
        creator_address
      }
      fa {
        name
      }
    }
  }
`;

export default function Gallery({ customHolder, customFa, title }) {
  const { collection } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  // Use props for custom gallery, or params for collection gallery
  const fa = customFa || collection;
  const holder = customHolder;

  useEffect(() => {
    const client = new GraphQLClient(endpoint);
    // Build variables and where clause dynamically
    let variables = { fa };
    let where = { fa_contract: { _eq: fa } };
    if (holder) {
      variables.holder = holder;
      where.holders = { holder_address: { _eq: holder } };
    }
    // Build query dynamically for holders filter
    const dynamicQuery = gql`
      query GalleryTokens($fa: String${holder ? ", $holder: String" : ""}) {
        token(
          where: {
            fa_contract: { _eq: $fa }
            ${holder ? "holders: { holder_address: { _eq: $holder } }" : ""}
          }
          order_by: { token_id: desc }
        ) {
          token_id
          name
          display_uri
          artifact_uri
          description
          holders {
            holder_address
          }
          creators {
            verified
            creator_address
          }
          fa {
            name
          }
        }
      }
    `;
    client
      .request(dynamicQuery, variables)
      .then((data) => {
        let tokens = data.token || [];
        // For custom gallery, filter out NFTs where creator is the holder
        if (holder) {
          tokens = tokens.filter(
            t => !(t.creators && t.creators[0] && t.creators[0].creator_address !== holder)
          );
        } else {
          // For collection gallery, filter out NFTs where any holder is the burn address
        //   tokens = tokens.filter(
        //     t => !(t.holders && t.holders.some(h => h.holder_address === "tz1burnburnburnburnburnburnburjAYjjX"))
        //   );
        }
        const cleaned = tokens.map((t) => ({
          full: t.artifact_uri?.replace('ipfs://', 'https://ipfs.io/ipfs/'),
          thumbnail: t.display_uri?.replace('ipfs://', 'https://ipfs.io/ipfs/'),
          name: t.name || 'Unknown',
          desc: t.description || 'No description',
          collectionName: t.fa?.name || title || 'Custom Gallery',
        }));
        setItems(cleaned);
      })
      .catch(console.error);
  }, [fa, holder, title, collection]);

  const handleBack = () => {
    navigate(-1);
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
        {title || items[0]?.collectionName}
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
          <div style={{ cursor: 'pointer' }} key={index}>
            <GalleryItem item={nft} />
          </div>
        ))}
      </div>
    </div>
  );
}

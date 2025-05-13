import React, { useEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import  CustomGallery  from './CustomGallery';

const endpoint = 'https://data.objkt.com/v3/graphql';
const GET_CREATOR_COLLECTIONS = gql`
  query GetCreatorCollections($creator: String!) {
    fa(where: {
      creator_address: { _eq: $creator },
      live: { _eq: true }
    }) {
      contract
      live
      name
      creator_address
    }
  }
`;

export default function ObjktContracts() {
    const [collections, setCollections] = useState([]);
    const creator = "tz1YrA1XwPqiVVC7L2hVapAbq2bm9aaGZtKQ";

    useEffect(() => {
        const client = new GraphQLClient(endpoint);
        client
          .request(GET_CREATOR_COLLECTIONS, { creator })
          .then((data) => {
            setCollections(data.fa || []);
          })
          .catch(console.error);
    }, []);

    return (
        <div style={{ textAlign: 'right', padding: '.5rem' }}>
            <style>
                {`
                .collection-link {
                    color: inherit;
                    // text-decoration: underline;
                    transition: color 0.2s;
                    cursor: pointer;
                }
                .collection-link:hover {
                    color:rgba(136, 139, 189, 0.43);
                }
                `}
            </style>
            <h1 style={{ textAlign:'left',fontSize: '2rem', marginBottom: '1rem', marginTop:'0' }}>Collections</h1>
            <div style={{ margin: '1rem' }}>
                <h1
                    className="collection-link"
                    style={{
                        fontSize: '1.5rem',
                        marginBottom: '1rem',
                    }}
                    onClick={() => window.location.href = `/hicetnunc`}
                >
                    hic et nunc 
                </h1>
            </div>
            {collections.map((collection) => (
                <div key={collection.contract} style={{ margin: '1rem' }}>
                    <h1
                        className="collection-link"
                        style={{
                            fontSize: '1.5rem',
                            marginBottom: '1rem',
                        }}
                        onClick={() => window.location.href = `/${collection.contract}`}
                    >
                        {collection.name}
                    </h1>
                </div>
            ))}
        </div>
    );
}


import React, { useEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';

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

export default function HomePage() {
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
        <div style={{ textAlign: 'center', padding: '1rem' }}>
            {collections.map((collection) => (
                <div key={collection.contract} style={{ margin: '1rem' }}>
                    <h1
                        style={{
                            fontSize: '2rem',
                            marginBottom: '1rem',
                            cursor: 'pointer',
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

// • Education
// • Master’s in creative code Alfred University 2011  
// • Bachelor’s in Media Arts, SAIC 2008

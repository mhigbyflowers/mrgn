import React, { useEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import ObjktContracts from '../components/ObjktContracts';

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


  return (
    <>
      <div style={{ textAlign: 'right', padding: '1rem', border: '1px solid red' }}>
        <ObjktContracts />
      </div>
    </>
  );
}


# mrgn

## Project Overview

**mrgn** is a modern React web application that serves as a dynamic NFT collection browser for the Tezos blockchain. Users can explore curated NFT collections, view detailed information about individual tokens, and seamlessly navigate between collections and items.

## Features

- **Dynamic Routing:** Utilizes React Router v6 for clean, parameterized URLs (e.g., `/KT1.../token-name`), enabling direct linking to collections and specific NFTs.
- **GraphQL Integration:** Fetches live NFT data from the [objkt.com GraphQL API](https://data.objkt.com/v3/graphql), demonstrating advanced use of GraphQL queries and client-side data management.
- **Responsive Gallery:** Displays NFTs in a responsive, grid-based gallery with smooth image transitions and interactive hover effects.
- **Detail Views:** Clicking an NFT opens a detail page, leveraging React Router state and URL parameters for efficient data passing and deep linking.
- **IPFS Media Handling:** Automatically converts IPFS URIs to HTTP gateways for seamless media display.
- **Component Architecture:** Built with reusable, modular React components for maintainability and scalability.
- **Modern UI/UX:** Clean, minimal interface with intuitive navigation and subtle animations for enhanced user experience.

## Technical Achievements

- **Advanced Routing:** Implements nested and dynamic routes using React Router, supporting both collection and item-level navigation.
- **GraphQL Data Fetching:** Integrates `graphql-request` for efficient, type-safe data retrieval from decentralized sources.
- **State Management:** Uses React hooks (`useState`, `useEffect`, `useParams`, `useNavigate`) for stateful logic and navigation.
- **Performance Optimization:** Fetches only necessary data per route, minimizing network usage and improving load times.
- **Error Handling:** Gracefully manages API errors and missing data, ensuring robust user experience.
- **Custom Media Handling:** Detects and adapts to different NFT media types (images, videos, etc.) using HTTP header inspection.

## Usage

1. **Home Page:** Browse a curated list of NFT collections.
2. **Collection View:** Click a collection to view all NFTs within it.
3. **Item Detail:** Click an NFT to see detailed information and media.

---

This project demonstrates proficiency in modern React development, API integration, and blockchain-based data visualization.
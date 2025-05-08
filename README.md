# mrgn

[See the project live](https://mrgn-service-1084776966019.us-central1.run.app/)

## Project Overview & Intent

mrgn is a quick side project that dually serves as an art portfolio and a tech demo. Built on React and deployed via Docker and Google Cloud Run, it showcases stills from my generative video art minted as NFTs on the Tezos blockchain (which I treat as a pseudo-database). Users can browse collections of my work, view detailed token metadata, and experience a seamless gallery interface—all while illustrating modern web and DevOps best practices.

## Features

I implemented:
- **Dynamic Routing** with React Router v6 to create clean URLs for collections and artworks.
- **GraphQL data fetching** using `graphql-request` to pull live NFT information from objkt.com.
- **Responsive gallery layout** that adjusts to any screen size and shows smooth hover and transition effects.
- **Detail view pages** that use React Router state and URL parameters to display token metadata and media.
- **IPFS URI handling** to convert decentralized links into standard HTTP gateways for reliable media loading.
- **Reusable components** structured to make adding new collections or media types straightforward.
- **User-focused UI** with a dark theme and simple animations to highlight the artwork.

## Technical Highlights

- Nested and dynamic routes support both collection-level and token-level navigation.
- Type-safe GraphQL queries with `graphql-request` for efficient data retrieval.
- State and side-effect management via React hooks (`useState`, `useEffect`, `useParams`, `useNavigate`).
- Performance optimizations: fetches only the data needed for each view, reducing load times.
- Robust error handling with fallback UI states for missing or malformed data.
- Media-type detection via HTTP header inspection to adapt rendering (image vs. video).

## DevOps & Deployment

- **Dockerized Builds:** Multi-stage Dockerfile ensures consistent build artifacts and runtime environments.
- **CI/CD Pipeline:** GitHub Actions workflow automatically builds, tags, and pushes Docker images on each push to `main`, then deploys to Google Cloud Run.
- **Static Asset Serving:** Custom Nginx configuration serves the optimized React build for fast, cache-friendly delivery.
- **Cloud Native:** Zero-downtime, auto-scaling deployments on Google Cloud Run handle traffic seamlessly.
- **Configuration Management:** Environment variables and build arguments enable flexible setups for development, staging, and production.
- **Quality Controls:** ESLint and Prettier enforce code consistency and readability throughout the codebase.


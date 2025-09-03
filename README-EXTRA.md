## Configuration

Create a .env file (Vite) from .env.example:

```
cp .env.example .env
```

Available variables (all optional):
- VITE_CREATOR_ADDRESS: Default creator/holder address.
- VITE_HEN_FA: Default HEN FA contract.
- VITE_IPFS_GATEWAY: IPFS gateway base (e.g., https://ipfs.io/ipfs/).

## Deep-linking

Item detail routes now accept numeric token IDs (/:collection/:id). If the page is loaded directly without router state and the id is numeric, the app fetches token details to render the view.

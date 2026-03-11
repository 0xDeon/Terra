# Terra App

A Turborepo-based monorepo for **Terra** — a Bitcoin-native social platform built on the Stacks blockchain.

## Monorepo Structure

```
terra-app/
├── apps/
│   ├── dapp         — React Native (Expo) social dApp
│   └── api          — Fastify Node.js backend API
├── packages/
│   ├── contracts    — Clarity smart contracts (Clarinet toolchain)
│   ├── ui           — Shared React component library (Button, Card)
│   ├── types        — Shared TypeScript type definitions
│   └── config       — Shared tsconfig, ESLint, and Prettier configs
├── turbo.json       — Turborepo pipeline configuration
├── pnpm-workspace.yaml
└── .env.example
```

## Workspaces

| Workspace | Path | Description |
|-----------|------|-------------|
| `@terra/dapp` | `apps/dapp` | Expo React Native social dApp |
| `@terra/api` | `apps/api` | Fastify backend API |
| `@terra/contracts` | `packages/contracts` | Clarity smart contracts |
| `@terra/ui` | `packages/ui` | Shared UI component library |
| `@terra/types` | `packages/types` | Shared TypeScript types |
| `@terra/config` | `packages/config` | Shared configuration |

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9
- Clarinet (for smart contract development)

### Install Dependencies

```bash
pnpm install
```

### Run the Dev Environment

```bash
# Run all apps and packages in dev mode
pnpm dev

# Run a specific app
pnpm --filter @terra/api dev
pnpm --filter @terra/dapp dev
```

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### Test

```bash
pnpm test
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

| Variable | Description |
|----------|-------------|
| `STACKS_NETWORK` | Stacks network (mainnet / testnet) |
| `API_URL` | Backend API URL |
| `DATABASE_URL` | PostgreSQL connection string |
| `TERRA_INTELLIGENCE_API_URL` | Terra Intelligence AI service URL |
| `EXPO_PUBLIC_API_URL` | API URL for the Expo dApp |

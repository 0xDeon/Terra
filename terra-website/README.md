# Terra Website

The marketing website for **Terra** — a Bitcoin-native social platform built on the Stacks blockchain.

Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or pnpm

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

### Build

```bash
npm run build
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_DAPP_URL` | URL to the Terra dApp |
| `NEXT_PUBLIC_API_URL` | URL to the Terra API |

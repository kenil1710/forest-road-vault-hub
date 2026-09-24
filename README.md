# Forest Road Vault — Community Hub

Community-built yield calculator and protocol resource for Forest Road Vault. Not affiliated with Forest Road Asset Management.

**Live site:** https://forest-road-vault-hub.vercel.app

## What it includes

- **Yield calculator**: estimate sUSDfr earnings from the live book's contractual yield and the published fee schedule, with position details, a hold timeline and a fee breakdown
- **Protocol explainer**: USDfr vs. sUSDfr, the five-step flow, continuous accrual, PIK interest and the epoch redemption queue
- **Live transparency data**: backing, reserves, the book, vault state, loss cascade, credit history, redemption queue, protocol revenue and fee schedule
- **Safety & invariants**: test coverage, the nine core invariants, governance roles, review history and accepted residuals
- **Risk breakdown**: credit, liquidity, smart contract, attester, related-party, regulatory, infrastructure and early-stage risk
- **FAQ**

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- Deployed on Vercel

## Data source

All figures come from [forestroadvault.com/transparency](https://forestroadvault.com/transparency) and [forestroadvault.com/docs](https://forestroadvault.com/docs), snapshotted at Ethereum mainnet block **26,047,245** (Sept 24, 2026). They live in [`src/lib/data.ts`](src/lib/data.ts). To refresh the site, update that file.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Disclaimer

This is an independent community tool. It is **not affiliated with Forest Road Asset Management** and is **not financial advice**. The 16.74% figure is the book's contractual yield — what borrowers owe — not a guaranteed sUSDfr return. Yield is variable, and depositing can result in loss of principal. Always verify figures on the official site.

## Links

- Official site: https://forestroadvault.com
- Discord: https://discord.com/invite/swXQWqrAgf
- X: https://x.com/forestroadvault
- GitHub: https://github.com/Forest-Road-Company/forest-road-vault

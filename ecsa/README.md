# EcSa

A digital-products store built with Next.js (App Router), Prisma and PostgreSQL. Customers browse products and get a time-limited download link through a demo checkout (no payment is taken). A password-protected admin area manages products, orders and customers.

## Features

- Product catalogue and a demo checkout: enter an email, no payment is taken, the order is recorded and a download link is shown
- Time-limited download links (24 hours)
- "My orders" page that emails a customer their order history (needs Resend; shows a notice when it is not configured)
- Admin area at `/admin` behind HTTP basic auth: products, orders, customers

## Stack

Next.js 14, React 18, TypeScript, Tailwind CSS with shadcn/ui, Prisma 6 (PostgreSQL via `@prisma/adapter-pg`), Resend and React Email.

## Run locally

```bash
cd ecsa
cp .env.example .env      # fill in the values
npm install
npx prisma migrate deploy
npm run db:seed           # optional: three demo products
npm run dev
```

## Deploy on Vercel

1. Import the repository and set the **Root Directory** to `ecsa`.
2. Add the environment variables from `.env.example`. Use a hosted Postgres database such as Neon.
3. Run `npx prisma migrate deploy` once against that database, then `npm run db:seed` for demo data.
4. Real payments are intentionally not included; checkout is a demo.

## File storage

Uploaded product files and images are stored in Vercel Blob when `BLOB_READ_WRITE_TOKEN` is set (create a Blob store in the Vercel project's Storage tab and connect it; the token is added automatically). Without the token they are written to local disk, which works for local development and Docker but not on Vercel.

Blob URLs are unguessable but public, so this is suitable for a demo; for paid products at scale, serve files through short-lived signed URLs instead. The seeded demo products have no file behind them, so their download link shows the "expired" page.

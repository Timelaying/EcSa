/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Product images uploaded to Vercel Blob are served from this host.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  experimental: {
    // Prisma's client engine loads a .wasm file at runtime that Next's file
    // tracing does not detect, so include it explicitly in serverless bundles.
    outputFileTracingIncludes: {
      "/**": ["./node_modules/.prisma/client/*.wasm"],
    },
  },
};

export default nextConfig;

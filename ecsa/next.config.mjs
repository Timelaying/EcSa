/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Prisma's client engine loads a .wasm file at runtime that Next's file
    // tracing does not detect, so include it explicitly in serverless bundles.
    outputFileTracingIncludes: {
      "/**": ["./node_modules/.prisma/client/*.wasm"],
    },
  },
};

export default nextConfig;

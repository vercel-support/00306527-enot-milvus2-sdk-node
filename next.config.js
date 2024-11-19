/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['@zilliz/milvus2-sdk-node'],
    outputFileTracingIncludes: {
      // When deploying to Vercel, the following configuration is required
      '/api/**/*': ['node_modules/@zilliz/milvus2-sdk-node/**/*'],
    },
  },
}

module.exports = nextConfig

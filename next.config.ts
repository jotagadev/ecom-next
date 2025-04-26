import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["files.stripe.com"],
  },

  /*Ignorando o diretório src/generated/prisma/ do eslint
  Por algum motivo, está causando erro no build */

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Specify config options here
  // output: "export",
  experimental: {
    // @ts-expect-error: 'appDir' is an experimental property and may not be recognized by the current type definitions.
    appDir: true,
  },
};
export default nextConfig;

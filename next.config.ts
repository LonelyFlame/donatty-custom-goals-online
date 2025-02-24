import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    prependData: `
      @import "@/theme/variables.scss";
      @import "@/theme/mixins.scss";
      @import "@/theme/typography.scss";
    `,
    quietDeps: true, // disable warning msg
  },
};

export default nextConfig;

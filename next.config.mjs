/** @type {import('next').NextConfig} */
const nextConfig = {
  // Decap CMS lives in public/admin/index.html; serve it at /admin.
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

export default nextConfig;

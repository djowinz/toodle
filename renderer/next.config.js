/** @type {import('next').NextConfig} */
const { pluginoptions } = require('@mightymeld/runtime');

module.exports = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    return config
  },
  experimental: {
    swcPlugins: [['@mightymeld/runtime/swc-plugin-mightymeld', pluginoptions()]],
  },
}

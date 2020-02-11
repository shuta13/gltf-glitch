const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

module.exports = withSass(withImages({
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|gltf)$/,
      use: [
        "raw-loader"
      ]
    })
    return config
  }
}))
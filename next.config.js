const withSass = require('@zeit/next-sass')

module.exports = withSass({
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
})
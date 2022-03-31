const path = require('path')

module.exports = {
  entry: './src/appThumbnail.mjs',
  target: 'node',
  externals: ['aws-sdk'],
  mode: 'development',
  // mode: "production",
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'appThumbnail.js',
    libraryTarget: 'commonjs2'
  }
}

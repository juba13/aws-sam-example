const path = require('path')

module.exports = {
  entry: './src/appThumbnail.js',
  target: 'node',
  externals: ['aws-sdk','sharp'],
  mode: 'development',
  // mode: "production",
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'appThumbnail.js',
    libraryTarget: 'commonjs2'
  }
}

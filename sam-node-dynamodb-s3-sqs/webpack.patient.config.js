const path = require('path')

module.exports = {
  entry: './src/appPatient.mjs',
  target: 'node',
  externals: ['aws-sdk'],
  mode: 'development',
  // mode: "production",
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'appPatient.js',
    libraryTarget: 'commonjs2'
  }
}

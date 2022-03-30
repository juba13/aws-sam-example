const path = require("path");

module.exports = {
  entry: './src/appS3Signed.mjs',
  target: "node",
  externals: ["aws-sdk"],
  mode: "development",
  // mode: "production",
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "dist"),
    filename: "appS3Signed.js",
    libraryTarget: "commonjs2"
  },
};

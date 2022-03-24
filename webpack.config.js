const path = require("path");

module.exports = {
  entry: './src/app.mjs',
  target: "node",
  externals: ["aws-sdk"],
  // mode: "development",
  mode: "production",
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    libraryTarget: "commonjs2"
  },
};

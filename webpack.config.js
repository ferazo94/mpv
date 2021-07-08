const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./client/src/index.js",
  output: { path: path.resolve(__dirname, "./client/dist"), filename: 'main.js' },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        use: ["style-loader", "css-loader"],
        test: /.(css)$/
      },
    ],
  },
  mode: 'development',
  plugins: [
    new HtmlWebPackPlugin({
      template: "./client/src/index.html",
    }),
  ],
};
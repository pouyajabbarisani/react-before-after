var path = require("path");

module.exports = {
   mode: "production",
   entry: "./src/index.js",
   output: {
      path: path.resolve(),
      filename: "index.js",
      libraryTarget: "commonjs2"
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
         },
         {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
         },
         {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
         }
      ]
   },
   externals: {
      react: "react"
   }
};
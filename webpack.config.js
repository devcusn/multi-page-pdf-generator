const path = require("path");

module.exports = {
  entry: "./src/example/app.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};

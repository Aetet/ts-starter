const path = require('path');

const PATHS = {
  root: path.resolve(__dirname, '..'),
  indexFile: path.resolve(__dirname, '../src/index.tsx'),
  nodeModules: path.resolve(__dirname, '../node_modules'),
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
};

module.exports = PATHS;

const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

const PATHS = require('./paths')
const DEV_SERVER = require('./dev_server_config')

const devWebpackConfig = () => {
  return {
    cache: true,
    devtool: 'eval-source-map',
    devServer: DEV_SERVER,

    context: PATHS.root,

    entry: {
      app: [
        PATHS.indexFile
      ]
    },
    output: {
      path: PATHS.dist,
      filename: '[name].js',
      publicPath: '/'
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      modules: ['node_modules'],
      alias: {
        'src': PATHS.src
      }
    },

    mode: 'development',

    module: {
      rules: [
        // typescript
        {
          test: /\.(ts|tsx)?$/,
          include: PATHS.src,
          use: [{
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: true,
              useTranspileModule: false,
              sourceMap: true
            }
          }]
        },

        // Sourcemap support
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        },

        // json
        {
          test: /\.json$/,
          include: [PATHS.src],
          use: {
            loader: 'json-loader'
          }
        }
      ]
    },

    plugins: [
      new DashboardPlugin(),
      new HtmlWebpackPlugin({
        template: './src/template/index.html',
        injection: `
        <!-- Dependencies -->
        <script src="./node_modules/react/umd/react.development.js"></script>
        <script src="./node_modules/react-dom/umd/react-dom.development.js"></script>

        <script src="http://localhost:35729/livereload.js"></script>
        `
      }),
      new LiveReloadPlugin()
    ],
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  }
}

module.exports = devWebpackConfig

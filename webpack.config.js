const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const appDirectory = fs.realpathSync(process.cwd())

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'
const entry = 'src/app.ts'
const htmlPlugin = !prod
    ? [
          new HtmlWebpackPlugin({
              inject: true,
              template: path.resolve(appDirectory, 'public/index.html'),
          }),
      ]
    : []

module.exports = {
    target: 'web',
    entry: path.resolve(appDirectory, entry), //path to the main .ts file
    output: {
        filename: 'bundle.js', //name for the javascript file that is created/compiled in memory
    },
    resolve: {
        fallback: {
            fs: false,
            path: false,
        },
        extensions: ['.ts', '.js'],
    },
    devServer: {
        host: 'localhost',
        port: 8080, //port that we're using for local host (localhost:8080)
        static: path.resolve(appDirectory, 'public'), //tells webpack to serve from the public folder
        hot: false,
        devMiddleware: {
            publicPath: '/',
        },
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devtool: 'inline-source-map',
    plugins: htmlPlugin,
    mode,
}

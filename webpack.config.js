var webpack = require('webpack');

module.exports = {
    entry: [
        'script!jquery/dist/jquery.min.js',
        'script!foundation-sites/dist/foundation.min.js',
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/dev-server',
        './app/app.jsx'
    ],
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    output: {
        path: __dirname,
        publicPath: "/public/",
        filename: 'bundle.js'
    },
    resolve: {
        root: __dirname,
        alias: {
            Main: 'app/components/Main.jsx',
            applicationStyles: 'app/styles/app.scss',
            Navigation: 'app/components/Navigation.jsx',
            Timer: 'app/components/Timer.jsx',
            Countdown: 'app/components/Countdown.jsx',
            Clock: 'app/components/Clock.jsx',
            CountdownForm: 'app/components/CountdownForm.jsx',
            Controls: 'app/components/Controls.jsx'
        },
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ["react-hot-loader", "babel-loader"],
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map'
};

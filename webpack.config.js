var path = require('path');
var webpack = require('webpack');

module.exports = {
    context : path.join(__dirname, 'lib/js'),
    entry : './main.js',
    module : {
        noParse : [
            path.join(__dirname, 'lib/js/lib/bootstrap.min.js'),
            path.join(__dirname, 'lib/js/lib/jquery.easing.1.3.js'),
            path.join(__dirname, 'lib/js/lib/jquery-2.1.4.min.js')
        ]
    },
    output : {
        filename : 'bundle.js',
        path : path.join(__dirname, 'lib/js')
    },
    plugins : [
        new webpack.ProvidePlugin({
            $ : 'jquery',
            jQuery : 'jquery',
            'window.jQuery' : 'jquery'
        })
    ],
    resolve : {
        alias : {
            jquery : path.join(__dirname, 'lib/js/lib/jquery-2.1.4.min.js')
        }
    }
};

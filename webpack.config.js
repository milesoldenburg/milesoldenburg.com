var path = require('path');

module.exports = {
    context : path.join(__dirname, 'lib'),
    entry : {
        app : ['js/main.js']
    },
    module : {
        noParse : [
            path.join(__dirname, 'lib/js/lib/bootstrap.min.js'),
            path.join(__dirname, 'lib/js/lib/jquery.easing.1.3.js'),
            path.join(__dirname, 'lib/js/lib/jquery-1.11.1.min.js')
        ]
    },
    output : {
        filename : 'bundle.js',
        path : path.join(__dirname, 'dist')
    }
};

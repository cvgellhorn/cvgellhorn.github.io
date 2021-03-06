const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = env => {
    return merge(common(env), {

        mode: 'development',

        devtool: 'eval',
    
        output: {
            pathinfo: true,
            publicPath: '/'
        },
    
        devServer: {
            host: '0.0.0.0'
        }
    
    });
};

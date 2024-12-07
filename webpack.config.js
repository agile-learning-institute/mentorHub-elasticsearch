const path = require('path');

module.exports = {
    entry: './src/configure.ts',  
    output: {
        filename: 'bundle.js',    
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],  
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    target: 'node',  
    mode: 'production', 
};
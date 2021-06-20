// storybook新增less解析的webpack配置
const path = require('path');
module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", {
            loader: 'less-loader',
            options: {
                lessOptions: {
                    javascriptEnabled: true
                },
            }
        }],
        include: path.resolve(__dirname, '../')
    });
    return config;
};

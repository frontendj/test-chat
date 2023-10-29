const path = require('path');

module.exports = function override(config, env) {
    // Add the alias configuration to the Webpack config
    config.resolve.alias = {
        ...config.resolve.alias, // Spread the existing aliases (if any)
        'components': path.resolve(__dirname, 'src/components/'),
        'containers': path.resolve(__dirname, 'src/containers/'),
        'utils': path.resolve(__dirname, 'src/utils/'),
        'styles': path.resolve(__dirname, 'src/styles/')
    };

    return config;
};

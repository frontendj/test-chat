module.exports = function(api) {
    // Cache based on the value of NODE_ENV. This means Babel will only
    // re-evaluate the configuration if NODE_ENV changes.
    api.cache.using(() => process.env.NODE_ENV);

    return {
        // Your Babel configuration here, for example:
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        components: './src/components',
                        utils: './src/utils',
                    },
                },
            ],
        ],
    };
};

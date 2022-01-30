module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    transformIgnorePatterns: ['/node_modules/babylonjs/core'],
    globals: {
        'ts-jest': {
            isolatedModules: true, // to make type check faster
            tsconfig: {
                // to have tsc transform .js files
                allowJs: true,
                checkJs: false,
            },
        },
    },
}

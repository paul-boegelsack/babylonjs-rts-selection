const parserOptions = {
    ecmaVersion: 6,
    sourceType: 'module',
}

const eslintRules = {
    'arrow-body-style': 'warn',
    'arrow-spacing': 'error',
    'eol-last': 'error',
    'func-call-spacing': 'error',
    'no-alert': 'error',
    'no-async-promise-executor': 'error',
    'no-case-declarations': 'error',
    'no-console': ['error', { allow: ['error', 'warn'] }],
    'no-control-regex': 'error',
    'no-dupe-keys': 'error',
    'no-empty': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-semi': 'error',
    'no-fallthrough': 'error',
    'no-import-assign': 'error',
    'no-irregular-whitespace': 'error',
    'no-prototype-builtins': 'error',
    'no-return-await': 'error',
    'no-trailing-spaces': 'error',
    'no-useless-escape': 'error',
    'no-undef': 'error',
    'no-unreachable': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'warn',
    quotes: ['error', 'single'],
    'spaced-comment': 'error',
}

const typescriptEslintRules = {
    '@typescript-eslint/no-empty-function': 'off', // OFF using empty functions for testing
}

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    extends: ['eslint:recommended'],
    overrides: [
        {
            files: ['src/**/*.ts'],
            extends: [
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ...parserOptions,
                project: './tsconfig.json',
                tsconfigRootDir: './',
            },
            plugins: ['@typescript-eslint'],
            rules: {
                ...eslintRules,
                ...typescriptEslintRules,
            },
        },
    ],
}

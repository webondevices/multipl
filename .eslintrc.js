module.exports = {
    extends: [
        'airbnb-typescript',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
    ],
    plugins: ['cup', 'header', 'prettier', 'react-hooks'],
    env: {
        jest: true,
    },
    globals: {
        page: true,
        browser: true,
        context: true,
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'all',
                bracketSpacing: false,
            },
        ],
    },
    overrides: [
        {
            files: ['*.tsx'],
            env: {
                browser: true,
            },
        },
    ],
};

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
        'jsx-a11y/media-has-caption': 'off',
        'no-case-declarations': 'off',
        'react/jsx-curly-newline': 'off',
        'react/prop-types': 'off',
        'react/forbid-prop-types': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-props-no-spreading': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { optionalDependencies: false, devDependencies: true },
        ],
        'import/prefer-default-export': 'off',
        'arrow-body-style': ['error', 'as-needed'],
        'react/jsx-one-expression-per-line': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        'import/no-unresolved': ['error', { ignore: ['csstype'] }],
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
        {
            files: ['*.test.ts', '*.test.tsx'],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
    ],
};

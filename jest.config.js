module.exports = {
    name: 'multipl',
    displayName: 'Multipl',
    bail: true,
    coveragePathIgnorePatterns: ['/node_modules/'],
    rootDir: './',
    collectCoverage: true,
    coverageReporters: ['lcov', 'text-summary'],
    coverageDirectory: '<rootDir>/coverage',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
    ],
    setupFilesAfterEnv: ["<rootDir>/setup-enzyme.ts"],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testRegex: '(.|-)test\\.tsx?$',
    testURL: 'http://localhost/',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};

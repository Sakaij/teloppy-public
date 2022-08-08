module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^~/(.*)$': '<rootDir>/$1'
    },
    testMatch: [
        "**/test/**/*.+(ts|tsx|js)",
    ],
    setupFiles: ["dotenv/config"],
    moduleFileExtensions: [
        'ts',
        'vue',
        'json',
        'js'
    ],
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '.*\\.(vue)$': 'vue-jest',
        '^.+\\.js$': 'babel-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/components/**/*.vue',
        '<rootDir>/pages/**/*.vue'
    ],
    //testURL:"http://192.168.11.99:3000/"
}
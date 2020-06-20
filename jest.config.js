module.exports = {
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "~components/(.*)": ["<rootDir>/components/$1"],
    "^~redux/(.*)$": ["<rootDir>/redux/$1"],
    "~services/(.*)": ["<rootDir>/services/$1"],
    "~utils/(.*)": ["<rootDir>/utils/$1"],
  },
};

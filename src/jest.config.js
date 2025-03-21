module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Handle JSX and JS files with Babel
    },
    transformIgnorePatterns: [
      '/node_modules/(?!your-module-to-transform)',  // Ignore all node_modules except 'your-module-to-transform'
    ],
    testEnvironment: 'jsdom', // Use jsdom for testing React components
    moduleFileExtensions: ['js', 'jsx'],
  };
  
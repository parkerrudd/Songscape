module.exports = {
  extends: 'eslint-config-react-native',
  rules: {
    // Add custom rules here
    "no-use-before-define": ["error", { "variables": false }]
  },
  "settings": {
    "import/ignore": ["react-native"]
  },
};

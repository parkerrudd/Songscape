module.exports = {
  extends: 'eslint-config-react-native',
  rules: {
    // Add custom rules here
    "no-use-before-define": ["error", { "variables": false }],
    'react/jsx-no-bind': 'off',
    "react/prop-types": 0
  },
  "settings": {
    "import/ignore": ["react-native"]
  },
};

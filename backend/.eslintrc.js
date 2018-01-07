// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    node: true
  },
  extends: 'airbnb-base',
  // add your custom rules here
  'rules': {
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'arrow-body-style': 'off',
    // reassigning happens in vuex store
    'no-param-reassign': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'comma-dangle': 'off',
    'quote-props': 'off',
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  'globals': {
    'io': false
  }
}

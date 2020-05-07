module.exports = {
  '**/*.js': [
    'eslint'
  ],
  '**/*.scss': [
    'stylelint --syntax scss --allow-empty-input'
  ]
};

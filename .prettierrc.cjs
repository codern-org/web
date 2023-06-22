/** @type {import('prettier').Config} */
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],

  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  endOfLine: 'lf',
  tabWidth: 2,
  printWidth: 100,

  singleAttributePerLine: true,
};

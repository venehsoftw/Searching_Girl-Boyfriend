module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    ...(process.env.NODE_ENV === 'production' ? {
      'cssnano': {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
      '@fullhuman/postcss-purgecss': {
        content: [
          './src/pages/**/*.{js,jsx,ts,tsx}',
          './src/components/**/*.{js,jsx,ts,tsx}', 
          './src/app/**/*.{js,jsx,ts,tsx}'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ['html', 'body'],
      },
    } : {})
  },
};

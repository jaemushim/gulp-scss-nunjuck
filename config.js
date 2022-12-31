module.exports = {
  config: {
    tailwindjs: './tailwind.config.cjs',
    port: 9050,
  },
  paths: {
    root: './',
    src: {
      base: './src',
      css: './src/css',
      js: './src/js',
      img: './src/assets/images',
      font: './src/assets/fonts',
    },
    dist: {
      base: './dist',
      css: './dist/css',
      js: './dist/js',
      img: './dist/assets/images',
      font: './dist/assets/fonts',
    },
    build: {
      base: './build',
      css: './build/css',
      js: './build/js',
      img: './build/assets/images',
      font: './build/assets/fonts',
    },
  },
};

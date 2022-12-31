/* eslint-disable import/no-import-module-exports */

import {
  src, dest, watch, series, parallel,
} from 'gulp';
import nunjucksRender from 'gulp-nunjucks-render';
import del from 'del'; // For Cleaning build/dist for fresh export
import browserSync from 'browser-sync';
import data from 'gulp-data';
import postcss from 'gulp-postcss'; // For Compiling tailwind utilities with tailwind config
import concat from 'gulp-concat-util'; // For Concatinating js,css files
import uglify from 'gulp-terser'; // To Minify JS files
import imagemin from 'gulp-imagemin'; // To Optimize Images
import cleanCSS from 'gulp-clean-css'; // To Minify CSS files
import purgecss from 'gulp-purgecss'; // Remove Unused CSS from Styles
import autoprefixer from 'gulp-autoprefixer';
import prettier from 'gulp-prettier';
// Note : Webp still not supported in major browsers including forefox
// import webp from 'gulp-webp'; //For converting images to WebP format
// import replace from 'gulp-replace'; //For Replacing img formats to webp in html
import logSymbols from 'log-symbols'; // For Symbolic Console logs :) :P
import babel from 'gulp-babel';
import tailwindcss from 'tailwindcss';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import merge from 'merge-stream';
import menu from './menu.json';
import options from './config';

// paths and other options from config.js
const sass = gulpSass(dartSass);

function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: options.paths.dist.base,
    },
    port: options.config.port || 5000,
  });
  done();
}

// Triggers Browser reload
function previewReload(done) {
  console.log(`\n\t${logSymbols.info}`, 'Reloading Browser Preview.\n');
  browserSync.reload();
  done();
}

// Development Tasks
function devHTML() {
  return src([`${options.paths.src.base}/html/pages/*`, `${options.paths.src.base}/html/*.html`])
    .pipe(data(() => menu))
    .pipe(
      nunjucksRender({
        path: ['src/html'],
        data: menu,
      }),
    )
    .pipe(prettier({ singleQuote: true }))
    .pipe(dest(options.paths.dist.base));
}

function favicon() {
  return src('./favicon.ico').pipe(dest(options.paths.dist.base));
}

function devStyles() {
  const first = src([`${options.paths.src.css}/**/*.scss`, `!${options.paths.src.css}/libs/*.{css,scss}`])
    .pipe(sass().on('error', sass.logError))
    // .pipe(dest(options.paths.src.css)) // if you want *.css in src/css folder
    .pipe(
      postcss([
        tailwindcss(options.config.tailwindjs),
        // eslint-disable-next-line global-require
        require('autoprefixer'),
      ]),
    )
    .pipe(concat({ path: 'style.css' }))
    .pipe(
      autoprefixer({
        Browserslist: ['last 99 versions'],
        cascade: false,
      }),
    )
    .pipe(dest(options.paths.dist.css));

  const second = src(`${options.paths.src.css}/libs/**/*.{css,scss}`).pipe(dest(`${options.paths.dist.css}/libs`));
  return merge(first, second);
}

function devScripts() {
  const first = src([`${options.paths.src.js}/utilities/*.js`, `${options.paths.src.js}/**/*.js`, `!${options.paths.src.js}/libs/**/*.js`])
    .pipe(babel())
    .pipe(concat({ path: 'scripts.js' }))
    .pipe(concat.header('$(window).on("load", () => {'))
    .pipe(concat.footer('\n});\n'))
    .pipe(dest(options.paths.dist.js));

  const second = src(`${options.paths.src.js}/libs/**/*.js`).pipe(dest(`${options.paths.dist.js}/libs`));

  return merge(first, second);
}

function devImages() {
  return src(`${options.paths.src.img}/**/*`).pipe(dest(options.paths.dist.img));
}

function devFonts() {
  return src(`${options.paths.src.font}/**/*`).pipe(dest(options.paths.dist.font));
}

function watchFiles() {
  watch(`${options.paths.src.base}/**/*.html`, series(devHTML, devStyles, previewReload));

  watch([options.config.tailwindjs, `${options.paths.src.css}/**/*.scss`], series(devStyles, previewReload));
  watch(`${options.paths.src.js}/**/*.js`, series(devScripts, previewReload));
  watch(`${options.paths.src.img}/**/*`, series(devImages, previewReload));
  console.log(`\n\t${logSymbols.info}`, 'Watching for Changes..\n');
}

function devClean() {
  console.log(`\n\t${logSymbols.info}`, 'Cleaning dist folder for fresh start.\n');
  return del([options.paths.dist.base]);
}

// Production Tasks (Optimized Build for Live/Production Sites)
function prodHTML() {
  return src([`${options.paths.src.base}/html/pages/*`, `${options.paths.src.base}/html/*.html`])
    .pipe(data(() => menu))
    .pipe(
      nunjucksRender({
        path: ['src/html'],
        data: menu,
      }),
    )
    .pipe(prettier({ singleQuote: true }))
    .pipe(dest(options.paths.build.base));
}

function prodStyles() {
  return src(`${options.paths.dist.css}/**/*`)
    .pipe(
      purgecss({
        content: ['src/**/*.{html,js}'],
        defaultExtractor: (content) => {
          const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
          const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
          return broadMatches.concat(innerMatches);
        },
      }),
    )
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest(options.paths.build.css));
}

function prodScripts() {
  const first = src([`${options.paths.src.js}/**/*.js`, `!${options.paths.src.js}/libs/**/*.js`])
    .pipe(babel())
    .pipe(concat({ path: 'scripts.js' }))
    .pipe(uglify())
    .pipe(dest(options.paths.build.js));

  const second = src(`${options.paths.src.js}/libs/**/*.js`).pipe(dest(`${options.paths.build.js}/libs`));

  return merge(first, second);
}

function prodImages() {
  return src(`${options.paths.src.img}/**/*`).pipe(imagemin()).pipe(dest(options.paths.build.img));
}

function prodFonts() {
  return src(`${options.paths.src.font}/**/*`).pipe(dest(options.paths.build.img));
}

function prodClean() {
  console.log(`\n\t${logSymbols.info}`, 'Cleaning build folder for fresh start.\n');
  return del([options.paths.build.base]);
}

function buildFinish(done) {
  console.log(`\n\t${logSymbols.info}`, `Production build is complete. Files are located at ${options.paths.build.base}\n`);
  done();
}

exports.default = series(
  devClean, // Clean Dist Folder
  parallel(devStyles, devScripts, devImages, devFonts, devHTML, favicon),
  livePreview, // Live Preview Build
  watchFiles, // Watch for Live Changes
);

exports.prod = series(
  prodClean, // Clean Build Folder
  parallel(prodStyles, prodScripts, prodImages, prodFonts, prodHTML, favicon),
  buildFinish,
);

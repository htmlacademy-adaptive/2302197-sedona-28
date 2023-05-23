import gulp from 'gulp'
const {src} = gulp;
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import { rename } from 'fs';
import { Stack } from 'immutable';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

//Scripts
const scripts = () => {
  return gulp.src('source/js/script.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'));
}

//Images
const images = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
}

//WebP
const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh{webp:{}})
  .pipe(gulp.dest('build/img'))
}

//SVG
const svg = () => {
  gulp.src('source/img/*.svg')
  .pipe (svgo())
  .pipe (gulp.dest('build/img'))
}

const stack = () => {
  return gulp.src('source/img/*.svg')
  .pipe (svgo())
  .pipe (svgstore ({inlineSvg:true
  }))
  .pipe (rename('stack.svg'))
  .pipe (gulp.dest('build/img'));
}

//Copy
const copy = done => {
  gulp.src ([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
  ],{
    base: 'source'
  })
  .pipe(gulp.dest('build'));
}

//Clean
const clean =() => {
  return del ('build');
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    browser: 'Google chrome'
  });
  done();
}

//Reload
const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(scripts));
  gulp.watch('source/*.html').on('change', browser.reload);

}

//Build
export const build = gulp.series (
  clean,
  copy,
  optimizeImages,
  gulp parallel (
    styles,
    html,
    scripts,
    svg,
    stack,
    createWebp
  ),
);

//default
export default gulp.series (
  clean,
  copy,
  copyImages,
  gulp parallel (
    styles,
    html,
    scripts,
    svg,
    stack,
    createWebp
  ),
  gulp.series (
    server,
    watcher
  )
);

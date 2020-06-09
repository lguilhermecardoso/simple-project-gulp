// Adiciona os import dos modulos instalados via NPM
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// funcção para compilar sass e pref
function complilaSass() {

  return gulp.src('styles/scss/*.scss')
             .pipe(sass({outputStyle: 'compressed'}))
             .pipe(autoprefixer({
               browsers: ['last 2 versions'],
               cascade: false
             }))
             .pipe(gulp.dest('styles/css/'))
             .pipe(browserSync.stream())
}

// tarefa do gulp para a função de SASS
gulp.task('sass', complilaSass);

// função para juntar JS
function gulpJS() {
  return gulp.src('js/main/*.js')
            .pipe(concat('main.js'))
            .pipe(babel({
              presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest('js/'))
            .pipe(browserSync.stream())
}


//tarefa concat js
gulp.task('mainjs', gulpJS);

// JS Plugin

function pluginJs() {
  return gulp
          .src([
            'node_modules/jquery/dist/jquery.min.js'
          ])
          .pipe(concat('plugins.js'))
          .pipe(gulp.dest('js/'))
          .pipe(browserSync.stream())
}

gulp.task('pluginjs', pluginJs )

function browser() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
}

// Funçao para iniciar browser sync
gulp.task('browser-sync', browser);

// tarefa de watch de gulp
function watch() {
  gulp.watch('styles/scss/*.scss', complilaSass )
  gulp.watch('js/main/*.js', gulpJS);
  gulp.watch(['*.html']).on('change', browserSync.reload);
}

// incia a tarefa de watch
gulp.task('watch', watch);

// tarefa default gulp que inicia o watch e o browser sync
gulp.task('default', gulp.parallel(
  'watch',
  'browser-sync',
  'mainjs',
  'sass',
  'mainjs',
  'pluginjs'
  ));
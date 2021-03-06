const gulp = require('gulp'),
      handlebars = require('gulp-compile-handlebars'),
      rename = require('gulp-rename'),
      yaml = require('js-yaml'),
      fs   = require('fs');

const dataExt = '.yaml';
const dataDir = './data';

const data = {
  developer: Object.assign({}, ...[
      'data',
      'employment',
      'open-source',
      'personal-details',
      'academics',
      'summary'
    ].map((file) => {
      const fileName = `${dataDir}/developer/${file}${dataExt}`;
      return yaml.safeLoad(fs.readFileSync(fileName, 'utf8'));
    })
  ),
  manager: Object.assign({}, ...[
      'data',
      'employment',
      'personal-details',
      'academics',
      'open-source',
      'summary'
    ].map((file) => {
      const fileName = `${dataDir}/manager/${file}${dataExt}`;
      return yaml.safeLoad(fs.readFileSync(fileName, 'utf8'));
    })
  ),
};

gulp.task('developer', () => {
  gulp.src('templates/developer.hbs')
    .pipe(handlebars(data.developer, {
      helpers: require('./templates/helpers.js'),
      batch: ['./templates'],
      compile: { noEscape: true }
    }))
    .pipe(rename('developer.html'))
    .pipe(gulp.dest('./'))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'))
});

gulp.task('manager', () => {
  gulp.src('templates/manager.hbs')
    .pipe(handlebars(data.manager, {
      helpers: require('./templates/helpers.js'),
      batch: ['./templates'],
      compile: { noEscape: true }
    }))
    .pipe(rename('manager.html'))
    .pipe(gulp.dest('./'))
});

gulp.task('default', ['developer']);

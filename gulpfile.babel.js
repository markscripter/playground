/*
  Imports
*************************/
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import combiner from 'stream-combiner2';
import concat from 'gulp-concat';
import cssMinify from 'gulp-minify-css';
import eslint from 'gulp-eslint';
import glob from 'glob';
import gulp from 'gulp';
import jsdoc from 'gulp-jsdoc';
import path from 'path';
import prefix from 'gulp-autoprefixer';
import R from 'ramda';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import templates  from './helpers/gulp-vash';
import uglify from 'gulp-uglify';
import webpack from 'webpack';
import wrapper from 'gulp-wrapper';

const PATHS = require('./config.json').paths;

function pageData(root, comps) {
  const data = require(root);
  const compData = glob.sync(comps, {});
  const tempData = {};

  compData.forEach(function cb(page) {
    R.merge(tempData, require(page));
  });

  // since require will cache the origin items returned from the require(root) call,
  // we need to delete the cache so it fetches any updated data from the json file
  delete require.cache[require.resolve(root)];

  return R.merge(tempData, data);
}

gulp.task('build', ['styles', 'styleguide', 'javascript', 'assets', 'fonts', 'svg', 'templates']);
gulp.task('serve', ['build', 'watch', 'server']);
gulp.task('javascript', ['js-global', 'js-libraries', 'js-maps']);

gulp.task('templates', () => {
  // get glob of pages
  glob(path.join(__dirname, PATHS.templates), {}, (err, pages) => {
    if (err) {
      return;
    }

    // for each page
    pages.forEach((page) => {
      const data = require(path.join(__dirname, PATHS.data));
      gulp.src(page, {cwd: path.join(__dirname, 'src')})
        .pipe(templates({
          locals: data,
        }))
        .pipe(gulp.dest(path.join(__dirname, PATHS.public)));
    });
  });

  return;
});

gulp.task('styles', () => {
  const globalCSS = PATHS.cssLibraries.map((filePath) => {
    return path.join(__dirname, filePath);
  });

  return gulp.src([
    ...globalCSS,
    path.join(__dirname, PATHS.components, '**/*.scss'),
    path.join(__dirname, PATHS.styles, 'main.scss'),
  ])
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: [path.join(__dirname, PATHS.styles)],
  }))
  .pipe(concat('stylesheet.css'))
  .pipe(prefix({
    browsers: ['last 4 versions'],
    cascade: 'false',
  }))
  .pipe(cssMinify())
  .pipe(rename('stylesheet.css'))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest(path.join(__dirname, PATHS.public, 'css/')));
});

gulp.task('styleguide', () => {
  return combiner.obj([
    gulp.src(path.join(__dirname, PATHS.styleguide.pages))
      .pipe(templates({
        locals: {},
      }))
      .pipe(gulp.dest(path.join(__dirname, PATHS.public))),
    gulp.src(path.join(__dirname, PATHS.styleguide.styles))
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write())
      .pipe(rename('styleguide.css'))
      .pipe(gulp.dest(path.join(__dirname, PATHS.public, 'css'))),
  ]);
});

gulp.task('js-global', () => {
  const combined = combiner.obj([
    gulp.src([
      path.join(__dirname, PATHS.javascript, '*.js'),
    ]),
    eslint(),
    babel(),
    wrapper({
      header: '\n/* \n ${filename} \n */ \n',
      footer: '\n/* \n END ${filename} \n */ \n',
    }),
    sourcemaps.init(),
    concat('main.js'),
    gulp.dest(path.join(__dirname, PATHS.public, 'js/')),
    uglify({
      mangle: false,
      compress: true,
    }),
    rename('main.min.js'),
    gulp.dest(path.join(__dirname, PATHS.public, 'js/')),
  ]);

  return combined;
});

gulp.task('js-libraries', () => {
  const libs = PATHS.jsLibraries.map((filePath) => {
    return path.join(__dirname, filePath);
  });

  return combiner.obj([
    gulp.src(libs),
    eslint(),
    wrapper({
      header: '\n/* \n ${filename} \n */ \n',
      footer: '\n/* \n END ${filename} \n */ \n',
    }),
    concat('libs.min.js'),
    gulp.dest(path.join(__dirname, PATHS.public, 'js/')),
  ]);
});

gulp.task('js-jsdoc', () => {
  return gulp.src(path.join(__dirname, PATHS.components, '**/*.js'))
    .pipe(jsdoc(path.join(__dirname, PATHS.public, 'jsdocs/')));
});

gulp.task('js-maps', () => {
  const maps = PATHS.jsMaps.map((filePath) => {
    return path.join(__dirname, filePath);
  });

  return gulp.src(maps)
    .pipe(gulp.dest(path.join(__dirname, PATHS.public, 'js')));
});

gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: 'public',
    },
  });
});

gulp.task('svg', () => {
  return gulp.src(path.join(__dirname, PATHS.svg, '**.svg'))
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(gulp.dest(path.join(__dirname, PATHS.public, 'svg/')))
    .pipe(rename('svg.min.jade'))
    .pipe(gulp.dest(path.join(__dirname, PATHS.svg)));
});

gulp.task('assets', () => {
  return gulp.src(path.join(__dirname, PATHS.assets, '**.*'))
    .pipe(gulp.dest(path.join(__dirname, PATHS.public, 'assets/')));
});

gulp.task('fonts', () => {
  return gulp.src(path.join(__dirname, PATHS.fonts))
    .pipe(gulp.dest(path.join(__dirname, PATHS.public, 'css/fonts/')));
});

gulp.task('watch', () => {
  gulp.watch([
    path.join(__dirname, PATHS.assets),
  ], ['assets']).on('change', browserSync.reload);
  gulp.watch([
    path.join(__dirname, PATHS.styles, '**.less'),
    path.join(__dirname, PATHS.styles, '**/**.less'),
    path.join(__dirname, PATHS.components, '**/less/**.less'),
  ], ['styles', 'styleguide']).on('change', browserSync.reload);
  gulp.watch([
    path.join(__dirname, PATHS.pages),
    path.join(__dirname, '/pages/**/*.jade'),
    path.join(__dirname, PATHS.components, '/**/markup/**.jade'),
    path.join(__dirname, PATHS.partials),
    path.join(__dirname, PATHS.componentsData),
    path.join(__dirname, PATHS.data),
  ], ['jade']).on('change', browserSync.reload);
  gulp.watch([
    path.join(__dirname, PATHS.styleguide.styles),
    path.join(__dirname, PATHS.styleguide.pages),
  ], ['styleguide']).on('change', browserSync.reload);
  gulp.watch([
    path.join(__dirname, PATHS.javascript, '*.js'),
    path.join(__dirname, PATHS.components, '**/javascript/*.js'),
  ], ['javascript']).on('change', browserSync.reload);
  gulp.watch([
    path.join(__dirname, PATHS.svg, '*.svg'),
  ], ['svg', 'jade']).on('change', browserSync.reload);
});

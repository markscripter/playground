import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import combiner from 'stream-combiner2';
import concat from 'gulp-concat';
import cssMinify from 'gulp-minify-css';
import eslint from 'gulp-eslint';
import glob from 'glob';
import gulp from 'gulp';
import esdoc from 'gulp-esdoc';
import path from 'path';
import prefix from 'gulp-autoprefixer';
import R from 'ramda';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sassdoc from 'sassdoc';
import sourcemaps from 'gulp-sourcemaps';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import templates  from './helpers/gulp-vash';
import uglify from 'gulp-uglify';
import webpack from 'gulp-webpack';
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

gulp.task('default', ['build', 'watch', 'server']);
gulp.task('build', ['styles', 'styleguide', 'javascript', 'assets', 'fonts', 'templates']);
gulp.task('javascript', ['js-global', 'js-libraries', 'js-maps', 'js-jsdoc']);
gulp.task('styleguide', ['styleguide-styles', 'styleguide-markup', 'styles-documentation']);

gulp.task('templates', ['svg'], () => {
  // get glob of pages
  glob(path.join(__dirname, PATHS.templates), {}, (err, pages) => {
    if (err) return;

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

  return gulp.src(path.join(__dirname, PATHS.index))
    .pipe(templates())
    .pipe(gulp.dest(path.join(__dirname, PATHS.public)));
});

gulp.task('styles', () => {
  const globalCSS = PATHS.cssLibraries.map((filePath) => {
    return path.join(__dirname, filePath);
  });
  return gulp.src([
    ...globalCSS,
    path.join(__dirname, PATHS.styles, 'main.scss'),
    path.join(__dirname, PATHS.components, '**/*.scss'),
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('stylesheet.scss'))
    .pipe(sass({
      includePaths: [path.join(__dirname, PATHS.styles)],
    }))
    .pipe(prefix({
      browsers: ['last 4 versions'],
      cascade: 'false',
    }))
    .pipe(cssMinify())
    .pipe(rename('stylesheet.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(path.join(__dirname, PATHS.public, 'css/')));
});

gulp.task('styles-documentation', () => {
  gulp.src([
    path.join(__dirname, PATHS.styles, 'global/**.scss'),
    path.join(__dirname, PATHS.components, '**/*.scss'),
    path.join(__dirname, PATHS.styles, 'global/**/*.scss'),
  ])
    .pipe(sassdoc());
});

gulp.task('styleguide-styles', ['svg'], () => {
  return gulp.src(path.join(__dirname, PATHS.styleguide.styles))
    .pipe(sass({
      includePaths: [path.join(__dirname, PATHS.styles)],
    }))
    .pipe(rename('styleguide.css'))
    .pipe(gulp.dest(path.join(__dirname, PATHS.public, 'css/')));
});

gulp.task('styleguide-markup', ['svg'], () => {
  const styleguideItems = PATHS.styleguide.templates.map((filePath) => {
    return path.join(__dirname, filePath);
  });

  const data = require(path.join(__dirname, PATHS.styleguide.data));

  return gulp.src(styleguideItems)
    .pipe(templates({
      locals: data,
    }))
    .pipe(gulp.dest(path.join(__dirname, PATHS.public, 'styleguide/')));
});

gulp.task('js-global', () => {
  const combined = combiner.obj([
    gulp.src([
      path.join(__dirname, PATHS.javascript, 'main.js'),
    ]),
    webpack(require('./webpack.config.js')),
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
  return gulp.src([
    path.join(__dirname, PATHS.javascript),
  ])
    .pipe(esdoc({
      excludes: [
        '_tests.js',
        'bundle.js',
      ],
      destination: path.join(__dirname, PATHS.public, 'jsdocs/'),
      scripts: [
        path.join(__dirname, 'src/components/accordion/index.js'),
        path.join(__dirname, 'src/components/carousel/index.js'),
        path.join(__dirname, 'src/components/modal/index.js'),
      ],
    }));
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
    .pipe(rename('svg.min.vash'))
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
  ], ['assets'], () => {
    browserSync.reload;
  });

  gulp.watch([
    path.join(__dirname, PATHS.styles, '**.scss'),
    path.join(__dirname, PATHS.styles, '**/**.scss'),
    path.join(__dirname, PATHS.components, '**/**.scss'),
  ], ['styles', 'styleguide', 'styles-documentation'], () => browserSync.reload);

  gulp.watch([
    path.join(__dirname, PATHS.templates),
    path.join(__dirname, '/pages/**/*.vash'),
    path.join(__dirname, PATHS.components, '/**/markup/**.vash'),
    path.join(__dirname, PATHS.componentsData),
    path.join(__dirname, PATHS.data),
  ], ['templates'], () => browserSync.reload);

  gulp.watch(
    R.append(path.join(__dirname, PATHS.styleguide.styles),
    R.map((fp) => {
      return path.join(__dirname, fp);
    }, PATHS.styleguide.templates)),
  ['styleguide'], () => browserSync.reload);

  gulp.watch([
    path.join(__dirname, PATHS.javascript, '*.js'),
    path.join(__dirname, PATHS.components, '**/javascript/*.js'),
  ], ['javascript'], () => browserSync.reload);

  gulp.watch([
    path.join(__dirname, PATHS.svg, '*.svg'),
  ], ['templates'], () => browserSync.reload);
});

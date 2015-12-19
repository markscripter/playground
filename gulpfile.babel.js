import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import callbackSequence from 'callback-sequence';
import clean from 'gulp-clean';
import combiner from 'stream-combiner2';
import concat from 'gulp-concat';
import cssnext from 'gulp-cssnext';
import cssMinify from 'gulp-minify-css';
import documentation from 'gulp-documentation';
import eslint from 'gulp-eslint';
import glob from 'glob';
import gulp from 'gulp';
const  isparta = require('isparta');
import istanbul from 'gulp-istanbul';
import kss from 'gulp-kss-jade';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import reporter from 'postcss-reporter';
import sourcemaps from 'gulp-sourcemaps';
import stylelint from 'stylelint';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import tape from 'gulp-tape';
import templates  from 'gulp-jade';
import uglify from 'gulp-uglify';
import wrapper from 'gulp-wrapper';
import webpack from 'gulp-webpack';

const { paths: PATHS } = require('./config.json');
const { rules: CSS_RULES } = require('./stylelint.config.js');

const test = () => {
  return gulp.src(PATHS.javascript + '/tests/index.js')
    .pipe(tape());
};

const instrument = () => {
  return gulp.src([
    PATHS.javascript + '/app/**/*.js',
    PATHS.javascript + '/app/*.js',
  ])
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: isparta.Instrumenter,
    }))
    .pipe(istanbul.hookRequire({}));
};

const report = () => {
  return gulp.src(PATHS.javascript + '/tests/index.js')
    .pipe(istanbul.writeReports({
      reporters: ['lcov', 'text'],
      reportOpts: { dir: PATHS.public + 'coverage/' },
    }));
};

gulp.task('default', ['build', 'documentation', 'test', 'serve']);

gulp.task('build', ['javascript', 'assets', 'templates', 'style']);
gulp.task('test', ['js-test']);
gulp.task('documentation', ['js-docs', 'styles-documentation']);

gulp.task('javascript', ['js-global']);
gulp.task('style', ['styles', 'styleguide-styles']);
gulp.task('templates', ['jade-templates', 'jade-index']);

gulp.task('assets', ['svg'], () => {
  return gulp.src(PATHS.assets + '**')
    .pipe(gulp.dest(PATHS.public + 'assets/'));
});

gulp.task('clean', () => {
  return gulp.src(PATHS.public, {read: false})
    .pipe(clean({
      force: true,
    }));
});

gulp.task('jade-templates', () => {
  return glob(PATHS.templates, {}, (err, pages) => {
    if (err) return;

    pages.forEach((page) => {
      gulp.src(page)
        .pipe(templates({
          locals: require('./' + PATHS.data),
          pretty: true,
        }))
        .pipe(gulp.dest(PATHS.public));
    });
  });
});

gulp.task('jade-index', () => {
  return gulp.src(PATHS.index)
    .pipe(templates({
      pretty: true,
    }))
    .pipe(gulp.dest(PATHS.public));
});

gulp.task('js-docs', () => {
  const jspages = glob(PATHS.javascript + 'app/**/*.js', (err, pages) => err ? [] : pages);

  return gulp.src([
    PATHS.javascript + 'main.js',
    ...jspages,
  ])
    // .pipe(documentation({format: 'html'}))
    .pipe(gulp.dest(PATHS.public + 'jsdocs/'));
});

gulp.task('js-global', () => {
  return combiner.obj([
    gulp.src(PATHS.javascript + 'main.js'),
    webpack(require('./webpack.config.js')),
    eslint(),
    babel(),
    wrapper({
      header: '\n/* \n ${filename} \n */ \n',
      footer: '\n/* \n END ${filename} \n */ \n',
    }),
    sourcemaps.init(),
    concat('main.js'),
    gulp.dest(PATHS.public + 'js/'),
    uglify({
      mangle: false,
      compress: true,
    }),
    rename('main.min.js'),
    gulp.dest(PATHS.public + 'js/'),
  ]);
});

gulp.task('js-test', callbackSequence(instrument, test, report));

gulp.task('styles', () => {
  return gulp.src(PATHS.styles + 'main.css')
    .pipe(postcss([
      stylelint({
        rules: CSS_RULES,
      }),
      reporter({
        clearMessages: true,
      }),
    ]))
    .pipe(cssnext())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(PATHS.public + 'css/'))
    .pipe(cssMinify())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(PATHS.public + 'css/'));
});

gulp.task('serve', ['watch'], () => {
  browserSync({
    server: {
      baseDir: 'public',
    },
  });
});

gulp.task('styles-documentation', () => {
  return gulp.src([
    PATHS.components + '**/*.css',
    PATHS.styles + '*.css',
    PATHS.styles + '**/*.css',
  ])
    .pipe(kss({
      templatePath: './' + PATHS.styleguide.generator,
      template: 'index.jade',
      homepage: 'homepage.md',
      source: [
        'src/components',
        'src/styleguide',
      ],
      destination: PATHS.public + 'style-docs/',
      custom: [
        'Example',
        'License',
      ],
      css: [
        '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.0.0/styles/obsidian.min.css',
      ],
      js: [
        '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.0.0/highlight.min.js',
      ],
    }));
});

gulp.task('styleguide-styles', () => {
  return gulp.src(PATHS.styleguide.styles)
    .pipe(postcss([
      stylelint({
        rules: CSS_RULES,
      }),
      reporter({
        clearMessages: true,
      }),
    ]))
    .pipe(cssnext())
    .pipe(gulp.dest(PATHS.public + 'css/'))
    .pipe(cssMinify())
    .pipe(rename('styleguide.min.css'))
    .pipe(gulp.dest(PATHS.public + 'css/'));
});

gulp.task('svg', () => {
  return gulp.src(PATHS.svg + '*.svg')
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(gulp.dest(PATHS.public + 'svg/'))
    .pipe(rename('svg.min.jade'))
    .pipe(gulp.dest(PATHS.svg));
});

gulp.task('watch', () => {
  gulp.watch([
    PATHS.assets + '**',
    PATHS.svg + '*.svg',
  ], ['assets'])
  .on('change', browserSync.reload);

  gulp.watch([
    PATHS.styles + '*.css',
    PATHS.styles + '**/*.css',
    PATHS.components + '**/*.css',
    PATHS.styleguide.styles,
  ], ['style'])
  .on('change', browserSync.reload);

  gulp.watch([
    PATHS.styleguide.styles,
    PATHS.styleguide.templates,
  ], ['styles-documentation'])
  .on('change', browserSync.reload);

  gulp.watch([
    PATHS.index,
    'src/pages/**/*.jade',
    PATHS.components + '/**/**.jade',
    PATHS.componentsData,
    PATHS.data,
  ], ['templates'])
  .on('change', browserSync.reload);

  gulp.watch([
    PATHS.javascript + '*.js',
    PATHS.javascript + '**/*.js',
    PATHS.javascript + '**/**/*.js',
    PATHS.components + '**/*.js',
  ], ['javascript'])
  .on('change', browserSync.reload);
});

'use strict';

var extend = require('util')._extend;

var through = require('through2');
var defaultVash = require('vash');
var ext = require('gulp-util').replaceExtension;
var PluginError = require('gulp-util').PluginError;
var path = require('path');

module.exports = function(options){
  var opts = extend({}, options);
  var vash = opts.vash || defaultVash;

  vash.config.settings = vash.config.settings || {};
  vash.config.settings.views = path.resolve('./src');

  function CompileVash(file, enc, cb){
    opts.filename = file.path;

    if(file.data){
      opts.data = file.data;
    }

    file.path = ext(file.path, opts.client ? '.js' : '.html');

    if(file.isStream()){
      return cb(new PluginError('gulp-vash', 'Streaming not supported'));
    }

    if(file.isBuffer()){
      try {
        var compiled;
        var contents = String(file.contents);

        compiled = vash.compile(contents, opts)(opts.locals || opts.data,
          function sealLayout(err, ctx) {
            return ctx.finishLayout();
          });
        file.contents = new Buffer(compiled);
      } catch (e) {
        return cb(new PluginError('gulp-jade', e));
      }
    }
    cb(null, file);
  }

  return through.obj(CompileVash);
};

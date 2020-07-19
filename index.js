var PluginError = require('plugin-error');
var replaceExt = require('replace-ext');
var through = require('through2');
var _ = require('lodash');


module.exports = function (options) {

    // default options
    var opts = _.defaults(_.clone(options) || {}, {
        // use lodash/underscore compiler by default
        compiler: _.template,
    });

    return through.obj(function (file, encoding, next) {
        if (file.isNull()) {
            return next(null, file);
        }

        if (file.isStream()) {
            // emit error, but keep processing
            this.emit('error', new PluginError('compile', 'Streaming not supported'));
            return next();
        }

        if (file.isBuffer()) {
            // compile template source into JS function
            var template = file.contents.toString();
            var compiled = opts.compiler(template);

            // transform compiled JS function into source code string
            file.contents = new Buffer(compiled.toString());

            // rename file to .js extension
            file.path = replaceExt(file.path, '.js');
        }

        // pass (potentially) compiled template along
        next(null, file);
    });

};

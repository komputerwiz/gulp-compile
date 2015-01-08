# gulp-compile

A [gulp][] filter for compiling templates into JS source code. The resulting code may then be
wrapped in a module or assigned to a namespace and concatenated.

> *Another* template-compiling Gulp plugin? Why?

Many contributions exist in this area, but I have not been able to find the perfect solution
for what I believe is a common AMD build workflow:

1.  Compile template source code into JS source code at build-time (no runtime compilation =
    faster client code)
2.  Wrap ([gulp-wrap-amd][]) each compiled template in a module for inclusion in, for example,
    [Backbone][] Views 
3.  Optimize ([amd-optimize][]) all AMD modules for a production environment ([Almond][]).

Here are some of the noteworthy similar plugins:

* [gulp-jade][]: Has support for exactly what I want to do, but only works on [Jade][]
  templates
* [gulp-template-compile][]: Compiles Lo-Dash/Underscore Embedded JavaScript (EJS) templates
  to JS source, but does not support using templates as modules. Instead, templates are
  namespaced beneath a global variable (`JST` by default).
* [gulp-ejs-precompiler][]: Same issue as gulp-template-compile.
* [gulp-template][]: Renders EJS templates with data already inserted instead of precompiling them.
* [gulp-ejs][]: Same issue as gulp-template.


## Configuration

### options.compiler

A function that accepts a string representation of the template source code as its only
argument and returns a function that, when supplied with a context object, produces a
rendered template string.

**Default:** `_.template`, where `_` is [Lo-Dash][], but resulting templates should be fully
compatible with [Underscore][]


## Abuses

**options.compiler** can technically return anything: the result of calling `toString()` is
what gets written to the output file. Therefore, if a String-to-String function is passed
in, this filter can be used to modify source code or cross-compile just about anything
(hence this plugin's generic name). For example, replacing "%VERSION%" with "1.0.0" in all
source files. Most web preprocessor languages already have gulp filters (e.g. [gulp-jade][],
[gulp-coffee][], [gulp-less][], [gulp-sass][] to name a few): please use them if they work
for you! :-) 

Please note that the output files from this filter will have a `.js` extension, so take care
to [gulp-rename][] them if you need something different.



[almond]: https://github.com/jrburke/almond
[amd-optimize]: https://github.com/scalableminds/amd-optimize
[backbone]: http://backbonejs.org
[gulp]: http://gulpjs.com
[gulp-coffee]: https://github.com/wearefractal/gulp-coffee
[gulp-ejs]: https://github.com/rogeriopvl/gulp-ejs
[gulp-ejs-precompiler]: https://github.com/christophehurpeau/gulp-ejs-precompiler
[gulp-jade]: https://github.com/phated/gulp-jade
[gulp-less]: https://github.com/plus3network/gulp-less
[gulp-rename]: https://github.com/hparra/gulp-rename
[gulp-sass]: https://github.com/dlmanning/gulp-sass
[gulp-template]: https://github.com/sindresorhus/gulp-template
[gulp-template-compile]: https://github.com/ingro/gulp-template-compile
[gulp-wrap-amd]: https://github.com/phated/gulp-wrap-amd
[lo-dash]: http://lodash.com
[underscore]: http://underscorejs.org

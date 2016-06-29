const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream')

gulp.task('browserify', (cb) => {
    const bundler = browserify({
        entries: './src/app/app.js',
        extensions: ['.js']
    });
    const bundle = () => {
        return bundler
            .bundle()
            .on('error', (err) => console.log(err))
            .pipe(source('app.js'))
            .pipe(gulp.dest('./public/javascripts/'))
            //.on('end', cb);
    };
    bundler.transform(babelify.configure());
    return bundle();
})

gulp.task('default', ["browserify"]);
const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream')
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');

const src = './src/app';
const dest = './public/javascripts';
const config = [
        {
            entries: src + '/app.js',
            dest: dest,
            outputName: 'app.js'
        },
        {
            entries: src + '/login.js',
            dest: dest,
            outputName: 'login.js'
        }
    ]

gulp.task('browserify', (cb) => {
    configLen = config.length;

    const browserifyThis = (bundleConfig) => {
        const bundler = browserify({
            entries: bundleConfig.entries,
            extensions: ['.js']
        });
        const bundle = () => {
            return bundler
                .bundle()
                .on('error', (err) => console.log(err))
                .pipe(source(bundleConfig.outputName))
                .pipe(streamify(uglify()))
                .pipe(gulp.dest(bundleConfig.dest))
                .on('end', reportFinished);
        };
        bundler.transform(babelify.configure());

        const reportFinished = () => {
            if (configLen) {
                configLen--;
                if (configLen === 0) {
                    cb();
                }
            }
        }
        return bundle();
    };

    config.forEach(browserifyThis);
})

gulp.task('default', ["browserify"]);
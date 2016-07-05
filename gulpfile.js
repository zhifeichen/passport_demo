const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream')
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');
const path = require('path');

const src = './src/app';
const dest = './public/javascripts/';
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

gulp.task('factor', (cb) => {
    entries = [config[0].entries, config[1].entries];
    outputs = [
            (config[0].dest + config[0].outputName),
            (config[1].dest + config[1].outputName)
        ];
    
    const bundler = browserify(entries);

    bundler.transform(babelify.configure());

    bundler.on('factor.pipeline', (file, pipeline) =>{
        pipeline.get('wrap')
            .push(source(path.basename(file)), streamify(uglify()), gulp.dest(dest));
    });
    bundler.plugin('factor-bundle', {outputs: outputs});

    bundler.bundle()
            .pipe(source('common.js'))
            .pipe(streamify(uglify()))
            .pipe(gulp.dest(dest));
})

gulp.task('default', ["browserify"]);
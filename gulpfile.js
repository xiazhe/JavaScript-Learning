/**
 * Created by zhexia on 16/4/13.
 */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// webserver
gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(plugins.webserver({
            liveload: true,
            directoryListing: true,
            open: true,
            host: '',
            port: 9000,
            fallback: 'index.html'
        }));

    gulp.start('watch');
});

// watch file change
gulp.task('watch', function () {
    gulp.watch(['events/*.html', 'angular/**/*.html']);
    gulp.watch(['events/*.js']);
    gulp.watch(['events/*.css']);
    plugins.livereload.listen();

    gulp.watch(['events/*.html', 'angular/**/*.html'])
        .on('change', plugins.livereload.changed)
        .on('error', errorHandler);
});

function errorHandler(error) {
    console.log(error.toString());
    this.emit('end');
};

//Server
gulp.task('webserver', function () {
    gulp.src('./').pipe(plugins.webserver({
        livereload: true,
        directoryListing: true,
        open: true,
        host: 'localhost',
        port: 9000,
        fallback: 'index.html'
    }));

    gulp.start('watch');
});

// LESS compile
gulp.task('less', function () {
    gulp.src('./styles/*.less')
        .pipe(plugins.less())
        .pipe(gulp.dest('./styles'));
});

// 合并 JS
gulp.task('concat', function () {
    gulp.src('src/**/*.js')
       .pipe(plugins.concat('all.js'))  //合并后的文件名
       .pipe(gulp.dest('dist/'));
});

// 压缩混淆 JS
gulp.task('uglify', function () {
    return gulp.src('dist/all.js')
       .pipe(plugins.uglify({
           //mangle: true,//类型：Boolean 默认：true 是否修改变量名
           //mangle: {except: ['controller']}
       }))
       .pipe(gulp.dest('dist'));
});


// Bower
gulp.task('bower', function () {
    return plugins.bower({ cmd: 'update' });
});

//SVG symbols
gulp.task('sprites', function () {
  return gulp.src('webicon/svg-lib/svg/*.svg')
    .pipe(plugins.svgSymbols())
    .pipe(gulp.dest('webicon/assets'));
});

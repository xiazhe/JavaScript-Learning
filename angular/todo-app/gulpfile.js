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


function errorHandler(error) {
    console.log(error.toString());
    this.emit('end');
};


// Bower
gulp.task('bower', function () {
    return plugins.bower('./bower_components')
        .pipe(gulp.dest('./libs/'));
});

// Update libs
gulp.task('bower-update', function () {
    return plugins.bower({ cmd: 'update' });
});


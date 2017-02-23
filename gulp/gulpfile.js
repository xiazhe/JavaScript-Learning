var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    rename = require("gulp-rename"),
    del = require('del'),
    bower = require('gulp-bower'),
    useref = require('gulp-useref'),
    fs = require('fs'),
    handlebars = require('gulp-compile-handlebars'),
    rev = require('gulp-rev'),
    filelist = require('gulp-filelist'),
    inject = require('gulp-inject');


//gulp-load-plugins


// Watch
gulp.task('watch', function () {
    gulp.watch('index.html');
    gulp.watch('styles/*.css');
    gulp.watch('images/**');
    gulp.watch('src/**/*.less', ['less']);
    gulp.watch('styles/**/*.less', ['less']);
    livereload.listen();
    // **/*.* any file
    gulp.watch(['src/**']).on('change', livereload.changed).on('error', errorHandler);
});

//Server
gulp.task('webserver', function () {
    gulp.src('./').pipe(webserver({
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
    gulp.src('./src/**/*.less')
        .pipe(less())
        .pipe(concat('components.css'))
        .pipe(gulp.dest('./styles'));

    gulp.src('./styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('./styles'));
});

//编译/增加浏览器前缀/压缩
gulp.task('css', function () {
    return gulp.src('./src/**/*.less')
            .pipe(less())
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(gulp.dest('./styles'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(minifycss())
            .pipe(gulp.dest('dist/css'))
            .pipe(livereload())
            .pipe(notify({ message: 'css task complete' }));
});

// 合并 JS
gulp.task('concat', function () {
    gulp.src('src/**/*.js')
       .pipe(concat('all.js'))  //合并后的文件名
       .pipe(gulp.dest('dist/'));
});

// 压缩混淆 JS
gulp.task('uglify', function () {
    return gulp.src('dist/all.js')
       .pipe(uglify({
           //mangle: true,//类型：Boolean 默认：true 是否修改变量名
           //mangle: {except: ['controller']}
       }))
       .pipe(gulp.dest('dist'));
});

// 合并并压缩
gulp.task('compress', function () {

});

// Clean
gulp.task('clean', function () {
    del(['dist/']);
});

// Bower
gulp.task('bower', function () {
    //return bower('./bower_components')
    //    .pipe(gulp.dest('./libs/'));
    return bower({ cmd: 'update' });
});

//gulp.task('default', ['webserver']);

gulp.task('default', function () {
    var files = gulp.src('./src/**/*.js');
    console.log(files);
});


gulp.task('useref', function () {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

// Handle the error
function errorHandler(error) {
    console.log(error.toString());
    this.emit('end');
}

// 遍历src 下所有的文件
gulp.task('files', function () {
    var manifest = JSON.parse(fs.readFileSync('./src', 'utf-8'));
});

// gulp-compile-handlebars 生成html simple
gulp.task('compilehtml', function () {
    var templateData = {
        firstName: "kaer"
    },
    options = {
        ignorePartials: true,
        partials: {
        },
        batch: ['./src/partials'],
        helpers: {
            capitals: function (str) {
                return 'kkk';
                //return str.toUpperCase();
                //TypeError: Cannot read property 'toUpperCase' of undefined
            }
        }

    }

    return gulp.src('src/hello.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(rename('hello.html'))
        .pipe(gulp.dest('dist'));
});

//gulp-rev hash
gulp.task('rev', function () {
    return gulp.src('./src/**/*.js')
        .pipe(rev())
        .pipe(gulp.dest('rev'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev'));
});


//compile handlebars with rev 生成html
gulp.task('compilehtmlrev', function () {
    var handlebarOpts = {
        helpers: {
            assetPath: function (path, context) {
                return context.data.root[path]
            },
            scripts: function (context) {
                //var el = document.createElement('scripts');
                //el.async = true;
                //el.src = 'scripts/foo.js';

                console.log(context.data);

                var scripts = '';
                for (var item in context.data.root) {

                    scripts += '<script src="' + item + '"></script> \n';
                }

                return new handlebars.Handlebars.SafeString(scripts);
            }
        }
    }

    var manifest = JSON.parse(fs.readFileSync('./rev/rev-manifest.json', 'utf-8'));

    return gulp.src('./src/rev.hbs')
        .pipe(handlebars(manifest, handlebarOpts))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('public'));

});

//获取文件列表
gulp.task('filelist', function () {
    return gulp.src(['./src/**/*.js', './src/**/*.css'])
        .pipe(filelist('filelist.json'))
        .pipe(gulp.dest('./'));
});


//Inject resources
gulp.task('inject', function () {
    var target = gulp.src('./misc/index.html');
    var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], { read: false });

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./'));

});










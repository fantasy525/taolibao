var gulp = require('gulp'),
    px3rem = require('gulp-px3rem'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    changed = require('gulp-changed'),
    cssMini = require('gulp-clean-css'),
    debug = require('gulp-debug'),
    autoprefixer = require('gulp-autoprefixer'),
    base64 = require('gulp-base64'),
    plumber = require('gulp-plumber'),
    stylus = require('gulp-stylus'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create();
    var reload = browserSync.reload;
    gulp.task('browser-sync', function () {
        browserSync.init({
            server:{
                baseDir:'./src'
            }
        });
        gulp.watch("src/*.html").on('change', reload);
});
//转换css到px
gulp.task('stylus', function () {
    return gulp.src('src/stylus/*.styl')
        .pipe(changed('src/css'))
        .pipe(plumber({ //防止css文件写法有误时中断gulp工作流，可以继续监控
            errorHandler: function (error) {
                notify.onError('Error:<%= error.message %>');
                this.emit('end');
            }
        }))
        .pipe(stylus()) //配置设计稿的宽度，一般为750/10,640/10,720/10
        .pipe(debug({title: "编译"})) //此处当你修改某个css时会自动提示编译了几个item
        .pipe(gulp.dest('src/css/pxcss'))
})
gulp.task('px2rem', function () {
    return gulp.src('src/css/pxcss/*.css')
        .pipe(changed('src/css', {hasChanged: changed.compareLastModifiedTime}))
        .pipe(px3rem()) //配置设计稿的宽度，一般为750/10,640/10,720/10
        .pipe(debug({title: "编译"})) //此处当你修改某个css时会自动提示编译了几个item
        .pipe(gulp.dest('src/css'))
        .pipe(reload({stream: true}));
})
gulp.task('autoprefixer',function () {
    return gulp.src('dist/css/*.css')
        .pipe(autoprefixer({
        })).pipe(gulp.dest('dist/css'))
})
//复制src文件目录结构到dist
gulp.task('copyFolders', function () {
    return gulp.src('src/**/*.*', {base: 'src'})
        .pipe(gulp.dest('dist'))
});
gulp.task('clean:files', function () {
    return gulp.src(['dist/css/pxcss'])
        .pipe(clean());
})
//压缩css
gulp.task('cssmini', function () {
    return gulp.src('src/css/*.*')
        .pipe(cssMini())
        .pipe(gulp.dest('dist/css'));
})
//base64
gulp.task('base64', function () {
    return gulp.src('dist/css/*.css')
        .pipe(base64({
            maxImageSize: 8 * 1024
        }))
        .pipe(gulp.dest('dist/css'))
})
//压缩图片
gulp.task('imagemin', function () {
    return gulp.src('src/images/**/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'));
})
//压缩js
gulp.task('uglyJs', function () {
    return gulp.src(['src/js/**/*.js', '!src/js/lib/*.js'])
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('dist/js'))
})
//合并压缩优化任务
gulp.task('miniAssets', function () {
    //runSequence(['cssmini', 'uglyJs'], 'autoprefixer','base64');
    runSequence('autoprefixer','base64');
})
gulp.task('build', function () {
    runSequence('copyFolders', 'clean:files', 'miniAssets')
})
gulp.task('watcher', function () {
    gulp.watch(['src/css/pxcss/*.css'], ['px2rem'])
})
gulp.task('tocss', function () {
    runSequence('px2rem', 'browser-sync')
})
gulp.task('default', function () {
    runSequence('px2rem','browser-sync', 'watcher')
})

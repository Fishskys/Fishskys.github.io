var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
const imagemin = require('gulp-imagemin');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');


// 压缩html
gulp.task('minify-html', function() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest('./public'))
});
// 压缩css
gulp.task('minify-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./public'));
});
// 压缩js
gulp.task('minify-js', function() {
    return gulp.src('./public/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});
// 压缩图片
gulp.task('minify-images', function() {
    return gulp.src(['./public/**/*.gif','./public/**/*.png','./public/**/*.jpg','./public/**/*.jepg','./public/**/*.svg'])
        .pipe(imagemin([
        imageminGifsicle ({'optimizationLevel': 3}), 
        imageminMozjpeg({'progressive': true}), 
        imageminOptipng({'optimizationLevel': 7}), 
        imageminSvgo()],
        {'verbose': true}))
        .pipe(gulp.dest('./public/images'))
});
// 默认任务【gulp4写法】
gulp.task('default',gulp.parallel( 'minify-html','minify-css','minify-js','minify-images'));

/*
    
    Setup Instruction
    
    1. Install gulp CLI using root user: npm install --global gulp-cli
    2. Install gulp under project_root/assets: npm install --save-dev gulp
    3. Install gulp-sass under project_root/assets: npm install --save-dev gulp-sass
    4. Install gulp-sass under project_root/assets: npm install --save-dev gulp-less-to-scss
    
    Development Instruction
    
    1. gulp sass : to compile styles
    2. gulp sass:watch : to compile styles by watching
    3. JS compile will be in next release
    4. gulp lessToScss : this is a test playground that let you convert LESS into SCSS just for fun 
    5. To compile finial minified js bundle, use: node r.js -o build.js

*/


var gulp = require('gulp');
var sass = require('gulp-sass');
var lessToScss = require('gulp-less-to-scss');
var minCss = require('gulp-clean-css');

gulp.task('default', function() {

});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(minCss())
        .pipe(gulp.dest('./files/'));
});
gulp.task('sass:watch', function () {
    // gulp.watch('./**/*.scss', ['sass']);
    gulp.watch('./**/*.scss', gulp.series('sass'));
});
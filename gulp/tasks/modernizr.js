/* modernizr : to support elements which is not supported all browser. 
it will going to check browser support on svg ,if not , it return svg to png */

var gulp =require('gulp'),
modernizr =require('gulp-modernizr');

gulp.task('modernizr',() => {
    return gulp.src(['./app/assets/styles/**/*.css','./app/assets/scripts/**/*.js'])
    .pipe(modernizr({
        "options":[
            "setClasses"
        ]
    }))
    .pipe(gulp.dest('./app/assets/temp/scripts/'));
})
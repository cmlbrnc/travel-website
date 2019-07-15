const gulp =require('gulp'),
watch=require('gulp-watch'),
postcss=require('gulp-postcss'),
autoprefixer=require('autoprefixer'),
cssvars=require('postcss-simple-vars'),
nested=require('postcss-nested'),
cssImport =require('postcss-import');

gulp.task('default',function () { console.log("hello you create gulp task")  });
gulp.task('html',function () { console.log("Image something useful beeing done to your html here")  });
gulp.task('styles',function () { 
   
    return gulp.src('./app/assets/styles/style.css')
    .pipe(postcss([cssImport,nested,cssvars,autoprefixer]))
    .pipe(gulp.dest('./app/assets/temp/styles'));


 });
gulp.task('watch',function () { 


    watch('./app/index.html',() => {
        gulp.start('html');
    });

    watch('./app/assets/styles/**/*.css',() => {
        gulp.start('styles');
    });
});

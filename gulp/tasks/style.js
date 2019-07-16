const gulp =require('gulp'),
postcss=require('gulp-postcss'),
autoprefixer=require('autoprefixer'),
cssvars=require('postcss-simple-vars'),
nested=require('postcss-nested'),
cssImport =require('postcss-import'),
mixins =require('postcss-mixins');



gulp.task('styles',function () { 
   
    return gulp.src('./app/assets/styles/style.css')
    .pipe(postcss([cssImport,mixins,nested,cssvars,autoprefixer]))
    .on('error',(err) => {
        console.log(err.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./app/assets/temp/styles'));


 });
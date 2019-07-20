var gulp = require('gulp'),
imagemin=require('gulp-imagemin'),
del=require('del'),
usemin=require('gulp-usemin'),
rev=require('gulp-rev'), //to revision 
cssnone=require('gulp-cssnano'),
uglify=require('gulp-uglify'),
browserSync=require('browser-sync').create();

gulp.task('previewDist',() => {
    browserSync.init({
        notify:false,
        server: {
            baseDir:"dist"
        }
    })
});


gulp.task('deleteDistFolder',['icons'],() => {
    return del("./docs");
});
gulp.task('copyGeneralFiles',['deleteDistFolder'],() => {
    var pathToCopy=[
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/assets/temp',
        '!./app/assets/temp/**'


    ];
    return gulp.src(pathToCopy)
    .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImage',['deleteDistFolder'],function(){
    return gulp.src(['./app/assets/images/**/*','!./app/assets/images/icons','!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        multipass:true
    }))
    .pipe(gulp.dest('./docs/assets/images'))
});
gulp.task('useminTrigger',['deleteDistFolder'],() => {
    gulp.start("usemin");
})
gulp.task('usemin',['styles','scripts'],() => {
    return gulp.src("./app/index.html")
    .pipe(usemin({

        css: [() => {
            return rev();
        },() => {
            return cssnone();
        }],
        js: [() => {
            return rev();
        }/* ,() => {
            return uglify();
        } */]

    } ))
    .pipe(gulp.dest("./docs"));
});

gulp.task('build',['deleteDistFolder','copyGeneralFiles','optimizeImage','useminTrigger']);
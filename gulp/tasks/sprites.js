var gulp =require('gulp'),
svgSprite =require('gulp-svg-sprite'),
rename=require('gulp-rename'),
del=require('del');
var config = {
    mode: {
        css: {
            sprite:'sprite.svg',
            render: {
                css: {
                    template:'./gulp/templates/sprite.css'
                }
            }

        }
    }
}
gulp.task('createSprite',['beginClean'],() => {
    return gulp.src('./app/assets/images/icons/**/*.svg')  /*  ** means any subfolder  */
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/assets/temp/sprite'));
})
gulp.task('beginClean',() => {
    return del(['./app/assets/temp/sprite','./app/assets/images/sprites']);
})
gulp.task('copySpriteCSS',['createSprite'],() => {
    return gulp.src('./app/assets/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('copySpriteGraphic',['createSprite'],() => {
    return gulp.src('./app/assets/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('endClean',['copySpriteGraphic','copySpriteCSS'],() => {
    return del('./app/temp/sprite');
})
gulp.task('icons',['beginClean','createSprite','copySpriteGraphic','copySpriteCSS','endClean']);

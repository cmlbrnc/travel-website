var gulp =require('gulp'),
svgSprite =require('gulp-svg-sprite'),
rename=require('gulp-rename'),
del=require('del'),
svg2png=require('gulp-svg2png');
var config = {
    shape: {
        spacing : {
            padding:1
        }
    },
    mode: {
        css: {
            variables: {
                replaceSvgWithPng :function () {  
                  return function(sprite,render) {

                    return render(sprite).split('.svg').join('.png');

                  }
              }
            },
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
});
gulp.task('createPngCopy',['createSprite'],() => {
    return gulp.src('./app/assets/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/assets/temp/sprite/css'));
});
gulp.task('beginClean',() => {
    return del(['./app/assets/temp/sprite','./app/assets/images/sprites']);
})
gulp.task('copySpriteCSS',['createSprite'],() => {
    return gulp.src('./app/assets/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('copySpriteGraphic',['createPngCopy'],() => {
    return gulp.src('./app/assets/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('endClean',['copySpriteGraphic','copySpriteCSS'],() => {
    return del('./app/temp/sprite');
})
gulp.task('icons',['beginClean','createSprite','createPngCopy','copySpriteGraphic','copySpriteCSS','endClean']);

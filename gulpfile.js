var gulp = require('gulp');
var sass = require('gulp-sass');

const PATHS = {
    styles: {
        watch: './static/assets/scss/**/*',
        src: './static/assets/scss/*.scss',
        dest: './static/assets/css/'
    }
};

function compileScss () {
    return gulp.src(PATHS.styles.src)
        .pipe(sass({
            outputStyle: 'nested' // 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(PATHS.styles.dest));
}

gulp.task('scss', compileScss);

gulp.task('watch', function () {
    gulp.watch(PATHS.styles.watch, ['scss']);
});

gulp.task('default', ['watch']);

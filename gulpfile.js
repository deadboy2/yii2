var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify'),
    imagemin = require('gulp-imagemin'),
    bourbon = require('bourbon').includePaths;


gulp.task('sass', function () {
    return gulp.src('web/sass/**/*.sass')
        .pipe(plumber())
        .pipe(sass({includePaths: bourbon}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(gulp.dest('web/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('jsmin', function () {
    return gulp.src('web/js/sources/**/*.js')
        .pipe(plumber())
        .pipe(minify())
        .pipe(gulp.dest('web/production/js'));
});

gulp.task('imagemin', function () {
    return gulp.src('web/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest('web/production/images'));
});

gulp.task('cssmin', function () {
    return gulp.src('web/css/**/*.css')
        .pipe(plumber())
        .pipe(cleancss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('web/production/css'));
});

gulp.task('liveReload', function () {
    browserSync({
        proxy: "yii2.local",
        notify: false
    });
});

gulp.task('watch', ['liveReload', 'sass'], function () {
    gulp.watch('web/sass/**/*.sass', ['sass']);
    gulp.watch('web/js/sources/**/*.js', browserSync.reload);
    gulp.watch('views/**/*.php', browserSync.reload);
});

gulp.task('production', ['jsmin', 'cssmin', 'imagemin'], function () {

});

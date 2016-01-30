/*global require*/
(function (r) {
    "use strict";
    var scss = r("gulp-scss");
    var gulp = r("gulp");
    var livereload = require('gulp-livereload');
    var webserver = require('gulp-webserver');
    var cssnano = require('gulp-cssnano');
    var concat = require('gulp-concat');
    var rename = require("gulp-rename");

    gulp.task("scss", function () {
        gulp.src(
            "scss/flexer.scss"
        ).pipe(scss(
            {"bundleExec": false}
        )).pipe(gulp.dest("./src/css"))
        	.pipe(gulp.dest("./dist/css"))
        .pipe(livereload());
    });
    gulp.task('webserver', function() {
		  gulp.src('src/')
		    .pipe(webserver({
		      open: true,
		      port: 8080
		    }));
		});

		gulp.task('html', function() {
		    return gulp.src([
		        'src/**/*.html'
		    ])
		    .pipe(livereload());
		});

		gulp.task('minify', function() {
    return gulp.src('./dist/css/flexer.css')
        .pipe(cssnano())
        .pipe(rename("flexer.min.css"))
        .pipe(gulp.dest('./dist/css/'));
		});

		gulp.task('dist', function() {
    return gulp.src('./scss/**/**.*')
        .pipe(gulp.dest('./dist/scss/'));
		});

		gulp.task('watch', function() {
			livereload.listen();
			gulp.watch('src/*.html', ['html']);
		  gulp.watch('scss/**/*.scss', ['scss']);
		});
 
    gulp.task('default', ['webserver', 'watch']);
    gulp.task('compile', ['scss', 'minify', 'dist']);
}(require));
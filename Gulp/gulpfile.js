/* 
------------------------------
 # Gulp Installation
------------------------------
  CMD: node -v (Check node version)
  CMD: npm -v (Check npn version)
  CMD: npm install -g gulp (Install gulp globally)
  CMD: npm install gulp --save-dev (Install gulp in project)
  CMD: npm install gulp-uglify --save-dev
  CMD: npm install gulp-concat --save-dev
  CMD: npm install gulp-clean-css --save-dev
  CMD: npm install gulp-install --save-dev
*/

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var install = require("gulp-install");

// Install gulp packages  CMD: gulp script
gulp.task('install', function(){
	gulp.src('package.json')
		.pipe(install());
});

gulp.task('scripts', function() {
    gulp.src([
			'js/scripts/vendors/jquery.min.js',
			'js/lib/jquery-ui.js'
		])
        .pipe(concat('gradpak-admin-scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

gulp.task('styles', function() {
	gulp.src([
			'css/fonts/ionicons/css/ionicons.min.css',
			'css/lib/font-awesome.min.css'
		])
		.pipe(concat('gradpak-admin-styles.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('build'))
});


// Default Task
gulp.task('default', [           // CMD: gulp
	'scripts',
	'styles'
]);


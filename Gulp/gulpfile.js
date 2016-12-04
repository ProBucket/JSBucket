/* 
------------------------------
 # Gulp Installation
------------------------------
  ** At first need to install Node.js
  $ node -v [Check node version]
  $ npm -v [Check npm version]
  $ npm install -g gulp [Install gulp globally]
  $ npm install gulp --save-dev [Install gulp in project]
  $ npm install gulp-uglify --save-dev [Install uglify gulp package]
  $ npm install gulp-concat --save-dev
  $ npm install gulp-clean-css --save-dev
  $ npm install gulp-install --save-dev
-------------------------------
*/

// Required packages include
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var install = require("gulp-install");

// Install gulp packages from package.json.  
// $ gulp script
gulp.task('install', function(){
	gulp.src('package.json')
		.pipe(install());
});

// Minify and concate js files. 
// $ gulp scripts
gulp.task('scripts', function() {
    gulp.src( [ 'js/lib/jquery.min.js', 'js/lib/jquery-ui.js' ] )
        .pipe(concat('all-scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

// Minify and concate css files. 
// $ gulp styles
gulp.task('styles', function() {
	gulp.src( [ 'css/lib/ionicons.min.css', 'css/lib/font-awesome.min.css' ])
		.pipe(concat('all-styles.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('build'))
});

// Default Task, its run styles and scripts task. 
// $ gulp
gulp.task('default', [           
	'scripts',
	'styles'
]);


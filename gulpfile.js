/*
** Gulp file ngDatePicker
** Author by Triadi Prabowo
** triadiprabowo@gmail.com
*/

// Define requirements
var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	gutil = require('gulp-util'),
	del = require('del'),
	env_process = 'release',
	appInfo = require('./package.json'),
	virtual_port = 1337;

if(env_process == 'development')
	var env_set = $.util.env.type || 'development'
else {
	var env_set = $.util.env.type || 'release'
}

var webconfig = require('./webconfig.js')[env_set],
	modRewrite = require('connect-modrewrite');

// Define build path
var src_dist = './dist/',
	src_dev = './src/';

// Define gulp default tasks
var defaultTasks = [
	'app_scripts',
	'ngDateScripts',
	'index_view',
	'tpls',
	//'img',
	'css',
	'vServer',
	'watch'
]

// Gulp task: creating application required scripts
gulp.task('app_scripts', function() {
	return gulp.src(webconfig.entry)
	.pipe($.webpack(webconfig))
    .pipe(env_process == 'release'? $.uglify({mangle: false}) : $.util.noop())
    .pipe(gulp.dest(src_dist + 'js/'))
    .pipe($.size({ title : 'main.js' }))
    .pipe($.connect.reload());
});

// Gulp task: creating application scripts (ngDatePicker)
gulp.task('ngDateScripts', function() {
	return gulp.src(src_dev + 'js/*.js')
	.pipe(env_process == 'release'? $.uglify({mangle: false}) : $.util.noop())
    .pipe(gulp.dest(src_dist + 'js/'))
    .pipe($.connect.reload());
});

// Gulp task: compiling HTML view files (index.html)
gulp.task('index_view', function() {
	return gulp.src(src_dev + 'index.html')
    .pipe(gulp.dest(src_dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

// Compiling for templates
gulp.task('tpls', function(){
  return gulp.src(src_dev + 'tpl/**/*.html')
    .pipe(gulp.dest(src_dist + 'tpl'))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

// Gulp task: Compiling images
// gulp.task('img', function() {
// 	return gulp.src(src_dev + 'img/*')
// 	.pipe($.size({ title : 'images' }))
// 	.pipe(gulp.dest(src_dist + 'img/'));
// });

// Gulp task: compiling CSS
gulp.task('css',function() {
	return gulp.src(src_dev + 'css/*.css')	
	.pipe(env_process == 'release'? $.cssmin() : $.util.noop())
	.pipe(gulp.dest(src_dist + 'css/'))
	.pipe($.size({ title : 'css' }))
	.pipe($.connect.reload());
});

// Gulp task creating virtual server using gulp-connect
gulp.task('vServer', function() {
    $.connect.server({
        root: src_dist,
        port: virtual_port,
        livereload: {
          port: 35729
        },
        middleware: function (connect, options) {
          return [
            modRewrite([
    			'!^/api/.*|\\_getModules|\\.html|\\.js|\\.css|\\.swf|\\.jp(e?)g|\\.png|\\.gif|\\.svg|\\.eot|\\.ttf|\\.woff|\\.pdf$ /index.html [L]'
             ])
          ];
        }
    });
});

// Gulp task watch for changes
gulp.task('watch', function() {
	gulp.watch(src_dev + 'index.html', ['index_view']);
	gulp.watch(src_dev + 'tpl/**/*.html', ['tpls']);
	gulp.watch(src_dev + 'js/*.js', ['ngDateScripts']);
	gulp.watch(src_dev + 'css/*.css', ['css']);
});

// Gulp task to clean build (fresh build)
gulp.task('clean', function(cb) {
	del(src_dist, cb);
});

// Gulp task for development
gulp.task('development', defaultTasks)

// Set default task
gutil.log(gutil.colors.green('Running gulp=> '+appInfo.name+' version '+appInfo.version+ ' ['+env_process+']:'+virtual_port));

// Start Default Task
gulp.task('default', function() {
	gulp.start('clean');
});
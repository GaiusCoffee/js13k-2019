var gulp = require('gulp'),
zip = require('gulp-zip'),
jshint = require('gulp-jshint'),
gp_concat = require('gulp-concat'),
gp_uglify = require('gulp-terser'),
imageop = require('gulp-image-optimization'),
minifyHTML = require('gulp-htmlmin'),
rename = require('gulp-rename')
gp_shell = require('gulp-shell');

// All your paths for JS, HTML and Image files
var zip_files = ['build/game.js', 'build/index.html', "build/assets/*"], // Files to be added to the zip folder use "<directory goes here>/*" for all files inside the directory
    js_files = ['js/*.js'], // All your JS files to be combined and minified
    img_files = ['assets/*.png','assets/*.jpg','assets/*.gif','assets/*.jpeg', 'assets/**/*.png','assets/**/*.jpg','assets/**/*.gif','assets/**/*.jpeg'];

//Zip up the JS/HTML required for the game
gulp.task('zip', () => {
    return gulp.src(zip_files, {base: "."})
        .pipe(zip('game.zip'))
        .pipe(gulp.dest('dist'))
        .pipe(gp_shell(['n=$(stat -f %z ./dist/game.zip) && echo Zipped Filesize: $(printf %06d $n) bytes!']))
        .pipe(gp_shell(['n=13312 && echo Target Filesize: $(printf %06d $n) bytes!']));
});

//Compress Images
gulp.task('images', (cb) => {
    gulp.src(img_files).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('build/assets')).on('end', cb).on('error', cb);
});

//Minify the HTML
gulp.task('build-html', () => { 
  return gulp.src('./index.unmin.html')
    .pipe(minifyHTML({
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./build/'));
});

//Build the JS and minify
gulp.task('build-js', () => {
    return gulp.src(js_files)
        .pipe(jshint({esversion: 6}))
        .pipe(jshint.reporter('default'))
        .pipe(gp_uglify())
        .pipe(gp_concat('game.js'))
        .pipe(gulp.dest('./build/'));
});

//Build the JS without minifying
gulp.task('build-dev', () => {
    return gulp.src(js_files)
        .pipe(jshint({esversion: 6}))
        .pipe(jshint.reporter('default'))
        .pipe(gp_concat('game.js'))
        .pipe(gulp.dest('./build/'));
});


//Watch Task
gulp.task('watchHTML', () => { gulp.watch('./index.unmin.html', gulp.series('build-html')); })
gulp.task('watchJS', () => { gulp.watch(js_files, gulp.series('build-dev')); })
gulp.task('watchIMG', () => { gulp.watch(img_files, gulp.series('images')); })
gulp.task('watch', gulp.parallel('watchHTML', 'watchJS', 'watchIMG'));

//Default Task
gulp.task('default', gulp.series('build-html', 'build-dev', 'images'));

//Run this task once the game is ready to ship!
gulp.task('publish', gulp.series('build-js', 'build-html', 'zip'));

//Legacy 'build' alias for build-dev task
gulp.task('build', gulp.series('build-dev'));

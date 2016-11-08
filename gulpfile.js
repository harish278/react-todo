var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");
var browserSync = require('browser-sync').create();
var serve = require('gulp-serve');

gulp.task("bundle", function () {
    return browserify({
        entries: "./app/main.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("app/dist"))
});

gulp.task("copy", ["bundle"], function () {
    return gulp.src(["app/index.html","bower_components/bootstrap-css/css/bootstrap.min.css","app/styles/style.css","bower_components/jquery/dist/jquery.min.js","bower_components/bootstrap-css/js/bootstrap.min.js"])
        .pipe(gulp.dest("app/dist"));
});

gulp.task("default",["copy"],function(){
   console.log("Gulp completed..."); 
});

gulp.task("watch", function(){
  gulp.watch("app/**/**/**.jsx", ['copy']);
})

// gulp.task("serve", ["copy", "watch"], serve("app/dist"));
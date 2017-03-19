"use strict";

const gulp = require("gulp");
const rev = require("gulp-rev"); //Static asset revisioning by appending content hash to filenames unicorn.css → unicorn-d41d8cd98f.css
const revReplace = require("gulp-rev-replace"); //Rewrite occurrences of filenames which have been renamed by gulp-rev
const useref = require("gulp-useref"); //combine
const filter = require("gulp-filter");
const uglify = require("gulp-uglify");
const csso = require("gulp-csso");

gulp.task("default", () => {
    let jsFilter = filter("**/*.js", {
        restore: true
    });
    let cssFilter = filter("**/*.css", {
        restore: true
    });
    let indexHtmlFilter = filter(["**/*", "!**/index.html"], {
        restore: true
    });

    return gulp.src("src/index.html")
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest("dist"));
});
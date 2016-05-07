'use strict'
const gulp        = require('gulp')
const browserSync = require('browser-sync')
const del         = require('del')
const $           = require('gulp-load-plugins')()

let production = true

gulp.task('styles', function() {
    return gulp.src('src/styles/*.less')
        .pipe($.plumber())
        .pipe($.less()
            .on('error', $.util.log))
        .pipe($.postcss([
                require('autoprefixer-core')({
                    browsers: ['> 1%', 'last 2 versions']
                })
            ]))
        .pipe($.if(production, $.minifyCss()))
        .pipe(gulp.dest('build/styles'))
})

gulp.task('views', ['styles', 'scripts'],function(){
    return gulp.src(['src/views/*.jade'])
        .pipe($.plumber())
        .pipe($.jade({
            pretty: !production
        }))
        .on('error', $.util.log)
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe($.plumber())
        // .pipe($.imagemin({
        //     svgoPlugins: [{
        //         convertPathData: false
        //     }]
        // }))
        .pipe(gulp.dest('build/images'))
})

gulp.task('scripts', function() {
    return gulp.src('src/scripts/*.coffee')
        .pipe($.plumber())
        .pipe($.coffee())
        .on('error', $.util.log)
        .pipe($.if(production, $.uglify()))
        .pipe(gulp.dest('build/scripts'))
})

gulp.task('lib', function() {
    return gulp.src('src/lib/*')
        .pipe(gulp.dest('build/lib'))
})

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './build'
        }
    })
})

gulp.task('watch', ['build'], function() {
    gulp.watch('src/styles/*.less', ['views'])
    gulp.watch('src/views/**/*.jade', ['views'])
    gulp.watch('src/scripts/*.coffee', ['views'])

    gulp.start('browser-sync')
})

gulp.task('clean', function(cb) {
    del(['build'], cb)
})

gulp.task('build', ['views', 'images', 'lib'], function() {
    production && setTimeout(()=>console.info("build complete~"), 0)
})

gulp.task('default', ['clean'], function() {
    production = false
    gulp.start('watch')
})

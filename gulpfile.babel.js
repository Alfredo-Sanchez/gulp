
//HTML
import htmlmin from 'gulp-htmlmin'

//CSS
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

//Javascript
import gulp from 'gulp'
import babel from 'gulp-babel'
import terser from 'gulp-terser'

//concat
import concat from 'gulp-concat'

// Variables / constantes
const cssPlugins = [
    cssnano(),
    autoprefixer()
]

//HTML
gulp.task('htmlmin', ()=>{
    return gulp
        .src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./public'))
})

//CSS
gulp.task('styles', ()=>{
    return gulp
        .src('./src/css/*.css')
        .pipe(concat('styles-min.css'))
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./public/css'))
})


//Javascrip 
gulp.task('babel', ()=>{
    return gulp
        .src('./src/js/*.js')
        .pipe(concat('script-min.js'))
        .pipe(babel({// Esto es opcional puesto que ya poseemos el archivo .babelrc
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(gulp.dest('./public/js'))
})

// watches
gulp.task('default', ()=>{
    gulp.watch('./src/*.html', gulp.series('htmlmin'))
    gulp.watch('./src/css/*.css', gulp.series('styles'))
    gulp.watch('./src/js/*.js', gulp.series('babel'))
})


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

//Pug
import pug from 'gulp-pug'

//SASS
import sass from 'gulp-sass'

//concat
import concat from 'gulp-concat'

// Clean code css
import clean from 'gulp-purgecss'


const production = false
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

//PUG
gulp.task('views', ()=>{
    return gulp
        .src('./src/views/pages/*.pug')
        .pipe(pug({
            pretty: production ? false : true
        }))
        .pipe(gulp.dest('./public'))
})

//SASS
gulp.task('sass', ()=>{
    return gulp
            .src('./src/scss/styles.scss')
            .pipe(sass({
                outputStyle: "compressed"
            }))
            .pipe(gulp.dest('./public/css'))
})

//Clean css
gulp.task('clean', ()=>{
    return gulp.src('./public/css/styles.css')
    .pipe(clean({
        content: ['./public/*.html'] // los archivos a revisar para saber que clases de css no estan siendo utilizadas
    }))
    .pipe(gulp.dest('./public/css'))
})

// watches
gulp.task('default', ()=>{
    // gulp.watch('./src/*.html', gulp.series('htmlmin'))
    // gulp.watch('./src/css/*.css', gulp.series('styles'))
    gulp.watch('./src/views/**/*.pug', gulp.series('views'))
    gulp.watch('./src/scss/styles.scss', gulp.series('sass'))
    gulp.watch('./src/js/*.js', gulp.series('babel'))
})

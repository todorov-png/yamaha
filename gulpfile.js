'use strict';

const { src, dest, watch, parallel, series } = require('gulp');

const scss         = require('gulp-sass');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del');

function browsersync() {
    browserSync.init({
        server: {
        baseDir: 'app/'
        }
    });
}

function cleanDist() {
    return del('dist');
}

function images() {
    return src('app/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('dist/images'));
}

function scripts() {
    return src([ //Перечисляю файлы js, сначала плагины, а потом свои
        //'node_modules/jquery/dist/jquery.js',
        'app/js/header.js',
        'app/js/pop_up.js',
        'app/js/form_records_tests.js',
        'app/js/form_registration.js',
        'app/js/form_account.js',
        'app/js/instruments.js',
        'app/js/basket.js',
        'app/js/history_of_orders.js'
    ])
        .pipe(concat('main.min.js')) // Обьединяю в 1 фаил
        .pipe(uglify())              // Минифицирую
        .pipe(dest('app/js'))        // Выкидываю в папку js
        .pipe(browserSync.stream()); // Обновляем сервер
}

function styles() {
    return src('app/scss/style.scss')                  // Фаил с которым работаем
        .pipe(scss({outputStyle: 'compressed'}))       // Конвертируем в css и сжимаем
        .pipe(concat('style.min.css'))                 // Переименовываем
        .pipe(autoprefixer({                           // Добавляем автопрефиксы
            overrideBrowserslist: ['last 10 version'], // Для 10 последних версий
            grid: true
        }))                    
        .pipe(dest('app/css'))                         // Сохраняем в фаил
        .pipe(browserSync.stream());                   // Обновляем сервер
}

function styles2() {
    return src('app/scss/page2.scss')                  // Фаил с которым работаем
        .pipe(scss({outputStyle: 'compressed'}))       // Конвертируем в css и сжимаем
        .pipe(concat('page2.min.css'))                 // Переименовываем
        .pipe(autoprefixer({                           // Добавляем автопрефиксы
            overrideBrowserslist: ['last 10 version'], // Для 10 последних версий
            grid: true
        }))                    
        .pipe(dest('app/css'))                         // Сохраняем в фаил
        .pipe(browserSync.stream());                   // Обновляем сервер
}

function stylesform() {
    return src('app/scss/form_account.scss')           // Фаил с которым работаем
        .pipe(scss({outputStyle: 'compressed'}))       // Конвертируем в css и сжимаем
        .pipe(concat('form_account.min.css'))          // Переименовываем
        .pipe(autoprefixer({                           // Добавляем автопрефиксы
            overrideBrowserslist: ['last 10 version'], // Для 10 последних версий
            grid: true
        }))                    
        .pipe(dest('app/css'))                         // Сохраняем в фаил
        .pipe(browserSync.stream());                   // Обновляем сервер
}

function build(){
    return src([
        'app/css/style.min.css',
        'app/css/page2.min.css',
        'app/css/form_account.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], {base: 'app'}) //Базовая директория откуда будет считатся путь 
    .pipe(dest('dist'));
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);   //Следим за файлами и запускаем конвертацию
    watch(['app/scss/**/*.scss'], styles2);   //Следим за файлами и запускаем конвертацию
    watch(['app/scss/**/*.scss'], stylesform);   //Следим за файлами и запускаем конвертацию
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);  //Слежу за изменением в скриптах
    watch(["app/page/*.html"]).on('change', browserSync.reload); //Следим за изменениями и обновляем сервер
    watch(["app/*.html"]).on('change', browserSync.reload); //Следим за изменениями и обновляем сервер
}

exports.styles = styles;
exports.styles2 = styles2;
exports.stylesform = stylesform;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, styles2, stylesform, scripts, browsersync, watching);
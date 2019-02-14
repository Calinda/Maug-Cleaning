var gulp = require('gulp'),
	sass = require('gulp-sass'), //Подключаем Scss пакет
	browserSync = require('browser-sync'), // Подключаем Browser Sync
	concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify      = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano     = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename      = require('gulp-rename'); // Подключаем библиотеку для переименования файлов
    del         = require('del'); // Подключаем библиотеку для удаления файлов и папок
    //imagemin    = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    //pngquant    = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
    cache       = require('gulp-cache'); // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов


// настройки путей к файлам
var rootDir = '.';
var sourceDir = rootDir + '/src'; // здесь хранятся все исходники
var destDir = rootDir + '/dist'; // здесь хранится все на выходе

gulp.task('mytask', function() {
    console.log('Привет, я таск!');
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: sourceDir // Директория для сервера - src
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src([sourceDir +'/sass/**/*.sass', sourceDir + '/scss/**/*.scss']) // Берем источник
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest(sourceDir + '/css')) // Выгружаем результата в папку src/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});




/*gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        sourceDir + 'js/libs/jquery-3.3.1.js', // Берем jQuery
        sourceDir + 'js/libs/slick.min.js' // Берем Magnific Popup
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest(sourceDir + '/js')); // Выгружаем в папку src/js
});*/

gulp.task('css-libs', ['sass'], function() {
    return gulp.src(sourceDir +'/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest(sourceDir + '/css')); // Выгружаем в папку src/css
});

//gulp.task('img', function() {
    //return gulp.src('app/img/**/*') // Берем все изображения из app
        //.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            //interlaced: true,
            //progressive: true,
            //svgoPlugins: [{removeViewBox: false}],
            //use: [pngquant()]
        //})))
        //.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
//});

gulp.task('watch', ['browser-sync', 'css-libs'/*, 'scripts'*/], function(){
	gulp.watch([sourceDir + 'sass/**/*.sass', sourceDir + '/scss/**/*.scss'], ['sass']); // Наблюдение за sass файлами
	gulp.watch(sourceDir + '/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch(sourceDir + '/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
    return del.sync(destDir); // Удаляем папку dist перед сборкой
});


gulp.task('build', ['clean', 'css-libs'/*, 'scripts'*/], function() {

    var buildCss = gulp.src([ // Переносим CSS стили в продакшен
        sourceDir + '/css/main.css',
        sourceDir + '/css/libs.min.css'
        ])
    .pipe(gulp.dest(destDir + '/css'))

    var buildFonts = gulp.src(sourceDir + '/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest(destDir + '/fonts'))

    var buildLibsJs = gulp.src(sourceDir + '/js/libs/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest(destDir + '/js/libs'))

    var buildJs = gulp.src(sourceDir + '/js/**/*') // Переносим скрипты в продакшен
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(destDir + '/js'))

    var buildHtml = gulp.src(sourceDir + '/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest(destDir));

});


gulp.task('default', ['watch']); // Устанавливаем вызов watch, как дефолтный. В консоли можно писать просто gulp


gulp.task('clear', function () {
    return cache.clearAll();		//автономный таск для очистки кеша Gulp
})


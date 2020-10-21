/* 
    gulp是一个前端自动化打包工具
    gulp里面提供的方法
        1 src()
            ==>用来找到你要打包的文件夹
            ==>src('你要打包的文件的地址')
            ==>返回值是一个二进制流,就可以继续去调用别的方法
        2 pipe()
            ==>用来帮你做事情的
            ==>pipe(你要做的事情)
            ==>返回值:又是一个二进制流,就可以继续去调用别的方法
        3 dest()
            ==>用来写入文件的
            ==>你要把已经压缩好的代码放在哪一个文件夹里面
            ==>如果没有你指定的文件夹,会自动创建一个这个文件夹放进去

        4 parallel()
            ==>用来并行执行多个任务的
            ==>gulp.parallel(你定义好的任务1,你定义好的的任务2,....)
            ==>他会把这几个任务都给你执行了
            ==>返回值:是一个任务流
            ==>只要这个返回值一执行,就能把你准备好的几个任务同时开始执行

        5 series()
            ==>用来逐个执行多个任务的
            ==>gulp.series(任务1,任务2,...)
            ==>返回值:是一个任务流
            ==>只要这个返回值一执行,就能把你准备好的几个任务逐一完成
            ==>前一个任务完成后再执行后面一个任务


        6 watch()
            ==>用来监控文件变化的
            ==>gulp.watch(你要监控的文件目录,你要执行的任务)
    
*/
//1引入gulp第三方模块包
const gulp = require('gulp');

//2-1导入gulp-cssmin这个第三方模块
const cssmin = require('gulp-cssmin');//专门用来压缩css文件

//2-2 导入gulp-autoprefixer这个第三方模块
const autoprefixer = require('gulp-autoprefixer');//专门用来给css自动添加前缀用的

// 4-1 导入gulp-babel这个第三方模块
        //-->@babel/core和@babel/preset-env
const babel = require('gulp-babel');//专门用来把es6转换成es5使用的

// 4-2 导入gulp-uglify这个第三方模块
const uglify = require('gulp-uglify');//专门用来压缩js文件的

// 6-1 导入gulp-htmlmin这个第三方模块
const htmlmin = require('gulp-htmlmin');//专门用来压缩html文件的

// 7-1 导入del这个第三方模块
const del = require('del');//专门用来删除目录使用的

// 9-1 导入gulp-webserver这个第三方模块
const webserver = require('gulp-webserver');//专门用来开启服务器的

//10导入sass文件
const sass = require('gulp-sass');

// 2-3 书写一个打包css的方法
const cssHandler = ()=>{
    return gulp.src('./src/css/*.css')//用来找到你要打包的文件夹
    .pipe(autoprefixer())//专门用来给css自动添加前缀用的
    .pipe(cssmin())//专门用来压缩css文件
    .pipe(gulp.dest('./dist/css'))//用来写入文件的
}

// 3-1 书写一个移动images文件夹的方法
const imgHandler = ()=>{
    return gulp.src('./src/images/**')//用来找到你要打包的文件夹
    .pipe(gulp.dest('./dist/images'))//用来写入文件的
}

// 4-3 书写一个压缩js文件的方法
const jsHandler = ()=>{
    return gulp.src('./src/js/*.js')
    // es6转es5
    .pipe(babel({
        presets: ['@babel/env']
    }))
    // 压缩代码
    .pipe(uglify())
    // 写入到dist的js文件夹里面
    .pipe(gulp.dest('./dist/js'))
}

// 5-1 书写一个移动lib文件夹的方法
const libHandler = ()=>{
    return gulp.src('./src/lib/**')
    .pipe(gulp.dest('./dist/lib'))
}

// 6-2 书写一个压缩html文件的方法
const htmlHandler = ()=>{
    return gulp.src('./src/pages/*.html')
    // 压缩html需要配置压缩的参数
    .pipe(htmlmin({
        collapseWhitespace: true, //压缩空格
        removeAttributeQuotes:true, //移除属性的引号
        collapseBooleanAttributes:true,//把值为布尔值的属性简写
        removeComments:true,//移除注释
        minifyCSS:true,//把页面里面的style标签里面的css样式也去空格
        minifyJS:true,//把页面里的script标签里面的js代码给去空格
    }))
    .pipe(gulp.dest('./dist/pages'))
}

// 100 书写一个移动font文件的方法
const fontHandler =()=>{
    return gulp.src('./src/font/**')
    .pipe(gulp.dest('./dist/font'))
}

// 101 书写一个移动php文件的方法
const phpHandler =()=>{
    return gulp.src('./src/php/**')
    .pipe(gulp.dest('./dist/php'))
}

// 101 书写一个移动json文件的方法
const jsonHandler =()=>{
    return gulp.src('./src/json/**')
    .pipe(gulp.dest('./dist/json'))
}


//任务九:编译和压缩src文件夹里面的sass文件夹里面的
//scss文件到dist目录中的css文件夹中
const sassHandler = ()=>{
    return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}


// 7-2 书写一个任务,自动删除dist目录
const delHandler = ()=>{
    // 这个函数的目的就是为了删除dist目录使用的
    return del(['./dist'])
}

// 8 书写一个自动监控文件的任务
// 监控src下面的所有文件,只要一修改,就执行响应的任务
// 比如src下面的css文件夹,只要里面的文件一修改,我就执行一下cssHanlder这个任务
const watchHanlder = ()=>{
    // 监控src下面的css文件夹下的所以css文件,只要里面的文件一修改,我就执行一下cssHanlder这个任务
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/images/**',imgHandler);
    gulp.watch('./src/js/*.js',jsHandler)
    gulp.watch('./src/lib/*.js',libHandler)
    gulp.watch('./src/pages/*.html',htmlHandler)
    gulp.watch('./src/font/**',fontHandler)
    gulp.watch('./src/php/**',phpHandler)
    gulp.watch('./src/json/**',jsonHandler)
    // 也需要监控sass文件夹里面的文件变化
    gulp.watch('./src/sass/*.scss',sassHandler)
}

// 9 书写一个配置服务器的任务
// 在开发过程中直接把我写的东西在服务器上打开
// 因为我要一边写一边修改一边测试
// 因为gulp是基于node运行的
// 这里就使用node给我们开启一个服务,不是apache,也不是nginx
// 自动刷新,当dist目录里面的代码改变以后,就会自动刷新浏览器
const serverHandler = ()=>{
    // 要把页面在服务器上打开
    // 打开的是dist目录里面我已经压缩好的页面
    return gulp.src('./dist') //找到我要打开的页面的文件夹,把这个文件夹当做网站跟目录
    .pipe(webserver({ // 需要一些配置项
        port:8080, //端口号,0-65535,尽量不要用0-1023
        open:'./pages/index.html', //你默认打开的首页,从dist下面的目录开始书写
        livereload:true, //自动刷新浏览器-热启动
        // proxies:[
        //     // 每一个代理配置就是一个对象
        //     {
        //         source:'/weather', //源,你的代理标识符
        //         // 你直接请求下面这个地址压根也拿不到东西,因为跨域了
        //         target:'https://way.jd.com/jisuapi/weather' //目标,你要代理的地址

        //     }
        // ]
    }))
}

// 导出一个默认任务
// 当我将来执行默认任务default的时候,就会自动帮我删除dist目录,同时压缩css,js,html,同时移动images和lib文件夹
// 小细节:当你在命令行执行gulp default的时候,可以不写default
// 你在命令行执行gulp这个指令,就是在执行gulp default
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(
        cssHandler,
        imgHandler,
        jsHandler,
        libHandler,
        htmlHandler,
        fontHandler,
        phpHandler,
        sassHandler,
        jsonHandler
    ),
    serverHandler,
    watchHanlder    
)

// 导出了default任务以后
// 当执行default任务的时候
// 里面的的delHandler,cssHandler,imgHandler,jsHandler,libHandler,htmlHandler
// 就都一次执行完成了
// 就不再需要逐个导出这些任务多了
// 也就是下面的代码都不需要了

// // 2-4 导出准备好的cssHandler这个压缩css的方法
// module.exports.css = cssHandler;  //2-5 执行css任务的指令: gulp css
// // 3-2 导出准备好的imgHandler这个移动images的方法
// module.exports.img = imgHandler;
// // 4-4 导出准备好的jsHandler这个压缩js的方法
// module.exports.js = jsHandler;
// // 5-2 导出准备好的libHandler这个移动lib文件夹的方法
// module.exports.lib = libHandler;
// // 6-3 导出准备好的htmlHandler这个压缩html文件的方法
// module.exports.html = htmlHandler;
// // 7-3 导出准备好的delHandler这个删除dist目录的方法
// module.exports.del = delHandler;


// 匹配条件：
    // “?”：匹配文件路径中的一个字符（不会匹配路径分隔符）
    // “src/test.js”：指定某个文件；
    // “*”：匹配所有文件 例：src/*.js(包含src下的所有js文件)；
    // “**”：匹配0个或多个子文件夹 例：src/**/*.js(包含src的0个或多个子文件夹下的js文件)；
    // “{}”：匹配多个属性,例：src/{a,b}.js(包含a.js和b.js文件) src/*.{jpg,png,gif}(src下的所有jpg/png/gif文件)；
    // “!”：排除文件 例：!src/a.js(不包含src下的a.js文件)






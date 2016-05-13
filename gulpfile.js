const gulp = require('gulp')
const argv = require('yargs').argv
const webpackStream = require('webpack-stream')
const reload = require('gulp-hot-reload')
const webpack = require('webpack')
const gutil = require('gulp-util')
const path = require('path')
const config    = require(path.join(__dirname,'config/config.js'));
const sequence  = require('run-sequence');
const del   = require('del');
const ejs = require("gulp-ejs");
const rename = require('gulp-rename');

const webpack_server_config = require(config.webpack_server_config)
const webpack_client_dev_config = require(config.webpack_client_dev_config)
const webpack_client_prod_config = require(config.webpack_client_prod_config)

const webpack_callback = (err, stats) => {
  if(err) throw new gutil.PluginError("webpack", err);
  gutil.log('[webpack]', stats.toString({
    colors: true,
    chunkModules: false,
    assets: false,
    version: false,
    hash: false
  }))
}

gulp.task('clean', () =>  {
  del([
    config.build + '/**'
  ])
});


gulp.task('webpack', () => {
  gulp
    .src(config.server_entry)
    .pipe(webpackStream(webpack_server_config, webpack, webpack_callback))
    .pipe(reload({
      port: config.port,
      react: false,
      config: config.webpack_client_dev_config
    }))
})

gulp.task('watch', () =>  {
  gulp.watch('src/**/*.js', ['webpack'])
})

gulp.task('webpack-server-dist', () =>  {
  gulp
    .src(config.server_entry)
    .pipe(webpackStream(webpack_server_config, webpack, webpack_callback))
    .pipe(gulp.dest('build'))
})

gulp.task('webpack-client-dist', () =>  {
  gulp
    .src(config.client_entry)
    .pipe(webpackStream(webpack_client_prod_config, webpack, webpack_callback))
    .pipe(gulp.dest('build/static'))
})

gulp.task('setNODEENVtoProd', () => {
  process.env.NODE_ENV = 'production';// this is so .babelrc will know whether to run hmr plugins or not
})

gulp.task('setNODEENVtoDev', () => {
  process.env.NODE_ENV = 'development';// this is so .babelrc will know whether to run hmr plugins or not
})

gulp.task('webpack-dist', () => {
  sequence(
    'setNODEENVtoProd',
    'webpack-server-dist',
    'webpack-client-dist'
  )
})

gulp.task('webpack-dev', () => {
  sequence(
    'setNODEENVtoDev',
    'webpack'
  )
})

gulp.task('watch', () =>  {
  const watchPaths = [
    path.join(__dirname,'src/**/*.js'),
    path.join(__dirname,'src/**/*.jsx'), 
    path.join(__dirname,'src/**/*.html'),
    path.join(__dirname,'src/**/*.scss'),
    path.join(__dirname,'src/**/*.sass'),
    path.join(__dirname,'src/**/*.css')
  ];
  gulp.watch(watchPaths, ['webpack-dev']);
});

// Default task. Type 'gulp' in terminal to get build system going.
gulp.task('default', ['webpack-dev','watch'], () =>  {
  gutil.log('watching...');
});

gulp.task('generate', () => {
  if (!argv.name || !argv.path){
    console.log("############################");
    console.log("COMPONENT TEMPLATES ARE NOT GENERATED");
    console.log("usage: gulp generate --path ./somepath --name nameOfComponent");
    console.log("############################");
  }
  else{
    gulp.src(path.join(config.generator_component_path,"*"))
    .pipe(ejs({
      name: argv.name
    }).on('error',(e)=>{console.log(e);}))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp',argv.name);
    }))
    .pipe(gulp.dest(path.join(process.env.INIT_CWD,argv.path)));
  }
})

gulp.task('dist', false, () =>  {
  sequence(
    'clean',
    'webpack-dist'
  );
});

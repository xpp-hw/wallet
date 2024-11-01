const gulp = require('gulp');
const del = require('del');
const zip = require('gulp-zip');
const moment = require('moment');
const hashsum = require('gulp-hashsum');
const through = require('through2');

let zipName = `wallet_dist_${moment(new Date()).format('YYYYMMDD')}.zip`;

if (process.argv[3] && process.argv[3] === '--tags') {
    if (!process.argv[4] || process.argv[4].indexOf('v') === -1) {
        throw new Error('打包版本号丢失, 请重新运行');
    } else {
        zipName = `wallet_dist_${process.argv[4]}.zip`;
    }
}

// 清除目标目录
function delDist() {
    return del(['./dist/']);
}

gulp.task('delDist', delDist);

// 注册 zip 任务
gulp.task('buildzip', () => gulp.src('./dist/**/*')
    .pipe(zip(zipName))
    .pipe(hashsum({
        stream: true,
        hash: 'md5'
    }))
    .pipe(gulp.dest('./dist')));

gulp.task('zip', gulp.series('buildzip'), () => gulp.src('./dist/MD5SUMS')
    .pipe(through.obj((file, encode, cb) => {
        console.log('以下为投产包 MD5 值，如投产不生效，可让版本组检查下投产包的 MD5 是否一致');
        console.log(file.contents.toString());
        cb();
    })));

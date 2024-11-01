/* eslint-disable no-shadow */
const webpack = require("webpack");
const path = require("path");
const poststylus = require("poststylus");
const pxtorem = require("postcss-pxtorem");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const resolve = (file) => path.resolve(__dirname, file);
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    lintOnSave: false,
    publicPath: process.env.BASE_URL,
    assetsDir: "static",
    productionSourceMap: false,
    transpileDependencies: ["mand-mobile"],
    configureWebpack: (config) => {
        // 移除console debugger
        if (process.env.NODE_ENV === "production") {
            // eslint-disable-next-line no-param-reassign
            config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
            // eslint-disable-next-line no-param-reassign
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            // eslint-disable-next-line no-param-reassign
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
            // eslint-disable-next-line no-param-reassign
            // config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs =
            //     ["console.log"];

            // 开启gz压缩
            // config.plugins.push(new CompressionWebpackPlugin({
            //     algorithm: 'gzip',
            //     test: /\.js$|\.html$|\.json$|\.css/,
            //     threshold: 10240, // 超过10kb压缩
            //     minRatio: 0.8,
            //     deleteOriginalAssets: false,
            // }))
        }

        return {
            resolve: {
                alias: {
                    vue$: "vue/dist/vue.esm.js", // 'vue/dist/vue.common.js' for webpack 1
                },
            },
            plugins: [
                new webpack.IgnorePlugin(/^\.\/locale/, /moment$/),
            ],
        };
    },
    chainWebpack: (config) => {
        config.externals({
            axios: "axios",
            vue: "Vue",
            "vue-router": "VueRouter",
            vuex: "Vuex",
        });
        config.optimization.minimize = true;
        config.optimization.minimizer = [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // 移除console语句
                        drop_debugger: true, // 移除debugger语句
                    },
                    mangle: {
                        toplevel: true, // 对顶层作用域的变量和函数进行混淆。
                        reserved: ['$'] // 保留特定的变量名，这里保留$，通常用于jQuery等库。
                    },
                    output: {
                        comments: false, // 移除所有的注释
                        beautify: false // 不美化代码
                    },
                    ecma: 5,
                    module: true, // 适用于ES6模块
                },
            }),
        ]


        const svgRule = config.module.rule("svg");

        svgRule.uses.clear();

        svgRule.include
            .add(resolve("./src/assets/images"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .end()
            .use("svgo-loader")
            .loader("svgo-loader");

        config.plugin("html").tap((args) => {
            // eslint-disable-next-line no-param-reassign
            args[0].template =
                process.env.VUE_APP_ENV === "prod" ||
                    process.env.VUE_APP_ENV === "local"
                    ? "template/index.html"
                    : "template/index.dev.html";
            return args;
        });

        // source-map配置
        // config.when(process.env.NODE_ENV === "development", (config) =>
        //     config.devtool("cheap-source-map")
        // );

        // 生产环境相关配置
        config.when(process.env.NODE_ENV !== "development", (config) => {
            // config
            //     .plugin("ScriptExtHtmlWebpackPlugin")
            //     .after("html")
            //     .use("script-ext-html-webpack-plugin", [
            //         {
            //             inline: /runtime\..*\.js$/,
            //         },
            //     ])
            //     .end();

            config.optimization.splitChunks({
                chunks: "all",
                cacheGroups: {
                    libs: {
                        name: "chunk-libs",
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: "initial",
                    },
                    // 抽离自定义工具库
                    mandmobile: {
                        name: "chunk-mandmobile", // 单独将 elementUI 拆包
                        priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                        test: /[\\/]node_modules[\\/]mand-mobile[\\/]/,
                    },
                    commons: {
                        name: "chunk-commons",
                        test: resolve('src/components'),
                        minChunks: 3,
                        priority: 5,
                        reuseExistingChunk: true,
                    },
                },
            });
            config.optimization.runtimeChunk("single");
        });

        config.when(process.env.NODE_ENV === "development", (config) => {
            config.devtool("source-map");
        });
        // config.when(process.env.NODE_ENV === "production", (config) => {
        //   config.performance.set("hints", false);
        //   config.devtool("none");
        //   config.plugin("compression").use(CompressionWebpackPlugin, [
        //     {
        //       filename: "[path][base].gz[query]", // 压缩后的文件名(保持原文件名，后缀加.gz)
        //       algorithm: "gzip",  // 使用gzip压缩
        //       test: /\.(js|css)$/,  // 匹配文件名
        //       threshold: 8192, // 对超过的数据压缩
        //       minRatio: 0.8,  // 压缩率小于1才会压缩
        //       deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
        //     },
        //   ]);
        // });

        // config
        //   .when(process.env.NODE_ENV !== 'development',
        //     config => {
        //       config
        //         .optimization.splitChunks({
        //           chunks: 'all',//对同步异步加载资源都进行处理
        //           maxInitialRequests: Infinity,
        //           minSize: 20000,//单包最小20KB
        //           maxSize: 500000,//最大500KB
        //           cacheGroups: {
        //             vendors: {
        //               test: /[\\/]node_modules[\\/]/,
        //               priority: -10,
        //               name(module) {
        //                 const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
        //                 return `nodemodules.${packageName.replace('@', '')}`
        //                 //nodemodules是自己命名的，为了区分依赖和项目自身打包块
        //               }
        //             }
        //           }
        //         })
        //       config.optimization.runtimeChunk('single')
        //     }
        //   )

        // 移除 prefetch 插件
        config.plugins.delete("prefetch");
        // 移除 preload 插件
        config.plugins.delete("preload");
    },
    devServer: {
        disableHostCheck: true,
        host: "0.0.0.0",
        open: true,
        // https: true,
        http2: false,
        proxy: {
            "fintech/wallet/": {
                // target: 'http://36.152.65.114:8011',
                // 测试环境
                // target: "http://183.207.110.250:8011",
                // 正式环境
                target: 'https://fintech.12580life.com',
                // target: 'http://192.168.50.118:8011',
                // target: 'http://192.168.1.107:8380',
                // target: 'http://192.168.100.217:8380',
                onProxyRes(proxyRes) {
                    // eslint-disable-next-line no-param-reassign
                    proxyRes.headers["Content-Type"] =
                        "application/json;charset=UTF-8";
                },
            },
            "fintech/tripartite/": {
                // target: 'http://36.152.65.114:8011',
                // 测试环境
                target: "https://fintech.12580life.com",
                // 正式环境
                // target: 'https://fintech.12580life.com',
                // target: 'http://192.168.50.118:8011',
                // target: 'http://192.168.1.107:8880',
                // target: 'http://192.168.100.248:8880',
                onProxyRes(proxyRes) {
                    // eslint-disable-next-line no-param-reassign
                    proxyRes.headers["Content-Type"] =
                        "application/json;charset=UTF-8";
                },
            },
        },
    },
    css: {
        loaderOptions: {
            stylus: {
                
                import: [resolve("./src/assets/theme.custom")],
            },
        },
    },
};

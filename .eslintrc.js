module.exports = {
    root: true,
    env: {
        node: true,
        es6: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb'
    ],
    globals: {
        window: true,
        document: true,
        wVue: true,
        wx: true,
        WeixinJSBridge: true,
        lib: true,
        createjs: true,
        RSACOMM: true,
        BMap: true
    },
    rules: {
        'linebreak-style': 'off',
        'no-lonely-if': 'off',
        'global-require': 0,
        indent: [2, 4, { SwitchCase: 1 }],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // "no-alert": process.env.NODE_ENV === "production" ? 2 : 0,
        'no-trailing-spaces': 2,
        'comma-dangle': [2, 'never'],
        'import/no-unresolved': [0, { commonjs: true, amd: true }], // 添加这一行
        'import/extensions': ['off', 'always', { // 设为 off
            js: 'never',
            vue: 'never'
        }],
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'state', // for vuex state
                'acc', // for reduce accumulators
                'e' // for e.returnvalue
            ]
        }],
        'import/no-extraneous-dependencies': 0,
        'import/imports-first': 'off',
        'consistent-return': ['error', { treatUndefinedAsUnspecified: false }],
        'max-len': ['error', 560, 2, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true
        }],
        'prefer-promise-reject-errors': 'off',
        'vue/no-unused-components': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
};

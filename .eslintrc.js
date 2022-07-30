module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'google'
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'rules': {
    // 代码风格
        'block-spacing': [2, 'always'],
        'brace-style': [2, '1tbs', {
            'allowSingleLine': true
        }],
        'comma-spacing': [2, {
            'before': false,
            'after': true
        }],
        'comma-dangle': [2, 'never'],
        'comma-style': [2, 'last'],
        'computed-property-spacing': [2, 'never'],
        'indent': [2, 4, {
            'SwitchCase': 1
        }],
        'key-spacing': [2, {
            'beforeColon': false,
            'afterColon': true
        }],
        'keyword-spacing': [2, {
            'before': true,
            'after': true
        }],
        'linebreak-style': 0,
        'multiline-ternary': [2, 'always-multiline'],
        'no-multiple-empty-lines': [2, {
            'max': 1
        }],
        'no-unneeded-ternary': [2, {
            'defaultAssignment': false
        }],
        'quotes': [2, 'single'],
        'semi': [2, 'never'],
        'space-before-blocks': [2, 'always'],
        'space-before-function-paren': [2, 'never'],
        'space-in-parens': [2, 'never'],
        'space-infix-ops': 2,
        'space-unary-ops': [2, {
            'words': true,
            'nonwords': false
        }],
        'spaced-comment': [2, 'always', {
            // eslint-disable-next-line max-len
            'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
        }],
        'switch-colon-spacing': [2, {
            'after': true,
            'before': false
        }],
        'object-curly-spacing': [2, 'always'],
        // ES6
        'arrow-parens': [2, 'as-needed'],
        'arrow-spacing': [2, {
            'before': true,
            'after': true
        }]
    }
}

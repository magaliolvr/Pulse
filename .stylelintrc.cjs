module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-tailwindcss'
    ],
    plugins: [],
    rules: {
        // Allow Tailwind's arbitrary properties and custom functions
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind', 'apply', 'layer', 'variants', 'responsive', 'screen']
            }
        ],
        'no-descending-specificity': null
        ,
        'custom-property-empty-line-before': null // Desabilita a regra para evitar conflitos com Tailwind CSS
    }
};

module.exports = {
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-recommended",
    "stylelint-config-prettier"
  ],
  "plugins": [
    "stylelint-order"
  ],
  "rules": {
    "length-zero-no-unit": [
      true,
      {
        "ignore": ["custom-properties"]
      }
    ],
    "declaration-colon-newline-after": null,
    "declaration-empty-line-before": null,
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": [
          "define-mixin",
          "mixin"
        ]
      }
    ],
    "at-rule-empty-line-before": [
      "always",
      {
        "except": [
          "first-nested",
          "blockless-after-same-name-blockless"
        ]
      }
    ],
    "declaration-block-no-duplicate-properties": true,
    "number-leading-zero": "always",
    "value-list-comma-newline-after": null,
    "selector-type-case": null,
    "selector-type-no-unknown": [
      true,
      {
        "ignoreTypes": [
          "$dummyValue",
          "foreignObject"
        ]
      }
    ],
    "selector-class-pattern": "^[a-z][a-zA-Z0-9]+$",
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": [
          "global"
        ]
      }
    ],
    "no-descending-specificity": null,
    "selector-nested-pattern": /(^(&|:)(?![_a-zA-Z]).*$)|(^(?![&_a-zA-Z]).*$)/m,
    "selector-pseudo-class-blacklist": ["root"],
    "rule-empty-line-before": [
      "always",
      { ignore: ["after-comment", "first-nested"] }
    ],
    "order/order": [
			"custom-properties",
			"declarations"
		],
    "order/properties-order": [
      [
        {
          emptyLineBefore: 'always',
          noEmptyLineBetween: true,
          properties: [
            'font',
            'font-family',
            'font-size',
            'font-weight',
            'font-style',
            'font-variant',
            'font-size-adjust',
            'font-stretch',
            'font-effect',
            'font-emphasize',
            'font-emphasize-position',
            'font-emphasize-style',
            'font-smooth',
            'line-height'
          ]
        },
        {
          emptyLineBefore: 'always',
          noEmptyLineBetween: true,
          properties: [
            'position',
            'z-index',
            'top',
            'right',
            'bottom',
            'left'
          ]
        },
        {
          emptyLineBefore: 'always',
          noEmptyLineBetween: true,
          properties: [
            'display',
            'visibility',
            'float',
            'clear',
            'overflow',
            'overflow-x',
            'overflow-y',
            'clip',
            'zoom',
            'align-content',
            'align-items',
            'align-self',
            'flex',
            'flex-basis',
            'flex-direction',
            'flex-flow',
            'flex-grow',
            'flex-shrink',
            'flex-wrap',
            'justify-content',
            'order'
          ]
        },
        {
          emptyLineBefore: 'always',
          noEmptyLineBetween: true,
          properties: [
            'box-sizing',
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left'
          ]
        },
        {
          emptyLineBefore: 'always',
          noEmptyLineBetween: true,
          properties: [
            'table-layout',
            'empty-cells',
            'caption-side',
            'border-spacing',
            'border-collapse',
            'list-style',
            'list-style-position',
            'list-style-type',
            'list-style-image'
          ]
        },
        {
          emptyLineBefore: 'always',
          noEmptyLineBetween: true,
          properties: [
            'content',
            'quotes',
            'counter-reset',
            'counter-increment',
            'resize',
            'cursor',
            'user-select',
            'nav-index',
            'nav-up',
            'nav-right',
            'nav-down',
            'nav-left',
            'text-align',
            'text-align-last',
            'vertical-align',
            'white-space',
            'text-decoration',
            'text-emphasis',
            'text-emphasis-color',
            'text-emphasis-style',
            'text-emphasis-position',
            'text-indent',
            'text-justify',
            'letter-spacing',
            'word-spacing',
            'text-outline',
            'text-rendering',
            'text-transform',
            'text-wrap',
            'text-overflow',
            'text-overflow-ellipsis',
            'text-overflow-mode',
            'word-wrap',
            'word-break',
            'tab-size',
            'hyphens',
            'pointer-events'
          ]
        },
        {
          emptyLineBefore: 'always',
          noEmptyLineBetween: true,
          properties: [
            'opacity',
            'color',
            'border',
            'border-width',
            'border-style',
            'border-color',
            'border-top',
            'border-top-width',
            'border-top-style',
            'border-top-color',
            'border-right',
            'border-right-width',
            'border-right-style',
            'border-right-color',
            'border-bottom',
            'border-bottom-width',
            'border-bottom-style',
            'border-bottom-color',
            'border-left',
            'border-left-width',
            'border-left-style',
            'border-left-color',
            'border-radius',
            'border-top-left-radius',
            'border-top-right-radius',
            'border-bottom-right-radius',
            'border-bottom-left-radius',
            'border-image',
            'border-image-source',
            'border-image-slice',
            'border-image-width',
            'border-image-outset',
            'border-image-repeat',
            'outline',
            'outline-width',
            'outline-style',
            'outline-color',
            'outline-offset',
            'background',
            'background-color',
            'background-image',
            'background-repeat',
            'background-attachment',
            'background-position',
            'background-position-x',
            'background-position-y',
            'background-clip',
            'background-origin',
            'background-size',
            'box-decoration-break',
            'box-shadow',
            'text-shadow'
          ]
        },
        {
          emptyLineBefore: 'always',
          noEmptyLineBetween: true,
          properties: [
            'transition',
            'transition-delay',
            'transition-timing-function',
            'transition-duration',
            'transition-property',
            'transform',
            'transform-origin',
            'animation',
            'animation-name',
            'animation-duration',
            'animation-play-state',
            'animation-timing-function',
            'animation-delay',
            'animation-iteration-count',
            'animation-direction',
            'animation-fill-mode',
            'will-change'
          ]
        }
      ]
    ]
  }
}

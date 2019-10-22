module.exports = {
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-recommended",
    "stylelint-config-prettier"
  ],
  "rules": {
    "declaration-colon-newline-after": null,
    "declaration-empty-line-before": null,
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
          "$dummyValue"
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
    "selector-nested-pattern": "^(&(?![a-zA-Z]).(.*))|(^(?![&a-zA-Z]).(.*))$",
    "selector-pseudo-class-blacklist": ["root"],
    "rule-empty-line-before": [
      "always",
      { ignore: ["after-comment", "first-nested" ] }
    ]
  }
}

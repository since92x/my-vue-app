"use strict";

const { getResolvedPath } = require("./tools/utils");

module.exports = {
  root: true,
  extends: ["plugin:vue/recommended", "standard"],
  plugins: ["html", "vue"],
  settings: {
    "import/resolver": {
      webpack: {
        config: {
          resolve: {
            extensions: [".js", ".css", ".vue"],
            alias: {
              vue$: "vue/dist/vue.esm.js",
              "@": getResolvedPath("src")
            }
          }
        }
      }
    }
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true
  },
  rules: {
    "no-new": "off",
    "generator-star-spacing": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "semi": 0,
    "quotes": 0,
    "comma-dangle": 0,
    "camelcase": 0,
    "no-mixed-operators": 0,
    "no-void": 0,
    "space-before-function-paren": 0,
    "space-infix-ops": 0,
    "no-prototype-builtins": 0,
    "vue/attributes-order": 0,
    "vue/order-in-components": 0,
    "vue/no-v-html": 0
  }
};

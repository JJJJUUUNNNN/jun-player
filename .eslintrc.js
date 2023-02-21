// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue
    "plugin:vue/vue3-essential",
    "standard",
  ],
  rules: {
    eqeqeq: "off",
    "vue/multi-word-component-names": "off",
  },
};

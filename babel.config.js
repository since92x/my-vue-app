module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: "> 0.25%, not dead",
        useBuiltIns: "usage",
        corejs: 3
      }
    ]
  ];
  const plugins = [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
        useESModules: true
      }
    ]
  ];

  return {
    presets,
    plugins
  };
};

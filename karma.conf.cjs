module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      { pattern: "karma-dist/utils/*.js", type: "module" },
      { pattern: "karma-dist/karma/*.js", type: "module" },
    ],
    preprocessors: {},
    reporters: ["progress"],
    browsers: ["ChromeHeadless"],
    singleRun: true,
    autoWatch: false,
  });
};
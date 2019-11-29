"use strict";

class CleanUpPlugin {
  constructor(options = {}) {
    const { message, onlyInWatchMode = true } = options;

    this.message = message;
    this.onlyInWatchMode = onlyInWatchMode;
  }

  apply(compiler) {
    compiler.hooks.afterCompile.tap("CleanTerminalPlugin", () => {
      if (this.shouldClearConsole(compiler)) {
        this.clearConsole();
      }
    });
  }

  shouldClearConsole(compiler) {
    if (this.onlyInWatchMode) {
      return Boolean(compiler.watchMode);
    }

    const isNodeEnvProduction = process.env.NODE_ENV === "production";
    const isOptionsModeProduction = Boolean(
      compiler.options && compiler.options.mode === "production"
    );

    return !isNodeEnvProduction && !isOptionsModeProduction;
  }

  clearConsole() {
    const clear = "\x1B[2J\x1B[3J\x1B[H";
    const output = this.message ? `${clear + this.message}` : clear;
    process.stdout.write(output);
  }
}

module.exports = CleanUpPlugin;

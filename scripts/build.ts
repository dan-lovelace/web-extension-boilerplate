import fs from "node:fs";

import chalk from "chalk";
import { execa } from "execa";

import { clean, OUT_DIR } from "./lib/common";
import { getManifestVersion, writeManifestJSON } from "./lib/manifest";

function main() {
  const manifestVersion = getManifestVersion();

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  clean();

  execa({
    stderr: ["pipe", "inherit"],
    stdout: ["pipe", "inherit"],
  })`lerna run build`
    .then(() => {
      writeManifestJSON(manifestVersion);
    })
    .catch(() => {
      clean();

      console.log(
        chalk.red("One or more of your builds failed. Check the output above.")
      );
      process.exit(1);
    });
}

main();

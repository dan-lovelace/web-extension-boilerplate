import fs from "fs";

import chalk from "chalk";

import { clean, OUT_DIR } from "./lib/common";
import { spawnProcess } from "./lib/spawn";
import { getManifestVersion, writeManifestJSON } from "./lib/manifest";

function main() {
  const manifestVersion = getManifestVersion();

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  clean();

  spawnProcess("lerna", ["run", "build"], {
    onError: () => {
      clean();

      console.log(
        chalk.red("One or more of your builds failed. Check the output above.")
      );
    },
    onSuccess: () => {
      writeManifestJSON(manifestVersion);
    },
  });
}

main();

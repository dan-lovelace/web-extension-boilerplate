import fs from "node:fs";

import chalk from "chalk";
import { execa } from "execa";

import { VERSIONS_DIR } from "./lib/common";
import { getManifestVersion, postProcessManifest } from "./lib/manifest";
import { getPackageFilename, zipPackage } from "./lib/zip";

function handleError() {
  console.log("❌", chalk.red("Package not successful"));
}

function main() {
  const manifestVersion = getManifestVersion();
  const packageFilename = getPackageFilename(manifestVersion);

  if (fs.existsSync(packageFilename)) {
    throw new Error(`Package already exists: ${packageFilename}`);
  }

  execa({
    stderr: ["pipe", "inherit"],
    stdout: ["pipe", "inherit"],
  })`npm run build ${manifestVersion}`
    .then(async () => {
      if (!fs.existsSync(VERSIONS_DIR)) {
        fs.mkdirSync(VERSIONS_DIR);
      }

      postProcessManifest(manifestVersion);

      try {
        await zipPackage(packageFilename);

        console.log(
          "📦",
          chalk.green("Package successful"),
          chalk.dim(packageFilename)
        );
      } catch (_) {
        handleError();
      }
    })
    .catch(() => {
      handleError();
    });
}

main();

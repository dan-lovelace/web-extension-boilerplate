import { execa } from "execa";

import { clean } from "./lib/common";
import { getManifestVersion, writeManifestJSON } from "./lib/manifest";

async function main() {
  const manifestVersion = getManifestVersion();

  clean();
  writeManifestJSON(manifestVersion);

  execa({
    stderr: ["pipe", "inherit"],
    stdout: ["pipe", "inherit"],
  })`lerna run start`.catch(() => {
    /**
     * NOTE: Explicitly do nothing because Lerna emits its own errors.
     */
  });
}

main();

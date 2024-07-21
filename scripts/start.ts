import { clean } from "./lib/common";
import { getManifestVersion, writeManifestJSON } from "./lib/manifest";
import { spawnProcess } from "./lib/spawn";

function main() {
  const manifestVersion = getManifestVersion();

  clean();
  writeManifestJSON(manifestVersion);
  spawnProcess("lerna", ["run", "start"]);
}

main();

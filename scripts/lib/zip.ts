import fs from "fs";
import path from "path";

import archiver from "archiver";

import { ManifestVersion, OUT_DIR, VERSIONS_DIR } from "./common";

export function getPackageFilename(manifestVersion: ManifestVersion) {
  const packageJson = fs.readFileSync("package.json", "utf-8");
  const { name, version: packageVersion } = JSON.parse(packageJson);

  return path.join(
    VERSIONS_DIR,
    `${name}_${packageVersion}_m${manifestVersion}.zip`
  );
}

export function zipPackage(packageFilename: string) {
  if (!fs.existsSync(VERSIONS_DIR)) {
    fs.mkdirSync(VERSIONS_DIR);
  }

  const output = fs.createWriteStream(packageFilename);
  const archive = archiver("zip", {
    zlib: {
      level: 9,
    },
  });

  archive.on("error", (archiveError) => {
    throw archiveError;
  });

  archive.pipe(output);
  archive.glob("**/*", {
    cwd: OUT_DIR,
    ignore: [".DS_Store"],
  });
  archive.finalize();

  return new Promise<void>((res) => {
    output.on("close", () => {
      res();
    });
  });
}

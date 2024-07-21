/* eslint-disable no-console */
import { exec } from "child_process";
import fs from "fs";
import path from "path";

import archiver from "archiver";

const __dirname = process.cwd();
const DIST_DIR = "dist";
const VERSIONS_DIR = "versions";

function main() {
  const manifestVersion = process.argv[2];
  const packageJson = fs.readFileSync("package.json", "utf-8");
  const { name, version: packageVersion } = JSON.parse(packageJson);
  const outputFile = path.join(
    __dirname,
    VERSIONS_DIR,
    `${name}_${packageVersion}_m${manifestVersion}.zip`
  );

  if (fs.existsSync(outputFile)) {
    throw new Error(`Output file already exists: ${outputFile}`);
  }

  exec(`npm run build ${manifestVersion}`, (execError, stdout, stderr) => {
    if (execError) {
      console.log(stderr);
      process.exit(1);
    }

    if (!fs.existsSync(VERSIONS_DIR)) {
      fs.mkdirSync(VERSIONS_DIR);
    }

    if (manifestVersion === "2") {
      // remove development settings from manifest
      const manifestLocation = path.join(__dirname, DIST_DIR, "manifest.json");
      const versionJSON = JSON.parse(
        fs.readFileSync(manifestLocation, "utf-8")
      );

      delete versionJSON["browser_specific_settings"];
      fs.writeFileSync(manifestLocation, JSON.stringify(versionJSON), "utf-8");
    }

    const output = fs.createWriteStream(outputFile);
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
      cwd: DIST_DIR,
      ignore: [".DS_Store"],
    });
    archive.finalize();

    output.on("close", () => {
      console.log(stdout);
    });
  });
}

main();

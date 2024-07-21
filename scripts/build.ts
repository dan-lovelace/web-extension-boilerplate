/* eslint-disable no-console */
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const OUT_DIR = "dist";

function writeManifest() {
  const { manifestJSON, version: packageVersion } = JSON.parse(
    fs.readFileSync("package.json", "utf-8")
  );
  const [, , manifestVersion] = process.argv;

  if (!["2", "3"].includes(manifestVersion)) {
    console.log("Invalid manifest version. Available options: 2, 3");
    console.log("Usage:\n\n");
    console.log("node build.mjs 3");
    process.exit(1);
  }

  const versionJSON = manifestJSON[`v${manifestVersion}`];
  const manifest = {
    ...versionJSON,
    version: packageVersion,
  };

  fs.writeFileSync(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const lernaProcess = spawn("lerna", ["run", "build"], { shell: true });
  let stderr = "";

  lernaProcess.stderr.on("data", (data) => {
    stderr += data.toString();
  });

  lernaProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  lernaProcess.on("close", (code) => {
    if (code !== 0) {
      console.error(`Build error: ${stderr}`);
      process.exit(1);
    } else {
      writeManifest();
    }
  });
}

main();

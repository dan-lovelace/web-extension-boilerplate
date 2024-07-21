import fs from "fs";
import path from "path";

import { z } from "zod";

import { allManifestVersions, ManifestVersion, OUT_DIR } from "./common";

const manifestLocation = path.join(OUT_DIR, "manifest.json");
const validatedVersion: z.ZodType<ManifestVersion> = z.lazy(() =>
  z.union([...allManifestVersions.map((option) => z.literal(option))] as [
    z.ZodLiteral<ManifestVersion>,
    z.ZodLiteral<ManifestVersion>
  ])
);

/**
 * Gets the given manifest version's JSON from `package.json` and returns an
 * object ready to be used as an extension's `manifest.json`.
 */
function getManifestJSON(versionNumber: ManifestVersion) {
  const { manifestJSON, version: packageVersion } = JSON.parse(
    fs.readFileSync("package.json", "utf-8")
  );

  const versionJSON = manifestJSON[`v${versionNumber}`];
  const manifest = {
    ...versionJSON,
    version: packageVersion,
  };

  return manifest;
}

/**
 * Reads user input given to a script and tries to extract a valid manifest
 * version.
 * @example
 * The following command will return a manifest version of "3":
 * ```sh
 * npm run build 3
 * ```
 */
export function getManifestVersion() {
  const [, , manifestVersionRaw] = process.argv;
  const manifestVersionInput = String(manifestVersionRaw).trim();

  if (!manifestVersionInput) {
    throw new Error("Missing manifest version.");
  }

  try {
    return validatedVersion.parse(manifestVersionInput);
  } catch (_) {
    throw new Error(
      `Invalid manifest version provided. Must be one of: ${allManifestVersions.join(
        ", "
      )}`
    );
  }
}

/**
 * Rewrites a build's `manifest.json` in prepartion of publishing a new package
 * on one of the extension stores.
 */
export function postProcessManifest(versionNumber: ManifestVersion) {
  if (versionNumber === "2") {
    const versionJSON = JSON.parse(fs.readFileSync(manifestLocation, "utf-8"));

    delete versionJSON["browser_specific_settings"];

    fs.writeFileSync(
      manifestLocation,
      JSON.stringify(versionJSON, null, 2),
      "utf-8"
    );
  }
}

/**
 * Writes a build's `manifest.json` to a given version's specification
 * described in `package.json` under `manifestJSON`.
 */
export function writeManifestJSON(versionNumber: ManifestVersion) {
  const manifestJSON = getManifestJSON(versionNumber);

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR);
  }

  fs.writeFileSync(
    manifestLocation,
    JSON.stringify(manifestJSON, null, 2),
    "utf-8"
  );
}

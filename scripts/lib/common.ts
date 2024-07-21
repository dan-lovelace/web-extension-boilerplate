import { execSync } from "child_process";

export type ManifestVersion = (typeof allManifestVersions)[number];

export const OUT_DIR = "dist";
export const VERSIONS_DIR = "versions";

export const allManifestVersions = ["2", "3"] as const;

export function clean() {
  execSync("rimraf dist");
}

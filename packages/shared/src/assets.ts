import { browser } from "./browser";

const {
  runtime: { getURL },
} = browser;

/**
 * Constructs the fully-qualified URL of an asset in the `public` directory. If
 * no path is provided, the asset directory base path is returned.
 * @param path Path of the asset relative to the `assets` directory
 * @example
 * ```js
 * const logoSrc = getAssetURL("img/logo_64.png");
 * ```
 */
export function getAssetURL(path?: string) {
  const assetBase = "assets";

  return path ? getURL(`${assetBase}/${path}`) : getURL(assetBase);
}

import { browser } from "./browser";

const {
  runtime: { getURL },
} = browser;

export function getPublicURL(path?: string) {
  const assetBase = "assets";

  return path ? getURL(`${assetBase}/${path}`) : getURL(assetBase);
}

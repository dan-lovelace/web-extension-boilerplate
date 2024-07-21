import { browser, logDebug } from "@wexb/shared";

browser.runtime.onInstalled.addListener(async () => {
  logDebug("Extension installed");
});

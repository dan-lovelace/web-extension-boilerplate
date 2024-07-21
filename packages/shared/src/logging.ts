export function logDebug(...data: any[]) {
  console.log(
    "%cweb-extension-boilerplate%c:",
    "color: #ff6600",
    "color: unset",
    ...data
  );
}

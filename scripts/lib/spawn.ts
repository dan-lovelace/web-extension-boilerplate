import { spawn } from "child_process";

type SpawnProcessOptions = {
  onError?: (message: string) => void;
  onSuccess?: () => void;
};

/**
 * Spawns a new process and logs its standard output stream. If the process is
 * closed by an error being thrown, all standard error lines are logged to the
 * console.
 */
export function spawnProcess(
  command: string,
  args?: readonly string[],
  options?: SpawnProcessOptions
) {
  const { onSuccess, onError } = options || {};

  const spawned = spawn(command, args, { shell: true });

  // capture all lines of stderr data
  let stderr = "";
  spawned.stderr.on("data", (data) => {
    stderr += data.toString();
  });

  // stream stdout straight to console
  spawned.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  // close handlers
  spawned.on("close", (code) => {
    if (code !== 0) {
      if (typeof onError === "function") {
        onError(stderr);
      }

      process.exit(code);
    } else {
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    }
  });
}

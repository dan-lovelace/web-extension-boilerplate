import readline from "node:readline";

import chalk from "chalk";
import path from "path";
import { ReplaceInFileConfig, replaceInFileSync } from "replace-in-file";
import { z, ZodError } from "zod";

type InitConfig = {
  extensionName: string;
  packagePrefix: string;
  projectName: string;
};

const DEFAULT_EXTENSION_NAME = "Web Extension Boilerplate";
const DEFAULT_PACKAGE_PREFIX = "@wexb";
const DEFAULT_PROJECT_NAME = "web-extension-boilerplate";

const __dirname = process.cwd();

const commonReplaceOptions: ReplaceInFileConfig = {
  dry: true,
  files: path.join(__dirname, "**", "*"),
  ignore: [
    path.join(__dirname, "dist", "**", "*"),
    path.join(__dirname, "node_modules", "**", "*"),
    path.join(__dirname, "scripts", "**", "*"),
    path.join(__dirname, "README.md"),
  ],
};

const validatedInitConfig: z.ZodType<InitConfig> = z.lazy(() =>
  z.object({
    projectName: z.string().trim().min(1),
    extensionName: z.string().trim().min(1),
    packagePrefix: z.string().trim().min(1),
  })
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function buildConfirmationMessage(config: InitConfig) {
  const message = `
    ####################
    Confirmation
    ####################

    ${chalk.yellow(
      "Proceed with caution. It may be difficult to change these later."
    )}

      Extension name: '${chalk.green(
        config.extensionName
      )}'. This will be presented in the extension stores\nwhen users are searching for extensions.

      Project name: '${chalk.green(
        config.projectName
      )}'. If you make your extension's code available to\nthe public, this is what they'll use locally when making contributions.

      Package prefix: '${chalk.green(
        config.packagePrefix
      )}'. When you need to use some shared code between\npackages, your import statements will look like this: '${chalk.blue(
    `@${config.packagePrefix}/types`
  )}'.

    Does this look right? [Y/n]`;

  return trimLiteral(message);
}

async function getConfig() {
  return new Promise<InitConfig>((res, rej) => {
    rl.question(
      "Extension name (example: My Cool Extension): ",
      (extensionName) => {
        rl.question(
          "Project name (example: my-cool-extension): ",
          (projectName) => {
            rl.question("Package prefix (example: mce): ", (packagePrefix) => {
              console.log("");

              try {
                const validated = validatedInitConfig.parse({
                  extensionName,
                  packagePrefix,
                  projectName,
                });

                if (
                  new Set([
                    extensionName.trim().toLowerCase(),
                    packagePrefix.trim().toLowerCase(),
                    projectName.trim().toLowerCase(),
                  ]).size !== 3
                ) {
                  console.log(
                    chalk.red("You may not choose the same name twice.")
                  );
                  return rl.close();
                }

                rl.question(
                  buildConfirmationMessage(validated) + " ",
                  (response) => {
                    if (response.trim().toLowerCase() !== "y") {
                      console.log("Aborting initialization");
                      return rl.close();
                    }

                    console.log(`Initializing ${validated.extensionName}...`);

                    rl.close();
                    res(validated);
                  }
                );
              } catch (error) {
                console.log(
                  "Something went wrong validating your input. Please address the following issues and try again."
                );

                if (error instanceof ZodError) {
                  console.log(error.errors);
                } else {
                  console.log(error);
                }

                rl.close();
              }
            });
          }
        );
      }
    );
  });
}

function trimLiteral(literal: string) {
  return literal
    .split("\n")
    .map((s) => s.trim())
    .join("\n");
}

async function main() {
  const initConfig = await getConfig();

  console.log("initConfig", initConfig);

  try {
    console.log("Replacing extension name");
    const extensionNameResults = replaceInFileSync({
      ...commonReplaceOptions,
      from: DEFAULT_EXTENSION_NAME,
      to: initConfig.extensionName,
    });
    console.log(
      "extensionNameResults",
      extensionNameResults.filter((r) => r.hasChanged)
    );

    console.log("Replacing project name");
    const projectNameResults = replaceInFileSync({
      ...commonReplaceOptions,
      from: DEFAULT_PROJECT_NAME,
      to: initConfig.projectName,
    });
    console.log(
      "projectNameResults",
      projectNameResults.filter((r) => r.hasChanged)
    );

    console.log("Replacing package prefix");
    const packagePrefixResults = replaceInFileSync({
      ...commonReplaceOptions,
      from: DEFAULT_PACKAGE_PREFIX,
      to: initConfig.packagePrefix,
    });
    console.log(
      "packagePrefixResults",
      packagePrefixResults.filter((r) => r.hasChanged)
    );
  } catch (err) {
    console.log("err", err);
  }
}

main();

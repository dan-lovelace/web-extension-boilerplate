import nodeReadLine from "node:readline";
import path from "node:path";

import chalk from "chalk";
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

const commonReplaceOptions: ReplaceInFileConfig = {
  files: path.join("**", "*"),
  ignore: [
    path.join("dist", "**", "*"),
    path.join("node_modules", "**", "*"),
    path.join("scripts", "**", "*"),
    path.join("README.md"),
  ],
};

const readLine = nodeReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const validatedInitConfig: z.ZodType<InitConfig> = z.lazy(() =>
  z.object({
    projectName: z.string().trim().min(1),
    extensionName: z.string().trim().min(1),
    packagePrefix: z.string().trim().min(1),
  })
);

function buildConfirmationMessage(config: InitConfig) {
  const message = `
    ############################################################
    CONFIRM CHOICES
    ############################################################

    ${chalk.yellow(
      "Proceed with caution. It may be difficult to change these later."
    )}

      Extension name: '${chalk.green(
        config.extensionName
      )}'. This will be presented in the extension stores\nwhen users are searching for extensions.

      Project name: '${chalk.green(
        config.projectName
      )}'. If you make your extension's code available to\nthe public, this is what they'll use locally when making contributions.\nIt will also show up other places like the ZIP files created when publishing.

      Package prefix: '${chalk.green(
        config.packagePrefix
      )}'. When you need to use some shared code between\npackages, your import statements will look like this: '${chalk.cyan(
    `@${config.packagePrefix}/types`
  )}'.

    Does this look right? [Y/n]`;

  return trimLiteral(message);
}

async function getConfig() {
  return new Promise<InitConfig>((res) => {
    readLine.question(
      "Extension name (example: My Cool Extension): ",
      (extensionName) => {
        readLine.question(
          "Project name (example: my-cool-extension): ",
          (projectName) => {
            readLine.question(
              "Package prefix (example: mce): ",
              (packagePrefix) => {
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
                    return readLine.close();
                  }

                  readLine.question(
                    buildConfirmationMessage(validated) + " ",
                    (response) => {
                      if (response.trim().toLowerCase() !== "y") {
                        console.log("Initialization exited.");
                        return readLine.close();
                      }

                      console.log(`Initializing ${validated.extensionName}...`);

                      readLine.close();
                      res(validated);
                    }
                  );
                } catch (error) {
                  console.log(
                    chalk.red(
                      "Something went wrong validating your input. Address the following issues and try again."
                    )
                  );

                  const errorOutput =
                    error instanceof ZodError ? error.errors : error;

                  console.log(errorOutput);
                  readLine.close();
                }
              }
            );
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
  const { extensionName, packagePrefix, projectName } = await getConfig();

  try {
    console.log("Replacing extension name...");
    replaceInFileSync({
      ...commonReplaceOptions,
      from: new RegExp(DEFAULT_EXTENSION_NAME, "g"),
      to: extensionName,
    });

    console.log("Replacing project name...");
    replaceInFileSync({
      ...commonReplaceOptions,
      from: new RegExp(DEFAULT_PROJECT_NAME, "g"),
      to: projectName,
    });

    console.log("Replacing package prefix...");
    replaceInFileSync({
      ...commonReplaceOptions,
      from: new RegExp(DEFAULT_PACKAGE_PREFIX, "g"),
      to: `@${packagePrefix}`,
    });
  } catch (err) {
    console.log(chalk.red("Replacement error\n"), err);
  }
}

main();

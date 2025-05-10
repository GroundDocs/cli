#!/usr/bin/env node

import type { ValidClient, InstallOptions } from "./types.js";
import { getDefaultConfig, getVSCodeConfig } from "./config.js";
import { writeDefaultConfig, writeVSCodeConfig } from "./utils.js";
import { promptForRestart } from "./client.js";
import ora from "ora";
import chalk from "chalk";

export async function install(
  client: ValidClient,
  options?: InstallOptions
): Promise<void> {
  const capitalizedClient = client.charAt(0).toUpperCase() + client.slice(1);

  const spinner = ora(
    `Installing configuration for ${capitalizedClient}...`
  ).start();

  try {
    if (client === "vscode") {
      const config = { ...getVSCodeConfig(options?.apiKey) };
      writeVSCodeConfig(client, config);
    } else {
      const config = { ...getDefaultConfig(options?.apiKey) };
      writeDefaultConfig(client, config);
    }
    
    spinner.succeed(
      `Successfully installed configuration for ${capitalizedClient}`
    );

    if (!options?.apiKey) {
      console.log(
        chalk.yellow(
          "No API key provided. Using default 'YOUR_API_KEY' placeholder."
        )
      );
    }

    console.log(
      chalk.green(`${capitalizedClient} configuration updated successfully`)
    );
    console.log(
      chalk.yellow(
        `You may need to restart ${capitalizedClient} to see the GroundDocs MCP server.`
      )
    );
    await promptForRestart(client);
  } catch (error) {
    spinner.fail(`Failed to install configuration for ${capitalizedClient}`);
    console.error(
      chalk.red(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      )
    );
    throw error;
  }
}
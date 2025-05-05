#!/usr/bin/env node

import { Command } from "commander";
import { install } from "./index.js";
import { VALID_CLIENTS } from "./types.js";
import chalk from "chalk";

const program = new Command();

program
  .name("grounddocs-cli")
  .description("Install MCP configuration for various AI clients")
  .version("0.1.0");

program
  .command("install")
  .description("Install MCP configuration for a specific client")
  .argument(
    "<client>",
    `The client to install for (${VALID_CLIENTS.join(", ")})`
  )
  .option("--api-key <key>", "API key for grounddocs services")
  .action(async (client: string, options: { apiKey?: string }) => {
    if (!VALID_CLIENTS.includes(client as any)) {
      console.error(
        chalk.red(
          `Invalid client "${client}". Available clients: ${VALID_CLIENTS.join(
            ", "
          )}`
        )
      );
      process.exit(1);
    }

    try {
      await install(client as any, { apiKey: options.apiKey });
    } catch (error) {
      console.error(
        chalk.red(
          error instanceof Error ? error.message : "Unknown error occurred"
        )
      );
      process.exit(1);
    }
  });

program.parse();
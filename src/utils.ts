import fs from "node:fs";
import path from "node:path";
import type { ValidClient, ClientConfig, VSCodeConfig } from "./types.js";
import { clientPaths } from "./config.js";

export function getConfigPath(client: ValidClient): string {
  const configPath = clientPaths[client];
  if (!configPath) {
    throw new Error(`Invalid client: ${client}`);
  }
  return configPath;
}

export function readConfig(client: ValidClient): ClientConfig {
  const configPath = getConfigPath(client);

  if (!fs.existsSync(configPath)) {
    return { mcpServers: {} };
  }

  try {
    const rawConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
    return {
      ...rawConfig,
      mcpServers: rawConfig.mcpServers || {},
    };
  } catch (error) {
    return { mcpServers: {} };
  }
}

export function writeDefaultConfig(client: ValidClient, config: ClientConfig): void {
  const configPath = getConfigPath(client);
  const configDir = path.dirname(configPath);

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  if (!config.mcpServers || typeof config.mcpServers !== "object") {
    throw new Error("Invalid mcpServers structure");
  }

  let existingConfig: ClientConfig = { mcpServers: {} };
  try {
    if (fs.existsSync(configPath)) {
      existingConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
    }
  } catch (error) {
    // If reading fails, continue with empty existing config
  }

  const mergedConfig = {
    ...existingConfig,
    mcpServers: {
      ...existingConfig.mcpServers,
      ...config.mcpServers,
    },
  };

  fs.writeFileSync(configPath, JSON.stringify(mergedConfig, null, 2));
}

export function writeVSCodeConfig(client: ValidClient, config: VSCodeConfig): void {
  const configPath = getConfigPath(client);
  const configDir = path.dirname(configPath);

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  if (!config.mcp || typeof config.mcp !== "object") {
    throw new Error("Invalid mcpServers structure");
  }

  let existingConfig: VSCodeConfig = { mcp: {servers: {}, inputs: []} };
  try {
    if (fs.existsSync(configPath)) {
      existingConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
    }
  } catch (error) {
    // If reading fails, continue with empty existing config
  }

  const mergedConfig = {
    ...existingConfig,
    mcp: {
      inputs: [...existingConfig.mcp.inputs],
      servers: {
        ...existingConfig.mcp.servers,
        ...config.mcp.servers,
      },
    },
  };

  fs.writeFileSync(configPath, JSON.stringify(mergedConfig, null, 2));
}
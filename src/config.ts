import os from "node:os";
import path from "node:path";
import type { ClientConfig } from "./types.js";
import chalk from "chalk";

const homeDir = os.homedir();

const platformPaths = {
  win32: {
    baseDir: process.env.APPDATA || path.join(homeDir, "AppData", "Roaming"),
    vscodePath: path.join("Code", "User", "globalStorage"),
  },
  darwin: {
    baseDir: path.join(homeDir, "Library", "Application Support"),
    vscodePath: path.join("Code", "User", "globalStorage"),
  },
  linux: {
    baseDir: process.env.XDG_CONFIG_HOME || path.join(homeDir, ".config"),
    vscodePath: path.join("Code/User/globalStorage"),
  },
};

const platform = process.platform as keyof typeof platformPaths;
const { baseDir, vscodePath } = platformPaths[platform];

export const clientPaths: Record<string, string> = {
  claude: path.join(baseDir, "Claude", "claude_desktop_config.json"),
  cline: path.join(
    baseDir,
    vscodePath,
    "saoudrizwan.claude-dev",
    "settings",
    "cline_mcp_settings.json"
  ),
  "roo-cline": path.join(
    baseDir,
    vscodePath,
    "rooveterinaryinc.roo-cline",
    "settings",
    "cline_mcp_settings.json"
  ),
  windsurf: path.join(homeDir, ".codeium", "windsurf", "mcp_config.json"),
  witsy: path.join(baseDir, "Witsy", "settings.json"),
  enconvo: path.join(homeDir, ".config", "enconvo", "mcp_config.json"),
  cursor: path.join(homeDir, ".cursor", "mcp.json"),
};

const createGroundDocsArgs = (apiKey: string) => [
  "-y",
  "@grounddocs/grounddocs@latest",
  `API_KEY="${apiKey}"`,
];

export const createPlatformCommand = (passedArgs: string[]) => {
  if (process.platform === "win32") {
    return {
      command: "cmd",
      args: ["/c", "npx", ...passedArgs],
    };
  }
  return {
    command: "npx",
    args: passedArgs,
  };
};

export const getDefaultConfig = (apiKey: string = "YOUR_API_KEY") => {
  const grounddocsArgs = createGroundDocsArgs(apiKey);
  const command = createPlatformCommand(grounddocsArgs);

  return {
    mcpServers: {
      "@grounddocs/grounddocs": command,
    },
  };
};
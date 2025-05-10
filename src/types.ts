export type ValidClient =
  | "claude"
  | "cline"
  | "roo-cline"
  | "windsurf"
  | "witsy"
  | "enconvo"
  | "cursor"
  | "vscode";

export const VALID_CLIENTS: ValidClient[] = [
  "claude",
  "cline",
  "roo-cline",
  "windsurf",
  "witsy",
  "enconvo",
  "cursor",
  "vscode"
];

export interface ServerConfig {
  command: string;
  args: string[];
}

export interface ClientConfig {
  mcpServers: Record<string, ServerConfig>;
}

export interface VSCodeMCPConfig {
  inputs: Array<string>;
  servers: Record<string, ServerConfig>;
}

export interface VSCodeConfig {
  mcp: VSCodeMCPConfig;
}

export interface InstallOptions {
  apiKey?: string;
}
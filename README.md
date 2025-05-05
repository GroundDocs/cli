# @grounddocs/cli

Adds GroundDocsMCP configuration to AI IDEs (Cursor, Windsurf, Cline, etc.)

## Usage

```bash
npx @grounddocs/cli@latest install <client> --api-key <key>
```

You can obtain your API key by emailing ishaan.sehgal99@gmail.com

Supported IDEs: cursor, windsurf, cline, claude, witsy, enconvo

## Manual Installation

Add to your IDE's MCP config:

```json
{
  "mcpServers": {
    "@grounddocs/grounddocs": {
      "command": "npx",
      "args": ["-y", "@grounddocs/grounddocs@latest", "API_KEY=\"your-api-key\""]
    }
  }
}
```
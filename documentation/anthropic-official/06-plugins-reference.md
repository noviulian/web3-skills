# Plugins Reference

*Source: https://code.claude.com/docs/en/plugins-reference*

Complete technical reference for the Claude Code plugin system.

## Plugin components reference

### Skills

**Location**: `skills/` or `commands/` directory in plugin root
**File format**: Skills are directories with `SKILL.md`; commands are simple markdown files

**Skill structure:**
```
skills/
├── pdf-processor/
│   ├── SKILL.md
│   ├── reference.md (optional)
│   └── scripts/ (optional)
└── code-reviewer/
    └── SKILL.md
```

**Integration behavior:**
- Automatically discovered when plugin is installed
- Claude can invoke automatically based on task context
- Skills can include supporting files

### Agents

**Location**: `agents/` directory in plugin root
**File format**: Markdown files with agent definitions

**Agent structure:**
```yaml
---
description: What this agent specializes in
capabilities: ["task1", "task2", "task3"]
---

# Agent Name

Detailed description of the agent's role, expertise, and when Claude should invoke it.

## Capabilities
- Specific task the agent excels at
- Another specialized capability
- When to use this agent vs others

## Context and examples
Provide examples of when this agent should be used.
```

**Integration points:**
- Appears in `/agents` interface
- Claude can invoke automatically based on task context
- Can be invoked manually by users
- Works alongside built-in Claude agents

### Hooks

**Location**: `hooks/hooks.json` in plugin root, or inline in plugin.json
**Format**: JSON configuration with event matchers and actions

**Hook configuration:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format-code.sh"
          }
        ]
      }
    ]
  }
}
```

**Available events:**
- `PreToolUse` - Before Claude uses any tool
- `PostToolUse` - After Claude successfully uses any tool
- `PostToolUseFailure` - After Claude tool execution fails
- `PermissionRequest` - When a permission dialog is shown
- `UserPromptSubmit` - When user submits a prompt
- `Notification` - When Claude Code sends notifications
- `Stop` - When Claude attempts to stop
- `SubagentStart` - When a subagent is started
- `SubagentStop` - When a subagent attempts to stop
- `Setup` - When `--init`, `--init-only`, or `--maintenance` flags are used
- `SessionStart` - At the beginning of sessions
- `SessionEnd` - At the end of sessions
- `PreCompact` - Before conversation history is compacted

**Hook types:**
- `command` - Execute shell commands or scripts
- `prompt` - Evaluate a prompt with an LLM
- `agent` - Run an agentic verifier with tools

### MCP servers

**Location**: `.mcp.json` in plugin root, or inline in plugin.json
**Format**: Standard MCP server configuration

**MCP server configuration:**
```json
{
  "mcpServers": {
    "plugin-database": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server/",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"],
      "env": {
        "DB_PATH": "${CLAUDE_PLUGIN_ROOT}/data"
      }
    },
    "plugin-api-client": {
      "command": "npx",
      "args": ["@company/mcp-server", "--plugin-mode"],
      "cwd": "${CLAUDE_PLUGIN_ROOT}"
    }
  }
}
```

**Integration behavior:**
- Start automatically when plugin is enabled
- Appear as standard MCP tools in Claude's toolkit
- Integrate seamlessly with existing tools

### LSP servers

**Location**: `.lsp.json` in plugin root, or inline in `plugin.json`
**Format**: JSON configuration mapping language server names to configurations

**`.lsp.json` file format:**
```json
{
  "go": {
    "command": "gopls",
    "args": ["serve"],
    "extensionToLanguage": {
      ".go": "go"
    }
  }
}
```

**Inline in `plugin.json`:**
```json
{
  "name": "my-plugin",
  "lspServers": {
    "go": {
      "command": "gopls",
      "args": ["serve"],
      "extensionToLanguage": {
        ".go": "go"
      }
    }
  }
}
```

**Required fields:**
| Field | Description |
| --- | --- |
| `command` | The LSP binary to execute (must be in PATH) |
| `extensionToLanguage` | Maps file extensions to language identifiers |

**Optional fields:**
| Field | Description |
| --- | --- |
| `args` | Command-line arguments |
| `transport` | Communication transport: `stdio` (default) or `socket` |
| `env` | Environment variables |
| `initializationOptions` | Options passed during initialization |
| `settings` | Settings via `workspace/didChangeConfiguration` |
| `workspaceFolder` | Workspace folder path |
| `startupTimeout` | Max time to wait for startup (milliseconds) |
| `shutdownTimeout` | Max time to wait for shutdown (milliseconds) |
| `restartOnCrash` | Whether to automatically restart on crash |
| `maxRestarts` | Maximum restart attempts |

## Plugin installation scopes

| Scope | Settings file | Use case |
| --- | --- | --- |
| `user` | `~/.claude/settings.json` | Personal plugins across all projects (default) |
| `project` | `.claude/settings.json` | Team plugins shared via version control |
| `local` | `.claude/settings.local.json` | Project-specific, gitignored |
| `managed` | `managed-settings.json` | Managed plugins (read-only) |

## Plugin manifest schema

### Complete schema

```json
{
  "name": "plugin-name",
  "version": "1.2.0",
  "description": "Brief plugin description",
  "author": {
    "name": "Author Name",
    "email": "[email protected]",
    "url": "https://github.com/author"
  },
  "homepage": "https://docs.example.com/plugin",
  "repository": "https://github.com/author/plugin",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"],
  "commands": ["./custom/commands/special.md"],
  "agents": "./custom/agents/",
  "skills": "./custom/skills/",
  "hooks": "./config/hooks.json",
  "mcpServers": "./mcp-config.json",
  "outputStyles": "./styles/",
  "lspServers": "./.lsp.json"
}
```

### Required fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Unique identifier (kebab-case, no spaces) |

### Metadata fields

| Field | Type | Description |
| --- | --- | --- |
| `version` | string | Semantic version |
| `description` | string | Brief explanation of plugin purpose |
| `author` | object | Author information |
| `homepage` | string | Documentation URL |
| `repository` | string | Source code URL |
| `license` | string | License identifier |
| `keywords` | array | Discovery tags |

### Component path fields

| Field | Type | Description |
| --- | --- | --- |
| `commands` | string\|array | Additional command files/directories |
| `agents` | string\|array | Additional agent files |
| `skills` | string\|array | Additional skill directories |
| `hooks` | string\|object | Hook config path or inline config |
| `mcpServers` | string\|object | MCP config path or inline config |
| `outputStyles` | string\|array | Additional output style files/directories |
| `lspServers` | string\|object | LSP server configuration |

**Path behavior rules:**
- Custom paths supplement default directories - they don't replace them
- All paths must be relative to plugin root and start with `./`
- Multiple paths can be specified as arrays

## Plugin caching and file resolution

### How plugin caching works

When you install a plugin, Claude Code copies it to a cache directory:
- For marketplace plugins with relative paths: the path specified in `source` is copied recursively
- For plugins with `.claude-plugin/plugin.json`: the implicit root directory is copied

### Path traversal limitations

Plugins cannot reference files outside their copied directory structure. Paths like `../shared-utils` won't work after installation.

### Working with external dependencies

**Option 1: Use symlinks**
```bash
ln -s /path/to/shared-utils ./shared-utils
```

**Option 2: Restructure marketplace**
Set plugin path to parent directory containing all required files:
```json
{
  "name": "my-plugin",
  "source": "./",
  "commands": ["./plugins/my-plugin/commands/"],
  "strict": false
}
```

## Plugin directory structure

### Standard plugin layout

```
enterprise-plugin/
├── .claude-plugin/           # Metadata directory
│   └── plugin.json          # Required: plugin manifest
├── commands/                 # Default command location
├── agents/                   # Default agent location
├── skills/                   # Agent Skills
├── hooks/                    # Hook configurations
├── .mcp.json                # MCP server definitions
├── .lsp.json                # LSP server configurations
├── scripts/                 # Hook and utility scripts
├── LICENSE                  # License file
└── CHANGELOG.md             # Version history
```

### File locations reference

| Component | Default Location | Purpose |
| --- | --- | --- |
| **Manifest** | `.claude-plugin/plugin.json` | Required metadata file |
| **Commands** | `commands/` | Skill Markdown files |
| **Agents** | `agents/` | Subagent Markdown files |
| **Skills** | `skills/` | Skills with `<name>/SKILL.md` |
| **Hooks** | `hooks/hooks.json` | Hook configuration |
| **MCP servers** | `.mcp.json` | MCP server definitions |
| **LSP servers** | `.lsp.json` | Language server configurations |

## CLI commands reference

### plugin install

```bash
claude plugin install <plugin> [options]
```

**Options:**
| Option | Description | Default |
| --- | --- | --- |
| `-s, --scope <scope>` | Installation scope: `user`, `project`, or `local` | `user` |

**Examples:**
```bash
claude plugin install formatter@my-marketplace
claude plugin install formatter@my-marketplace --scope project
```

### plugin uninstall

```bash
claude plugin uninstall <plugin> [options]
```

**Aliases:** `remove`, `rm`

### plugin enable / disable

```bash
claude plugin enable <plugin> [options]
claude plugin disable <plugin> [options]
```

### plugin update

```bash
claude plugin update <plugin> [options]
```

## Debugging

Use `claude --debug` to see plugin loading details.

### Common issues

| Issue | Cause | Solution |
| --- | --- | --- |
| Plugin not loading | Invalid `plugin.json` | Validate with `claude plugin validate` |
| Commands not appearing | Wrong directory structure | Ensure `commands/` at root |
| Hooks not firing | Script not executable | Run `chmod +x script.sh` |
| MCP server fails | Missing `${CLAUDE_PLUGIN_ROOT}` | Use variable for paths |
| Path errors | Absolute paths used | Use relative paths with `./` |
| LSP `Executable not found` | Language server not installed | Install the binary |

### Directory structure mistakes

**Correct structure:**
```
my-plugin/
├── .claude-plugin/
│   └── plugin.json      ← Only manifest here
├── commands/            ← At root level
├── agents/              ← At root level
└── hooks/               ← At root level
```

Components must be at plugin root, not inside `.claude-plugin/`.

## Distribution and versioning

### Version management

Follow semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward-compatible)
- **PATCH**: Bug fixes (backward-compatible)

**Best practices:**
- Start at `1.0.0` for first stable release
- Update version in `plugin.json` before distributing
- Document changes in `CHANGELOG.md`
- Use pre-release versions like `2.0.0-beta.1` for testing

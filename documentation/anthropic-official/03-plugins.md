# Create Plugins

*Source: https://code.claude.com/docs/en/plugins*

Plugins let you extend Claude Code with custom functionality that can be shared across projects and teams.

## When to use plugins vs standalone configuration

| Approach | Skill names | Best for |
| --- | --- | --- |
| **Standalone** (`.claude/` directory) | `/hello` | Personal workflows, project-specific customizations, quick experiments |
| **Plugins** (directories with `.claude-plugin/plugin.json`) | `/plugin-name:hello` | Sharing with teammates, distributing to community, versioned releases, reusable across projects |

**Use standalone when:**
- Customizing Claude Code for a single project
- Configuration is personal and doesn't need to be shared
- Experimenting with skills or hooks before packaging
- Want short skill names like `/hello` or `/review`

**Use plugins when:**
- Want to share functionality with team or community
- Need same skills/agents across multiple projects
- Want version control and easy updates
- Distributing through a marketplace
- Okay with namespaced skills like `/my-plugin:hello`

## Quickstart

### Prerequisites

- Claude Code installed and authenticated
- Version 1.0.33 or later (run `claude --version` to check)

### Create your first plugin

You've successfully created a plugin with:
- **Plugin manifest** (`.claude-plugin/plugin.json`): Metadata
- **Commands directory** (`commands/`): Custom skills
- **Skill arguments** (`$ARGUMENTS`): Captures user input

## Plugin structure overview

| Directory | Location | Purpose |
| --- | --- | --- |
| `.claude-plugin/` | Plugin root | Contains only `plugin.json` manifest (required) |
| `commands/` | Plugin root | Skills as Markdown files |
| `agents/` | Plugin root | Custom agent definitions |
| `skills/` | Plugin root | Agent Skills with `SKILL.md` files |
| `hooks/` | Plugin root | Event handlers in `hooks.json` |
| `.mcp.json` | Plugin root | MCP server configurations |
| `.lsp.json` | Plugin root | LSP server configurations for code intelligence |

## Develop more complex plugins

### Add Skills to your plugin

```bash
my-plugin/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    └── code-review/
        └── SKILL.md
```

Each `SKILL.md` needs frontmatter:
```yaml
---
name: code-review
description: Reviews code for best practices and potential issues. Use when reviewing code, checking PRs, or analyzing code quality.
---

When reviewing code, check for:
1. Code organization and structure
2. Error handling
3. Security concerns
4. Test coverage
```

### Add LSP servers to your plugin

Create `.lsp.json`:
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

Users must have the language server binary installed on their machine.

### Organize complex plugins

For plugins with many components, organize by functionality. Use a directory structure like:

```
enterprise-plugin/
├── .claude-plugin/
│   └── plugin.json
├── commands/
├── agents/
├── skills/
├── hooks/
├── .mcp.json
├── .lsp.json
└── scripts/
```

### Test your plugins locally

Use the `--plugin-dir` flag to test during development:
```bash
claude --plugin-dir ./my-plugin
```

As you make changes, restart Claude Code to pick up updates.

### Debug plugin issues

1. Check the structure - ensure directories are at plugin root, not inside `.claude-plugin/`
2. Test components individually
3. Use validation tools: `claude plugin validate` or `/plugin validate`

When ready to share:
1. Add documentation (README.md)
2. Version your plugin (semantic versioning)
3. Create or use a marketplace
4. Test with others

## Convert existing configurations to plugins

### Migration steps

1. Create plugin directory structure
2. Move files from `.claude/` to plugin directories
3. Create `plugin.json` manifest
4. Test locally with `--plugin-dir`

### What changes when migrating

| Standalone (`.claude/`) | Plugin |
| --- | --- |
| Only available in one project | Can be shared via marketplaces |
| Files in `.claude/commands/` | Files in `plugin-name/commands/` |
| Hooks in `settings.json` | Hooks in `hooks/hooks.json` |
| Must manually copy to share | Install with `/plugin install` |

## Next steps

### For plugin users
- Discover and install plugins
- Configure team marketplaces

### For plugin developers
- Create and distribute a marketplace
- See Plugins reference for complete technical specifications
- Dive into specific components:
  - Skills
  - Subagents
  - Hooks
  - MCP

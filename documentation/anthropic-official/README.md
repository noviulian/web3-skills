# Claude Code Official Documentation Archive

*Retrieved from https://code.claude.com/docs on 2026-01-23*

This directory contains the official Anthropic Claude Code documentation for skills, plugins, and marketplaces, plus community best practices.

## Documentation Contents

### Core Documentation (Official)

| File | Description | Source |
|------|-------------|--------|
| `01-overview.md` | Claude Code overview and quickstart | [link](https://code.claude.com/docs/en/overview) |
| `02-skills.md` | Extending Claude with skills - complete guide | [link](https://code.claude.com/docs/en/skills) |
| `03-plugins.md` | Creating plugins - skills, agents, hooks, MCP | [link](https://code.claude.com/docs/en/plugins) |
| `04-plugin-marketplaces.md` | Creating and distributing marketplaces | [link](https://code.claude.com/docs/en/plugin-marketplaces) |
| `05-discover-plugins.md` | Installing and managing plugins | [link](https://code.claude.com/docs/en/discover-plugins) |
| `06-plugins-reference.md` | Complete technical reference and schemas | [link](https://code.claude.com/docs/en/plugins-reference) |

### Community Resources

| File | Description | Source |
|------|-------------|--------|
| `07-plugin-template.md` | GitHub template for plugin marketplaces | [GitHub](https://github.com/ivan-magda/claude-code-plugin-template) |
| `08-best-practices.md` | Compiled best practices from community | Various sources |

## Quick Navigation

### For Plugin Users
- Start with `01-overview.md` for installation
- Use `05-discover-plugins.md` to find and install plugins

### For Plugin Developers
- Read `02-skills.md` to understand Agent Skills
- Read `03-plugins.md` for plugin creation
- Reference `06-plugins-reference.md` for technical specs
- Follow `08-best-practices.md` for guidelines

### For Marketplace Maintainers
- Read `04-plugin-marketplaces.md` for marketplace setup
- Reference `06-plugins-reference.md` for marketplace schema
- See `07-plugin-template.md` for a template repository

## Key Concepts

### Skills
Modular instructions that extend Claude's capabilities. A `SKILL.md` file with YAML frontmatter and markdown content.

**Features:**
- Automatic invocation based on context
- Custom slash commands (`/skill-name`)
- Supporting files for progressive disclosure
- Invocation control (user-only, model-only, or both)

### Plugins
Packages containing skills, agents, hooks, MCP servers, and LSP configurations.

**Structure:**
```
my-plugin/
├── .claude-plugin/
│   └── plugin.json          # Required manifest
├── commands/                 # Slash commands
├── agents/                   # Subagent definitions
├── skills/                   # Agent Skills
├── hooks/                    # Event handlers
├── .mcp.json                # MCP servers
└── .lsp.json                # LSP servers
```

### Marketplaces
Catalogs for distributing plugins to teams or communities.

**Components:**
- `.claude-plugin/marketplace.json` - Manifest
- Plugin entries with sources (relative paths, GitHub, git URLs)
- Metadata for discovery and categorization

## Installation Scopes

| Scope | Location | Use Case |
|-------|----------|----------|
| `user` | `~/.claude/settings.json` | Personal plugins (default) |
| `project` | `.claude/settings.json` | Team plugins (version control) |
| `local` | `.claude/settings.local.json` | Project-specific (gitignored) |
| `managed` | `managed-settings.json` | Enterprise-managed |

## External Resources

### Official Documentation
- https://code.claude.com/docs/en/overview

### Official Marketplace
- `claude-plugins-official` (auto-loaded)
- `claude-code-plugins` (demo plugins)

### Community
- Plugin Directory: https://www.claudecodeplugin.com/
- Plugin Registry: https://clauderegistry.com/
- Template: https://github.com/ivan-magda/claude-code-plugin-template

## Maintenance

This documentation was archived on 2026-01-23. For the latest updates, visit the official documentation at https://code.claude.com/docs.

To update this archive:
1. Fetch latest from https://code.claude.com/docs
2. Update the corresponding markdown files
3. Update this README's date stamp

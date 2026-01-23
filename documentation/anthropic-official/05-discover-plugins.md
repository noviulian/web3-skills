# Discover and Install Prebuilt Plugins

*Source: https://code.claude.com/docs/en/discover-plugins*

Plugins extend Claude Code with custom commands, agents, hooks, and MCP servers. Plugin marketplaces are catalogs that help you discover and install these extensions.

## How marketplaces work

Using a marketplace is a two-step process:
1. Add the marketplace (like adding an app store)
2. Install individual plugins from it

Think of it like adding an app store: adding the store gives you access to browse its collection, but you still choose which apps to download individually.

## Official Anthropic marketplace

The official Anthropic marketplace (`claude-plugins-official`) is automatically available. Run `/plugin` and go to the **Discover** tab to browse.

To install:
```bash
/plugin install plugin-name@claude-plugins-official
```

### Official marketplace categories

**Code intelligence** - LSP plugins for real-time code intelligence:
| Language | Plugin | Binary required |
| --- | --- | --- |
| C/C++ | `clangd-lsp` | `clangd` |
| C# | `csharp-lsp` | `csharp-ls` |
| Go | `gopls-lsp` | `gopls` |
| Java | `jdtls-lsp` | `jdtls` |
| Lua | `lua-lsp` | `lua-language-server` |
| PHP | `php-lsp` | `intelephense` |
| Python | `pyright-lsp` | `pyright-langserver` |
| Rust | `rust-analyzer-lsp` | `rust-analyzer` |
| Swift | `swift-lsp` | `sourcekit-lsp` |
| TypeScript | `typescript-lsp` | `typescript-language-server` |

**External integrations** - Pre-configured MCP servers:
- Source control: `github`, `gitlab`
- Project management: `atlassian` (Jira/Confluence), `asana`, `linear`, `notion`
- Design: `figma`
- Infrastructure: `vercel`, `firebase`, `supabase`
- Communication: `slack`
- Monitoring: `sentry`

**Development workflows**:
- `commit-commands`: Git commit workflows
- `pr-review-toolkit`: Specialized PR review agents
- `agent-sdk-dev`: Tools for building with Claude Agent SDK
- `plugin-dev`: Toolkit for creating plugins

**Output styles**:
- `explanatory-output-style`: Educational insights
- `learning-output-style`: Interactive learning mode

## Try it: add the demo marketplace

Anthropic maintains a demo marketplace (`claude-code-plugins`) with example plugins.

## Add marketplaces

### Add from GitHub

```bash
/plugin marketplace add anthropics/claude-code
```

Format: `owner/repo`

### Add from other Git hosts

**HTTPS:**
```bash
/plugin marketplace add https://gitlab.com/company/plugins.git
```

**SSH:**
```bash
/plugin marketplace add [email protected]:company/plugins.git
```

**Specific branch or tag:**
```bash
/plugin marketplace add https://gitlab.com/company/plugins.git#v1.0.0
```

### Add from local paths

```bash
/plugin marketplace add ./my-marketplace
```

Or direct path to `marketplace.json`:
```bash
/plugin marketplace add ./path/to/marketplace.json
```

### Add from remote URLs

```bash
/plugin marketplace add https://example.com/marketplace.json
```

## Install plugins

```bash
/plugin install plugin-name@marketplace-name
```

### Installation scopes

Choose scope via interactive UI (`/plugin` → **Discover** → press **Enter**):

| Scope | Settings file | Use case |
| --- | --- | --- |
| **user** | `~/.claude/settings.json` | Personal plugins across all projects (default) |
| **project** | `.claude/settings.json` | Team plugins shared via version control |
| **local** | `.claude/settings.local.json` | Project-specific, gitignored |
| **managed** | `managed-settings.json` | Managed plugins (read-only) |

Run `/plugin` → **Installed** to view by scope.

## Manage installed plugins

### Interactive interface

Run `/plugin` → **Installed** to:
- View plugins by scope
- Enable, disable, or uninstall
- See plugin details

### CLI commands

**Disable without uninstalling:**
```bash
/plugin disable plugin-name@marketplace-name
```

**Re-enable:**
```bash
/plugin enable plugin-name@marketplace-name
```

**Completely remove:**
```bash
/plugin uninstall plugin-name@marketplace-name
```

**Target specific scope:**
```bash
claude plugin install formatter@your-org --scope project
claude plugin uninstall formatter@your-org --scope project
```

## Manage marketplaces

### Interactive interface

Run `/plugin` → **Marketplaces** to:
- View all marketplaces with sources and status
- Add new marketplaces
- Update marketplace listings
- Remove marketplaces

### CLI commands

**List all marketplaces:**
```bash
/plugin marketplace list
```

**Refresh listings:**
```bash
/plugin marketplace update marketplace-name
```

**Remove marketplace:**
```bash
/plugin marketplace remove marketplace-name
```

## Configure auto-updates

Claude Code can automatically update marketplaces and plugins at startup. Toggle via UI:
1. Run `/plugin`
2. Select **Marketplaces**
3. Choose marketplace
4. Select **Enable auto-update** or **Disable auto-update**

Official Anthropic marketplaces have auto-update enabled by default. Third-party and local marketplaces have it disabled by default.

**Disable all automatic updates:**
```bash
export DISABLE_AUTOUPDATER=true
```

**Keep plugin updates but disable Claude Code updates:**
```bash
export DISABLE_AUTOUPDATER=true
export FORCE_AUTOUPDATE_PLUGINS=true
```

## Configure team marketplaces

Set up automatic marketplace installation in `.claude/settings.json`:
```json
{
  "extraKnownMarketplaces": {
    "company-tools": {
      "source": {
        "source": "github",
        "repo": "your-org/claude-plugins"
      }
    }
  },
  "enabledPlugins": {
    "code-formatter@company-tools": true,
    "deployment-tools@company-tools": true
  }
}
```

When team members trust the repository folder, Claude Code prompts them to install these marketplaces and plugins.

## Troubleshooting

### /plugin command not recognized

1. Check version: `claude --version` (requires 1.0.33 or later)
2. Update Claude Code:
   - Homebrew: `brew upgrade claude-code`
   - npm: `npm update -g @anthropic-ai/claude-code`
   - Native: Re-run install command
3. Restart Claude Code

### Common issues

| Issue | Solution |
| --- | --- |
| Marketplace not loading | Verify URL is accessible and `.claude-plugin/marketplace.json` exists |
| Plugin installation failures | Check source URLs are accessible and repos are public |
| Files not found after installation | Plugins are copied to cache; paths outside plugin directory won't work |
| Plugin Skills not appearing | Clear cache: `rm -rf ~/.claude/plugins/cache`, restart, reinstall |

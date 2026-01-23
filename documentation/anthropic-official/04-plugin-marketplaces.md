# Create and Distribute a Plugin Marketplace

*Source: https://code.claude.com/docs/en/plugin-marketplaces*

A plugin marketplace is a catalog that lets you distribute plugins to others. Marketplaces provide centralized discovery, version tracking, automatic updates, and support for multiple source types.

## Overview

Creating and distributing a marketplace involves:

1. **Creating plugins**: Build plugins with commands, agents, hooks, MCP servers, or LSP servers
2. **Creating a marketplace file**: Define `marketplace.json` that lists plugins and sources
3. **Host the marketplace**: Push to GitHub, GitLab, or another git host
4. **Share with users**: Users add marketplace with `/plugin marketplace add` and install plugins

## Create the marketplace file

Create `.claude-plugin/marketplace.json` in your repository root:

```json
{
  "name": "company-tools",
  "owner": {
    "name": "DevTools Team",
    "email": "[email protected]"
  },
  "plugins": [
    {
      "name": "code-formatter",
      "source": "./plugins/formatter",
      "description": "Automatic code formatting on save",
      "version": "2.1.0",
      "author": {
        "name": "DevTools Team"
      }
    },
    {
      "name": "deployment-tools",
      "source": {
        "source": "github",
        "repo": "company/deploy-plugin"
      },
      "description": "Deployment automation tools"
    }
  ]
}
```

## Marketplace schema

### Required fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Marketplace identifier (kebab-case, no spaces) |
| `owner` | object | Marketplace maintainer information |
| `plugins` | array | List of available plugins |

### Owner fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Name of the maintainer or team |
| `email` | string | No | Contact email |

### Optional metadata

| Field | Type | Description |
| --- | --- | --- |
| `metadata.description` | string | Brief marketplace description |
| `metadata.version` | string | Marketplace version |
| `metadata.pluginRoot` | string | Base directory prepended to relative plugin paths |

## Plugin entries

### Required fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Plugin identifier (kebab-case, no spaces) |
| `source` | string\|object | Where to fetch the plugin from |

### Optional plugin fields

**Standard metadata:**
- `description` - Brief plugin description
- `version` - Plugin version
- `author` - Author information
- `homepage` - Documentation URL
- `repository` - Source code URL
- `license` - SPDX license identifier
- `keywords` - Tags for discovery
- `category` - Plugin category
- `tags` - Tags for searchability
- `strict` - Whether plugin needs its own `plugin.json` (default: true)

**Component configuration:**
- `commands` - Custom paths to command files/directories
- `agents` - Custom paths to agent files
- `hooks` - Custom hooks configuration
- `mcpServers` - MCP server configurations
- `lspServers` - LSP server configurations

## Plugin sources

### Relative paths
```json
{
  "name": "my-plugin",
  "source": "./plugins/my-plugin"
}
```

### GitHub repositories
```json
{
  "name": "github-plugin",
  "source": {
    "source": "github",
    "repo": "owner/plugin-repo"
  }
}
```

### Git repositories
```json
{
  "name": "git-plugin",
  "source": {
    "source": "url",
    "url": "https://gitlab.com/team/plugin.git"
  }
}
```

## Host and distribute marketplaces

### Host on GitHub (recommended)

1. Create a repository for your marketplace
2. Add `.claude-plugin/marketplace.json` with plugin definitions
3. Users add with `/plugin marketplace add owner/repo`

### Host on other git services

Works with GitLab, Bitbucket, and self-hosted servers:
```bash
/plugin marketplace add https://gitlab.com/company/plugins.git
```

### Private repositories

Set authentication tokens in environment:

| Provider | Environment variables |
| --- | --- |
| GitHub | `GITHUB_TOKEN` or `GH_TOKEN` |
| GitLab | `GITLAB_TOKEN` or `GL_TOKEN` |
| Bitbucket | `BITBUCKET_TOKEN` |

```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

### Test locally before distribution

```bash
/plugin marketplace add ./my-local-marketplace
/plugin install test-plugin@my-local-marketplace
```

### Require marketplaces for your team

Add to `.claude/settings.json`:
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

### Managed marketplace restrictions

For organizations requiring strict control, use `strictKnownMarketplaces` in managed settings:

| Value | Behavior |
| --- | --- |
| Undefined (default) | No restrictions |
| Empty array `[]` | Complete lockdown |
| List of sources | Allowlist only |

Disable all additions:
```json
{
  "strictKnownMarketplaces": []
}
```

Allow specific marketplaces only:
```json
{
  "strictKnownMarketplaces": [
    {
      "source": "github",
      "repo": "acme-corp/approved-plugins"
    },
    {
      "source": "github",
      "repo": "acme-corp/security-tools",
      "ref": "v2.0"
    },
    {
      "source": "url",
      "url": "https://plugins.example.com/marketplace.json"
    }
  ]
}
```

## Validation and testing

Validate JSON syntax:
```bash
claude plugin validate .
```

Or from within Claude Code:
```
/plugin validate .
```

## Troubleshooting

### Marketplace not loading

- Verify the marketplace URL is accessible
- Check that `.claude-plugin/marketplace.json` exists
- Ensure JSON syntax is valid
- For private repositories, confirm access permissions

### Marketplace validation errors

| Error | Cause | Solution |
| --- | --- | --- |
| `File not found: .claude-plugin/marketplace.json` | Missing manifest | Create the file |
| `Invalid JSON syntax` | JSON syntax error | Check for missing/extra commas |
| `Duplicate plugin name` | Two plugins share name | Use unique names |
| `Path traversal not allowed` | Source contains `..` | Use relative paths without `..` |

### Private repository authentication fails

- Verify token is set: `echo $GITHUB_TOKEN`
- Check token has required permissions
- Verify token hasn't expired
- Ensure correct provider token is set

### Plugins with relative paths fail in URL-based marketplaces

**Cause**: URL-based marketplaces only download the `marketplace.json` file, not plugin files.

**Solutions**:
1. Use external sources (GitHub, npm, git URL)
2. Use a Git-based marketplace (clones entire repository)

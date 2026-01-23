# Claude Code Plugin Template (Community Resource)

*Source: https://github.com/ivan-magda/claude-code-plugin-template*

A GitHub template repository for creating and managing your own Claude Code plugin marketplace with a plugin development toolkit.

## Quick Start

### Use as Template

1. Click "Use this template" button on GitHub
2. Create your new repository
3. Clone your new repository:
   ```bash
   git clone https://github.com/your-org/your-marketplace-name.git
   cd your-marketplace-name
   ```
4. Customize the marketplace:
   ```bash
   vim .claude-plugin/marketplace.json
   ```
5. Install the plugin development tools:
   ```bash
   /plugin marketplace add ./path-to-your-marketplace
   /plugin install plugin-development@my-team-plugin-marketplace
   ```

## What's Included

- **Marketplace Configuration** (`.claude-plugin/marketplace.json`): Central registry for all plugins
- **Plugin Development Plugin**: Comprehensive toolkit for creating, validating, and managing plugins
  - Scaffolding and component generation commands
  - Automated validation and testing
  - Best practices and documentation integration
  - Review agent for release readiness
- **Sample Plugin** (`hello-world`): Fully functional example
- **Comprehensive Documentation** (`docs/`): Complete guides
- **GitHub Actions**: Automated plugin validation workflow

## Configuration

### Marketplace Configuration

```json
{
  "name": "my-team-plugin-marketplace",
  "owner": {
    "name": "Your Organization",
    "email": "team@your-org.com"
  },
  "metadata": {
    "description": "A curated collection of plugins for our team",
    "version": "1.0.0"
  },
  "plugins": []
}
```

**Note**: The `name` field should use kebab-case (lowercase with hyphens).

### Team Settings (Optional)

Configure automatic marketplace installation in `.claude/settings.json`:
```json
{
  "extraKnownMarketplaces": {
    "team-tools": {
      "source": {
        "source": "github",
        "repo": "your-org/your-marketplace-name"
      }
    }
  }
}
```

## Testing

### Local Testing

1. Navigate to your project directory
2. Start Claude Code
3. Add your local marketplace:
   ```bash
   /plugin marketplace add ./path-to-your-marketplace
   ```
4. Install a plugin:
   ```bash
   /plugin install hello-world@marketplace-name
   ```
5. Test commands:
   ```bash
   /hello World
   ```

### Using the Marketplace from GitHub

Once published to GitHub:
```bash
/plugin marketplace add your-org/your-repo-name
/plugin install plugin-name@your-marketplace-name
```

## Creating New Plugins

### Option 1: Use the Plugin Development Plugin (Recommended)

```bash
# After cloning and adding this marketplace
/plugin install plugin-development@my-team-plugin-marketplace

# Scaffold a new plugin
/plugin-development:init my-new-plugin

# Add components as needed
/plugin-development:add-command my-command "Description"
/plugin-development:add-skill my-skill "Use when working with..."
/plugin-development:validate
```

### Option 2: Manual Setup

```bash
# Create plugin directory
mkdir -p plugins/my-plugin/.claude-plugin
mkdir -p plugins/my-plugin/commands

# Create plugin metadata
touch plugins/my-plugin/.claude-plugin/plugin.json
touch plugins/my-plugin/README.md
```

#### Define Plugin Metadata

Edit `plugins/my-plugin/.claude-plugin/plugin.json`:
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Description of what your plugin does",
  "author": {
    "name": "Your Name",
    "email": "your-email@example.com",
    "url": "https://github.com/your-username"
  },
  "homepage": "https://github.com/your-org/your-marketplace-name",
  "repository": "https://github.com/your-org/your-marketplace-name",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"]
}
```

#### Create Command

Create `plugins/my-plugin/commands/my-command.md`:
```yaml
---
description: Brief description of what the command does
argument-hint: [arg1] [arg2]
---

# My Command

[Detailed instructions for Claude]

## Instructions

1. [Step 1]
2. [Step 2]
3. [Step 3]
```

#### Register in Marketplace

Add to `.claude-plugin/marketplace.json`:
```json
{
  "plugins": [
    {
      "name": "my-plugin",
      "description": "Description of what your plugin does",
      "version": "1.0.0",
      "author": {
        "name": "Your Name"
      },
      "source": "./plugins/my-plugin/",
      "category": "utilities",
      "tags": ["tag1", "tag2"],
      "keywords": ["keyword1", "keyword2"]
    }
  ]
}
```

## License

MIT License

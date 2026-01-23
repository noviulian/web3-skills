# Claude Code Plugins & Marketplaces: Best Practices

*Compiled from official documentation and community resources*

## Core Principles

### 1. Progressive Disclosure
Keep your main `SKILL.md` under 500 lines. Move detailed reference material to separate files that are only loaded when needed.

**Good structure:**
```
my-skill/
├── SKILL.md (required - overview and navigation, <500 lines)
├── reference.md (detailed API docs - loaded when needed)
├── examples.md (usage examples - loaded when needed)
└── scripts/
    └── helper.py (utility script - executed, not loaded)
```

### 2. Clear Invocation Control
Use frontmatter to explicitly control who can invoke your skills:

- **`disable-model-invocation: true`**: For workflows with side effects (deploy, commit, send messages)
- **`user-invocable: false`**: For background knowledge that users shouldn't invoke directly

### 3. Descriptive Metadata
Write clear descriptions that help Claude understand when to use your skill:

```yaml
---
name: code-review
description: Reviews code for best practices and potential issues. Use when reviewing code, checking PRs, or analyzing code quality.
---
```

Include:
- What the skill does
- When to use it
- Key trigger words users would say

## Plugin Development Best Practices

### Directory Structure

**Correct structure:**
```
my-plugin/
├── .claude-plugin/
│   └── plugin.json      ← Only manifest here
├── commands/            ← At root level
├── agents/              ← At root level
└── hooks/               ← At root level
```

**Common mistake:** Components inside `.claude-plugin/` - move them to root!

### Path Management

**Always use relative paths:**
```json
{
  "commands": ["./custom/cmd.md"],
  "hooks": {
    "command": "${CLAUDE_PLUGIN_ROOT}/scripts/process.sh"
  }
}
```

**Use `${CLAUDE_PLUGIN_ROOT}`** for all file references in hooks and MCP configs because plugins are copied to a cache directory.

### Semantic Versioning

Follow `MAJOR.MINOR.PATCH`:
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward-compatible)
- **PATCH**: Bug fixes (backward-compatible)

Start at `1.0.0` for stable releases. Use pre-release versions like `2.0.0-beta.1` for testing.

## Marketplace Best Practices

### Marketplace Naming

- Use kebab-case (lowercase with hyphens)
- Keep it descriptive but concise
- Examples: `company-tools`, `team-workflows`, `dev-utilities`

### Plugin Entry Design

```json
{
  "name": "my-plugin",
  "source": "./plugins/my-plugin",
  "description": "Brief, clear description",
  "version": "1.0.0",
  "author": {
    "name": "Team Name"
  },
  "category": "productivity",
  "tags": ["automation", "ci-cd"],
  "keywords": ["deploy", "build"]
}
```

### Source Selection

| Source Type | Use Case |
| --- | --- |
| Relative path `./plugins/my-plugin` | Plugins in same repository |
| GitHub `{"source": "github", "repo": "owner/repo"}` | Public GitHub repositories |
| Git URL `{"source": "url", "url": "https://..."}` | GitLab, Bitbucket, self-hosted |

**Important:** URL-based marketplaces only download `marketplace.json` - use Git-based marketplaces for relative path sources.

## Skills Best Practices

### Content Types

**Reference content:**
- Adds knowledge Claude applies to current work
- Conventions, patterns, style guides, domain knowledge
- Runs inline with conversation context

**Task content:**
- Step-by-step instructions for specific actions
- Deployments, commits, code generation
- Add `disable-model-invocation: true` for manual control

### Supporting Files

Reference supporting files from `SKILL.md`:
```markdown
## Additional resources

- For complete API details, see [reference.md](reference.md)
- For usage examples, see [examples.md](examples.md)
```

### Argument Handling

Use `$ARGUMENTS` placeholder for user input:
```yaml
---
name: fix-issue
description: Fix a GitHub issue
disable-model-invocation: true
---

Fix GitHub issue $ARGUMENTS following our coding standards.

1. Read the issue description
2. Understand the requirements
3. Implement the fix
4. Write tests
5. Create a commit
```

## Hooks Best Practices

### Event Selection

Choose the right event for your use case:
- `PreToolUse`: Before Claude uses a tool (validation, logging)
- `PostToolUse`: After successful tool use (formatting, notifications)
- `PostToolUseFailure`: After tool failure (error handling)
- `SessionStart`: At session beginning (setup, initialization)
- `SessionEnd`: At session end (cleanup, reports)

### Hook Configuration

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

**Tips:**
- Use specific matchers: `"Write|Edit"` not `".*"`
- Make scripts executable: `chmod +x script.sh`
- Use shebang lines: `#!/bin/bash`
- Test scripts manually before hook integration

## LSP Integration Best Practices

### Configuration

```json
{
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

**Best practices:**
- Document binary installation requirements
- Handle missing binaries gracefully
- Set reasonable timeouts
- Consider `restartOnCrash: true` for production

## Distribution Best Practices

### Documentation

Include in your plugin:
- `README.md`: Installation and usage
- `CHANGELOG.md`: Version history
- `LICENSE`: License file

### Testing Before Release

1. **Local testing:**
   ```bash
   claude --plugin-dir ./my-plugin
   ```

2. **Marketplace testing:**
   ```bash
   /plugin marketplace add ./my-marketplace
   /plugin install test-plugin@my-marketplace
   ```

3. **Validation:**
   ```bash
   claude plugin validate .
   ```

### Team Distribution

For team-wide plugins:
1. Host marketplace in GitHub repository
2. Add to `.claude/settings.json`:
   ```json
   {
     "extraKnownMarketplaces": {
       "team-tools": {
         "source": {"source": "github", "repo": "your-org/plugins"}
       }
     },
     "enabledPlugins": {
       "code-formatter@team-tools": true
     }
   }
   ```

3. Document in team wiki/onboarding

## Security Considerations

### Private Repositories

For private marketplace repositories:
```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

Set in shell configuration (`.bashrc`, `.zshrc`).

### Managed Restrictions

For organizations, use `strictKnownMarketplaces`:
```json
{
  "strictKnownMarketplaces": [
    {
      "source": "github",
      "repo": "acme-corp/approved-plugins"
    }
  ]
}
```

Values:
- Undefined: No restrictions (default)
- Empty array `[]`: Complete lockdown
- List: Allowlist only

## Troubleshooting Common Issues

### Plugin not loading
- Check `plugin.json` is valid JSON
- Verify directory structure (components at root, not in `.claude-plugin/`)
- Use `claude --debug` to see loading details

### Commands not appearing
- Ensure `commands/` directory exists at plugin root
- Check command files have `.md` extension
- Validate with `claude plugin validate`

### Hooks not firing
- Make scripts executable: `chmod +x script.sh`
- Verify shebang line: `#!/bin/bash`
- Check event name is case-sensitive: `PostToolUse`, not `postToolUse`
- Test scripts manually

### MCP server failures
- Check command exists and is executable
- Use `${CLAUDE_PLUGIN_ROOT}` for all paths
- Check MCP server logs with `claude --debug`

## Community Resources

### Official Documentation
- https://code.claude.com/docs/en/overview
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/plugins
- https://code.claude.com/docs/en/plugin-marketplaces
- https://code.claude.com/docs/en/plugins-reference

### Community Templates
- https://github.com/ivan-magda/claude-code-plugin-template

### Plugin Directories
- https://www.claudecodeplugin.com/
- https://clauderegistry.com/

## Quick Reference Checklist

**Before releasing a plugin:**
- [ ] `plugin.json` has all required fields
- [ ] Directory structure is correct (components at root)
- [ ] All paths are relative and start with `./`
- [ ] Hooks use `${CLAUDE_PLUGIN_ROOT}` for paths
- [ ] Scripts are executable (`chmod +x`)
- [ ] SKILL.md is under 500 lines
- [ ] Descriptions clearly indicate when to use
- [ ] Frontmatter controls invocation appropriately
- [ ] Tested locally with `--plugin-dir`
- [ ] Validated with `claude plugin validate`
- [ ] README includes installation instructions
- [ ] Version follows semantic versioning
- [ ] CHANGELOG.md documents changes

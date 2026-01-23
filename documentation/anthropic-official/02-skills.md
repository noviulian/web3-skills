# Extend Claude with Skills

*Source: https://code.claude.com/docs/en/skills*

Skills extend what Claude can do. Create a `SKILL.md` file with instructions, and Claude adds it to its toolkit. Claude uses skills when relevant, or you can invoke one directly with `/skill-name`.

**Key points:**
- Custom slash commands have been merged into skills
- Files at `.claude/commands/review.md` and skills at `.claude/skills/review/SKILL.md` both create `/review`
- Skills add optional features: directory for supporting files, frontmatter for invocation control, and automatic loading

## Getting Started

### Create your first skill

**1. Create the skill directory**

```bash
mkdir -p ~/.claude/skills/explain-code
```

**2. Write SKILL.md**

Every skill needs:
- YAML frontmatter (between `---` markers) - tells Claude when to use the skill
- Markdown content with instructions Claude follows when invoked

```yaml
---
name: explain-code
description: Explains code with visual diagrams and analogies. Use when explaining how code works, teaching about a codebase, or when the user asks "how does this work?"
---

When explaining code, always include:

1. **Start with an analogy**: Compare the code to something from everyday life
2. **Draw a diagram**: Use ASCII art to show the flow, structure, or relationships
3. **Walk through the code**: Explain step-by-step what happens
4. **Highlight a gotcha**: What's a common mistake or misconception?

Keep explanations conversational. For complex concepts, use multiple analogies.
```

**3. Test the skill**

Let Claude invoke it automatically:
```
How does this code work?
```

Or invoke directly:
```
/explain-code src/auth/login.ts
```

### Where skills live

| Location | Path | Applies to |
| --- | --- | --- |
| Enterprise | See managed settings | All users in your organization |
| Personal | `~/.claude/skills/<skill-name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<skill-name>/SKILL.md` | This project only |
| Plugin | `<plugin>/skills/<skill-name>/SKILL.md` | Where plugin is enabled |

**Project skills override personal skills** with the same name.

### Automatic discovery from nested directories

When working with files in subdirectories, Claude Code automatically discovers skills from nested `.claude/skills/` directories. This supports monorepo setups where packages have their own skills.

## Configure Skills

### Types of skill content

**Reference content** - Adds knowledge Claude applies to current work:
```yaml
---
name: api-conventions
description: API design patterns for this codebase
---

When writing API endpoints:
- Use RESTful naming conventions
- Return consistent error formats
- Include request validation
```

**Task content** - Step-by-step instructions for specific actions:
```yaml
---
name: deploy
description: Deploy the application to production
context: fork
disable-model-invocation: true
---

Deploy the application:
1. Run the test suite
2. Build the application
3. Push to the deployment target
```

### Frontmatter reference

| Field | Required | Description |
| --- | --- | --- |
| `name` | No | Display name (lowercase letters, numbers, hyphens only, max 64 chars) |
| `description` | Recommended | What the skill does and when to use it |
| `argument-hint` | No | Hint shown during autocomplete (e.g., `[issue-number]` or `[filename] [format]`) |
| `disable-model-invocation` | No | Set to `true` to prevent Claude from automatically loading |
| `user-invocable` | No | Set to `false` to hide from `/` menu |
| `allowed-tools` | No | Tools Claude can use without asking permission |
| `model` | No | Model to use when this skill is active |
| `context` | No | Set to `fork` to run in a forked subagent context |
| `agent` | No | Which subagent type to use when `context: fork` is set |
| `hooks` | No | Hooks scoped to this skill's lifecycle |

### String substitutions

| Variable | Description |
| --- | --- |
| `$ARGUMENTS` | All arguments passed when invoking the skill |
| `${CLAUDE_SESSION_ID}` | The current session ID |

### Add supporting files

Skills can include multiple files:
```
my-skill/
├── SKILL.md (required - overview and navigation)
├── reference.md (detailed API docs - loaded when needed)
├── examples.md (usage examples - loaded when needed)
└── scripts/
    └── helper.py (utility script - executed, not loaded)
```

Reference supporting files from `SKILL.md`:
```markdown
## Additional resources

- For complete API details, see [reference.md](reference.md)
- For usage examples, see [examples.md](examples.md)
```

**Keep `SKILL.md` under 500 lines.** Move detailed reference material to separate files.

### Control who invokes a skill

- **`disable-model-invocation: true`**: Only you can invoke (use for workflows with side effects)
- **`user-invocable: false`**: Only Claude can invoke (use for background knowledge)

| Frontmatter | You can invoke | Claude can invoke | When loaded into context |
| --- | --- | --- | --- |
| (default) | Yes | Yes | Description always in context, full skill loads when invoked |
| `disable-model-invocation: true` | Yes | No | Description not in context, full skill loads when you invoke |
| `user-invocable: false` | No | Yes | Description always in context, full skill loads when invoked |

### Restrict tool access

```yaml
---
name: safe-reader
description: Read files without making changes
allowed-tools: Read, Grep, Glob
---
```

### Pass arguments to skills

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

Usage: `/fix-issue 123`

## Advanced Patterns

### Inject dynamic context

The `!`command`` syntax runs shell commands before the skill content is sent to Claude:

```yaml
---
name: pr-summary
description: Summarize changes in a pull request
context: fork
agent: Explore
allowed-tools: Bash(gh:*)
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

## Your task
Summarize this pull request...
```

### Run skills in a subagent

Add `context: fork` to run in isolation:

```yaml
---
name: deep-research
description: Research a topic thoroughly
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:

1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with specific file references
```

### Share skills

- **Project skills**: Commit `.claude/skills/` to version control
- **Plugins**: Create a `skills/` directory in your plugin
- **Managed**: Deploy organization-wide through managed settings

### Generate visual output

Skills can bundle and run scripts to generate interactive HTML output:

```yaml
---
name: codebase-visualizer
description: Generate an interactive collapsible tree visualization of your codebase
allowed-tools: Bash(python:*)
---

# Codebase Visualizer

Generate an interactive HTML tree view that shows your project's file structure.

## Usage

```bash
python ~/.claude/skills/codebase-visualizer/scripts/visualize.py .
```

This creates `codebase-map.html` and opens it in your browser.
```

## Troubleshooting

### Skill not triggering

1. Check the description includes keywords users would naturally say
2. Verify the skill appears in `What skills are available?`
3. Try rephrasing your request to match the description
4. Invoke directly with `/skill-name`

### Skill triggers too often

1. Make the description more specific
2. Add `disable-model-invocation: true` for manual-only invocation

### Claude doesn't see all my skills

Skill descriptions are loaded into context. If you have many skills, they may exceed the character budget (default 15,000 characters). Run `/context` to check. Increase the limit with `SLASH_COMMAND_TOOL_CHAR_BUDGET` environment variable.

## Related Resources

- **Subagents**: Delegate tasks to specialized agents
- **Plugins**: Package and distribute skills with other extensions
- **Hooks**: Automate workflows around tool events
- **Memory**: Manage CLAUDE.md files for persistent context
- **Permissions**: Control tool and skill access

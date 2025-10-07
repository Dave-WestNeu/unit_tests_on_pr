# Unit Test Generator AI Agent Instructions

## Project Overview

This repository contains a GitHub App that automatically generates unit tests for pull requests using the GitHub Copilot SWE agent. The app is triggered by issue creation or workflow dispatch, analyzes changed files, and uses the Copilot agent to generate appropriate unit tests.

## Core Components

### Issue-Based Generation
- Issue templates at `.github/ISSUE_TEMPLATE/` define the format for test generation requests
- Test generation is triggered by issues with the `test-generation` label and assignment to `copilot-swe-agent`
- Key fields: target repository, target branch, programming languages

### Agent Components
- **GitHub Copilot (formerly Copilot SWE agent)** handles the test generation workflow:
  - Analyzes changed files and repository context
  - Determines appropriate test frameworks and patterns
  - Generates unit tests following best practices
  - Creates pull requests with generated tests
- **Agent configuration** in `.github/copilot/agent-config.yml`:
  - Defines agent behavior and test generation preferences
  - Configures frameworks and patterns per language

### Workflow Structure
- **Primary workflow**: `.github/workflows/handle-test-generation.yml`
  - Triggered by issues or manual dispatch
  - Parses issue content or uses dispatch inputs
  - Calls the generate-tests action
  - Commits generated tests back to the repository

## Development Patterns

### Configuration

1. **Agent settings** in `.github/copilot/agent-config.yml`:
   ```yaml
   enabled: true
   include_patterns:
     - "**/*.cs"
     - "**/*.java"
   frameworks:
     csharp: "xunit"
     java: "junit5"
   agent:
     type: "copilot-swe"
     instructions: ".github/copilot-instructions.md"
     test_generation:
       style: "behavior-driven"
       coverage_target: 80
   ```

2. **Required setup**:
   - GitHub Copilot for Business license
   - `GITHUB_TOKEN` with write permissions
   - Agent assigned as collaborator with write access

### Test Generation Logic

Tests are generated based on:
1. Repository and file context analysis
2. Programming language detection
3. Framework-specific patterns
4. Copilot agent's testing expertise

### Integration Points

1. **GitHub Copilot Agent**:
   - Issue and PR interaction
   - Code analysis and test generation
   - Automated PR creation and updates

2. **GitHub API**:
   - Repository access and management
   - CI/CD workflow integration

## Important Commands

```bash
# Initial repository setup
gh repo edit --enable-projects=true  # Enable project features for agent
gh api /repos/{owner}/{repo}/collaborators/copilot-swe-agent -f permission=write  # Add agent

# Trigger test generation
gh issue create --label test-generation --assignee copilot-swe-agent \
  --title "Generate tests for PR #123" \
  --body "### Target Repository
owner/repo

### Target Branch
main

### Programming Languages
- csharp
- java"

# Review agent-generated PRs
gh pr list --search "author:app/copilot-swe-agent"
```

## Key Decisions

1. Uses GitHub Copilot (Formerly Copilot SWE agent) for intelligent test generation
2. Agent operates autonomously through issues and PRs
3. Framework detection and selection is handled by agent
4. Generates comprehensive test suites with behavior-driven development approach
5. Maintains test coverage targets through automated analysis
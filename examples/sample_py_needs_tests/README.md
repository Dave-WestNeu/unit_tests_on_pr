# Example: Python Repository Setup

This directory demonstrates the complete setup that would be installed in a Python repository when using the Unit Test Generator.

## About This Example

**Repository Name:** `sample_py_needs_tests`  
**Language:** Python  
**Framework:** pytest  
**Branch:** main

This example shows the exact files and configuration that would be created by the [Setup Repository workflow](../../.github/workflows/handle-repository-setup.yml) when setting up a Python project.

## Files Included

### Configuration
- `.github/unit-test-generator.yml` - Main configuration for Python/pytest

### Workflows
- `.github/workflows/unit-test-generator.yml` - Automatic test generation on PRs
- `.github/workflows/handle-test-generation.yml` - Manual test generation via issues

### Scripts & Actions
- `.github/scripts/generate-tests.js` - Core test generation logic
- `.github/actions/generate-tests/` - Reusable composite action

### Templates
- `.github/ISSUE_TEMPLATE/generate-tests.yml` - Issue template for manual test requests

### Dependencies
- `package.json` - Node.js dependencies for the test generation system

### Documentation
- `UNIT_TEST_GENERATOR_SETUP.md` - Complete setup guide and usage instructions

## Python-Specific Configuration

The setup is configured for Python with the following defaults:

```yaml
framework: pytest
test_directory: tests
test_suffix: _test.py
file_extensions: [.py]
exclude_patterns:
  - "**/*test*.py"
  - "**/tests/**"
  - "**/__pycache__/**"
```

## How to Use This Example

1. **Review the configuration** to understand what gets installed
2. **Examine the workflows** to see how automatic test generation works
3. **Read the setup guide** (UNIT_TEST_GENERATOR_SETUP.md) for usage instructions
4. **Adapt for your needs** by modifying the configuration

## Testing the Setup

To test this configuration in your own repository:

1. Copy the `.github/` directory to your Python project
2. Copy `package.json` to your repository root
3. Add `OPENAI_API_KEY` to your repository secrets
4. Create a PR with Python code changes
5. Watch as tests are automatically generated!

## See Also

- [Main README](../../README.md) - Overview of the Unit Test Generator
- [Setup Repository Workflow](../../.github/workflows/handle-repository-setup.yml) - Automation that creates these files
- [Setup Template](../../.github/ISSUE_TEMPLATE/setup-repository.yml) - Issue template to trigger setup

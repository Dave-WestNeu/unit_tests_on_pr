# Setup Examples

This directory contains complete examples of the Unit Test Generator setup for different programming languages.

## Available Examples

### Python - sample_py_needs_tests
Complete setup example for a Python repository using pytest.

**See:** [sample_py_needs_tests/](./sample_py_needs_tests/)

**Includes:**
- Python/pytest configuration
- Automatic PR-based test generation
- Manual issue-based test generation
- Complete documentation

## What These Examples Show

Each example demonstrates the **exact files and configuration** that would be automatically created when you:

1. Create an issue using the [Setup Repository template](../.github/ISSUE_TEMPLATE/setup-repository.yml)
2. The [setup workflow](../.github/workflows/handle-repository-setup.yml) runs
3. Files are generated in your target repository
4. A pull request is created with the setup

## Using These Examples

### As Documentation
Browse the examples to understand what the setup process creates and how the system works.

### As Templates
Copy the relevant example to bootstrap your own repository manually (though using the automated setup is recommended).

### For Testing
Use these examples to test modifications to the setup workflow or configuration generation.

## Adding More Examples

To add a new example for another language:

1. Create a directory: `examples/{repository-name}/`
2. Generate the configuration using the language-specific settings
3. Copy workflows, scripts, and actions
4. Add language-specific documentation
5. Create a README.md explaining the setup

## See Also

- [Main README](../README.md) - Project overview
- [Setup Template](../.github/ISSUE_TEMPLATE/setup-repository.yml) - Start automated setup
- [Setup Workflow](../.github/workflows/handle-repository-setup.yml) - Automation details

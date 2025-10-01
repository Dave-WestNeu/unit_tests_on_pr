# Unit Test Generator

Automatically generates unit tests for pull requests using AI.

## Setup

1. **Repository Setup**:
   - Copy `.github/unit-test-generator.yml` to your repository
   - Copy `.github/workflows/unit-test-generator.yml` to your repository
   - Copy `.github/scripts/generate-tests.js` to your repository

2. **Configure Secrets**:
   - Add `OPENAI_API_KEY` to your repository secrets
   - Ensure `GITHUB_TOKEN` has write permissions

3. **Customize Configuration**:
   Edit `.github/unit-test-generator.yml` to match your preferences:
   
   ```yaml
   # Enable/disable the feature
   enabled: true
   
   # Customize file patterns
   include_patterns:
     - "**/*.cs"
     - "**/*.java"
   
   # Set test frameworks
   frameworks:
     csharp: "xunit"
     java: "junit5"
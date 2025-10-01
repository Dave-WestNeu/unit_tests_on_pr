# Unit Test Generator

[![Install App](https://img.shields.io/badge/Install-GitHub%20App-blue?style=for-the-badge&logo=github)](https://github.com/apps/unit-test-generator)

> **Note**: The installation link above will work once your app is published to the GitHub Marketplace. For now, users can install via the manifest URL (see below).

Automatically generates unit tests for pull requests using AI.

## 🚀 Quick Install

### Option 1: Install Published App (Coming Soon)
Click the badge above or visit: https://github.com/apps/unit-test-generator

### Option 2: Install via Manifest (Available Now)
1. Click this link to create your own instance: 
   [![Create GitHub App](https://img.shields.io/badge/Create-Your%20Own%20App-green?style=for-the-badge&logo=github)](https://github.com/settings/apps/new?manifest_url=https://raw.githubusercontent.com/Dave-WestNeu/unit_tests_on_pr/main/app.yml)

2. Follow the GitHub App creation wizard
3. Install the app on your repositories

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
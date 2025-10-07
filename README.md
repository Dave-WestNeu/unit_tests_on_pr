# Unit Test Generator

[![One-Click Setup](https://img.shields.io/badge/Setup-One%20Click-brightgreen?style=for-the-badge&logo=github)](https://github.com/Dave-WestNeu/unit_tests_on_pr/issues/new?template=setup-repository.yml&title=Setup%20Unit%20Test%20Generator%20Request)

## 🚀 Super Simple Setup

1. **Click the badge above** 
2. **Enter your repository name** (e.g., `myorg/my-app`)
3. **Submit the issue**
4. **Add your OpenAI API key** to repository secrets as `OPENAI_API_KEY`
5. **Merge the setup PR** when it's created
6. **Done!** ✨

## What Happens Automatically

- ✅ **Language Detection**: Automatically detects your programming languages
- ✅ **Smart Defaults**: Uses best-practice configurations for each language  
- ✅ **Workflow Setup**: Installs all necessary workflows and scripts
- ✅ **Documentation**: Creates setup guide and usage instructions
- ✅ **Ready to Go**: Start creating PRs and watch tests generate!

## Supported Languages (Auto-Detected)

- **C#** → xUnit framework, Tests/ directory
- **Java** → JUnit 5, src/test/java/ directory  
- **JavaScript** → Jest framework, __tests__/ directory
- **TypeScript** → Jest framework, __tests__/ directory
- **Python** → pytest framework, tests/ directory

## Advanced Usage (Optional)

Want to customize? After setup, edit `.github/unit-test-generator.yml` in your repository.
## 🛠️ Automated Repository Setup

**New!** You can now automatically setup any repository with unit test generation capabilities:

### Quick Setup via Issue
1. **Create Setup Request**: [Create Repository Setup Issue](https://github.com/Dave-WestNeu/unit_tests_on_pr/issues/new?template=setup-repository.yml)
2. **Fill Form**: Specify target repository, languages, and features
3. **Submit**: The system automatically creates a setup PR in your target repository
4. **Add Secret**: Add `OPENAI_API_KEY` to your repository secrets
5. **Merge**: Merge the setup PR and start generating tests!

### What Gets Automatically Configured

The setup process creates:

- ✅ **Configuration file** (`.github/unit-test-generator.yml`)
- ✅ **Workflow files** (automatic and manual test generation)
- ✅ **Issue templates** (for manual test requests)  
- ✅ **Scripts and actions** (test generation logic)
- ✅ **Documentation** (setup guide and usage instructions)
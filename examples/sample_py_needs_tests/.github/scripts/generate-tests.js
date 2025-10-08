const OpenAI = require('openai');
const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function loadConfig() {
  try {
    const configPath = '.github/unit-test-generator.yml';
    const configFile = fs.readFileSync(configPath, 'utf8');
    return yaml.load(configFile);
  } catch (error) {
    console.log('Using default configuration');
    return {
      enabled: true,
      frameworks: {
        csharp: "xunit",
        java: "junit5", 
        javascript: "jest",
        typescript: "jest",
        python: "pytest"
      },
      ai_settings: {
        model: "gpt-4",
        temperature: 0.1,
        max_tokens: 4000,
        seed: 12345
      },
      min_file_size: 10,
      max_files_per_pr: 20
    };
  }
}

function getLanguage(filename) {
  const ext = path.extname(filename).toLowerCase();
  const langMap = {
    '.cs': 'csharp',
    '.java': 'java', 
    '.js': 'javascript',
    '.ts': 'typescript',
    '.py': 'python'
  };
  return langMap[ext] || 'unknown';
}

function getTestFramework(language, config) {
  return config.frameworks[language] || 'unknown';
}

function getTestFileName(sourceFile, language) {
  const dir = path.dirname(sourceFile);
  const baseName = path.basename(sourceFile, path.extname(sourceFile));
  
  const testDirs = {
    'csharp': 'Tests',
    'java': 'src/test/java',
    'javascript': '__tests__',
    'typescript': '__tests__',
    'python': 'tests'
  };
  
  const testExtensions = {
    'csharp': '.Tests.cs',
    'java': 'Test.java',
    'javascript': '.test.js',
    'typescript': '.test.ts', 
    'python': '_test.py'
  };
  
  const testDir = testDirs[language] || 'tests';
  const testExt = testExtensions[language] || '.test';
  
  return path.join(testDir, `${baseName}${testExt}`);
}

async function generateTestsWithAI(sourceCode, language, filename, framework, config) {
  const prompt = `
Generate comprehensive unit tests for the following ${language} code from file ${filename}:

\`\`\`${language}
${sourceCode}
\`\`\`

Requirements:
- Use ${framework} testing framework
- Cover all public methods and edge cases
- Include setup/teardown where needed
- Follow ${language} naming conventions
- Add descriptive test names and comments
- Mock external dependencies where appropriate
- Include both positive and negative test cases
- Ensure good test coverage

Generate only the test code, no explanations.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: config.ai_settings.model,
      messages: [{ role: "user", content: prompt }],
      temperature: config.ai_settings.temperature,
      max_tokens: config.ai_settings.max_tokens,
      seed: config.ai_settings.seed
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error(`Error generating tests for ${filename}:`, error);
    return null;
  }
}

async function main() {
  try {
    const config = await loadConfig();
    
    if (!config.enabled) {
      console.log('Unit test generation is disabled');
      return;
    }

    const changedFiles = process.env.CHANGED_FILES ? process.env.CHANGED_FILES.split(' ') : [];
    
    if (changedFiles.length === 0) {
      console.log('No changed files to process');
      return;
    }

    // Limit files processed per PR
    const filesToProcess = changedFiles.slice(0, config.max_files_per_pr);
    const results = [];

    for (const file of filesToProcess) {
      try {
        // Check if file exists and meets minimum size
        if (!fs.existsSync(file)) {
          console.log(`File ${file} does not exist, skipping`);
          continue;
        }

        const sourceCode = fs.readFileSync(file, 'utf8');
        const lineCount = sourceCode.split('\n').length;
        
        if (lineCount < config.min_file_size) {
          console.log(`File ${file} is too small (${lineCount} lines), skipping`);
          continue;
        }

        const language = getLanguage(file);
        if (language === 'unknown') {
          console.log(`Unknown language for ${file}, skipping`);
          continue;
        }

        const framework = getTestFramework(language, config);
        if (framework === 'unknown') {
          console.log(`No framework configured for ${language}, skipping`);
          continue;
        }

        console.log(`Generating tests for ${file} (${language}, ${framework})`);
        
        const testCode = await generateTestsWithAI(sourceCode, language, file, framework, config);
        
        if (testCode) {
          const testFile = getTestFileName(file, language);
          const testDir = path.dirname(testFile);
          
          // Create test directory if it doesn't exist
          if (!fs.existsSync(testDir)) {
            fs.mkdirSync(testDir, { recursive: true });
          }
          
          // Write test file
          fs.writeFileSync(testFile, testCode);
          
          results.push({
            sourceFile: file,
            testFile: testFile,
            language: language,
            framework: framework,
            status: 'success'
          });
          
          console.log(`✅ Generated tests: ${testFile}`);
        } else {
          results.push({
            sourceFile: file,
            testFile: null,
            language: language,
            framework: framework,
            status: 'failed'
          });
          
          console.log(`❌ Failed to generate tests for: ${file}`);
        }
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
        results.push({
          sourceFile: file,
          testFile: null,
          language: getLanguage(file),
          framework: 'unknown',
          status: 'error',
          error: error.message
        });
      }
    }

    // Generate summary report
    const summary = generateSummary(results);
    fs.writeFileSync('test-generation-summary.md', summary);
    
    console.log('\n' + summary);
    
  } catch (error) {
    console.error('Error in main:', error);
    process.exit(1);
  }
}

function generateSummary(results) {
  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'failed');
  const errors = results.filter(r => r.status === 'error');
  
  let summary = `### Summary\n\n`;
  summary += `- ✅ **${successful.length}** test files generated successfully\n`;
  summary += `- ❌ **${failed.length}** files failed to generate tests\n`;
  summary += `- 🚨 **${errors.length}** files had errors\n\n`;
  
  if (successful.length > 0) {
    summary += `### Generated Test Files\n\n`;
    successful.forEach(result => {
      summary += `- \`${result.testFile}\` (${result.framework}) for \`${result.sourceFile}\`\n`;
    });
    summary += `\n`;
  }
  
  if (failed.length > 0 || errors.length > 0) {
    summary += `### Issues\n\n`;
    [...failed, ...errors].forEach(result => {
      summary += `- ❌ \`${result.sourceFile}\` (${result.language})`;
      if (result.error) {
        summary += ` - Error: ${result.error}`;
      }
      summary += `\n`;
    });
  }
  
  return summary;
}

if (require.main === module) {
  main();
}
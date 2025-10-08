#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");
const inquirer = require("inquirer");

// Questions
theQuestions = [
  {
    type: "list",
    name: "language",
    message: "Which programming language do you prefer?",
    choices: ["Java", "Python", "JavaScript", "TypeScript", "C#"],
  },
  {
    type: "list",
    name: "platform",
    message: "What do you want to test?",
    choices: ["Web", "Mobile", "API", "Desktop", "Cross-platform"],
  },
  {
    type: "checkbox",
    name: "browsers",
    message: "Which browsers do you need to support?",
    choices: ["Chrome", "Firefox", "Safari", "Edge", "IE"],
  },
  {
    type: "confirm",
    name: "parallel",
    message: "Do you need parallel execution?",
    default: true,
  },
  {
    type: "list",
    name: "ci",
    message: "Which CI/CD pipeline do you use?",
    choices: ["GitHub Actions", "GitLab CI", "Jenkins", "Azure DevOps", "None"],
  },
];

// Framework selection logic
function recommendFramework(answers) {
  let recommendation = "";

  if (answers.platform === "Web") {
    if (["JavaScript", "TypeScript"].includes(answers.language)) {
      recommendation = "Playwright";
    } else if (answers.language === "Java") {
      recommendation = "Selenium";
    } else if (answers.language === "Python") {
      recommendation = "Selenium";
    }
  } else if (answers.platform === "Mobile") {
    recommendation = "Appium";
  } else if (answers.platform === "API") {
    recommendation = "REST Assured (Java) or pytest + requests (Python)";
  } else if (answers.platform === "Cross-platform") {
    recommendation = "Playwright or Appium";
  }

  return recommendation;
}

// Generate boilerplate project
function generateBoilerplate(answers, framework) {
  const outDir = path.join(process.cwd(), `${framework}-${answers.language}-boilerplate`);
  fs.ensureDirSync(outDir);

  // sample structure
  fs.outputFileSync(path.join(outDir, "README.md"), `# ${framework} Boilerplate (Language: ${answers.language})\n`);

  // Add minimal sample test file
  if (framework === "Playwright") {
    const testDir = path.join(outDir, "tests");
    fs.ensureDirSync(testDir);
    fs.writeFileSync(
      path.join(testDir, "example.spec.ts"),
      `import { test, expect } from '@playwright/test';\n\ntest('homepage has title', async ({ page }) => {\n  await page.goto('https://playwright.dev');\n  await expect(page).toHaveTitle(/Playwright/);\n});\n`
    );
  } else if (framework === "Selenium") {
    const testDir = path.join(outDir, "tests");
    fs.ensureDirSync(testDir);
    fs.writeFileSync(
      path.join(testDir, "ExampleTest.java"),
      `import org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\n\npublic class ExampleTest {\n  public static void main(String[] args) {\n    WebDriver driver = new ChromeDriver();\n    driver.get("https://www.selenium.dev");\n    System.out.println(driver.getTitle());\n    driver.quit();\n  }\n}`
    );
  }

  // Zip the project
  const zipPath = `${outDir}.zip`;
  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on("close", () => {
      console.log(`\n✅ Project boilerplate generated: ${zipPath}`);
      resolve();
    });
    archive.on("error", (err) => reject(err));
    archive.pipe(output);
    archive.directory(outDir, false);
    archive.finalize();
  });
}

async function main() {
  const prompt = inquirer.createPromptModule();
  console.log("\n🚀 Test Automation Framework Selection & Boilerplate Generator\n");

  const answers = await prompt(theQuestions);
  const framework = recommendFramework(answers);

  console.log("\n📌 Recommended Framework:", framework);
  console.log("\nGenerating boilerplate project...");

  await generateBoilerplate(answers, framework);
}

main();

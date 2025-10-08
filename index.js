#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");

// --- Database Enriched & Organized by Category ---
const REPO_DATABASE = [
    // --- JavaScript Web Frameworks ---
    { name: "Playwright", language: "JavaScript", target: ["desktop_web", "mobile_web"], style: "e2e_modern", parallel: { level: 'file', rating: 'excellent' }, cloud_grid: "excellent", reporting: "excellent", debugging: 'excellent', component_testing: true, url: "https://github.com/BrowserStackCE/browserstack-examples-playwright", note: "A modern framework from Microsoft, known for its speed, reliability, and excellent cross-browser/platform capabilities.", limitations: "Its auto-waiting mechanism can sometimes be less intuitive than Cypress's for complex, dynamic applications. The community plugin ecosystem is still growing compared to older frameworks." },
    { name: "Playwright with Cucumber", language: "JavaScript", target: ["desktop_web", "mobile_web"], style: "bdd", parallel: { level: 'scenario', rating: 'excellent' }, cloud_grid: "excellent", reporting: "excellent", debugging: 'excellent', component_testing: true, url: "https://github.com/BrowserStackCE/playwright-cucumber-browserstack", note: "Combines Playwright's modern engine with Cucumber's BDD syntax for a powerful, fast, and scalable testing solution.", limitations: "Adds an extra layer of abstraction (Cucumber) which can slightly increase complexity and maintenance overhead compared to non-BDD Playwright." },
    { name: "Cypress (Mocha)", language: "JavaScript", target: ["desktop_web"], style: "e2e_modern", parallel: { level: 'file', rating: 'excellent' }, cloud_grid: "good", reporting: "good", debugging: 'excellent', component_testing: true, url: "https://github.com/BrowserStackCE/browserstack-examples-cypress", note: "Offers an industry-leading developer experience and visual debugger for desktop web testing.", limitations: "Has architectural limitations with multi-tab/multi-window testing and lacks native support for Safari. Real mobile device testing is not its core strength." },
    { name: "WebdriverIO", language: "JavaScript", target: ["desktop_web", "mobile_web"], style: "e2e_modern", parallel: { level: 'file', rating: 'excellent' }, cloud_grid: "excellent", reporting: "excellent", debugging: 'good', component_testing: true, url: "https://github.com/BrowserStackCE/browserstack-examples-appium-webdriverio", note: "Extremely flexible and extensible, based on the WebDriver standard for native access to cloud grids.", limitations: "Configuration can be complex due to its vast flexibility. The out-of-the-box debugging experience is not as visual or interactive as Cypress or Playwright." },
    { name: "WebDriverIO + Cucumber", language: "JavaScript", target: ["desktop_web", "mobile_web"], style: "bdd", parallel: { level: 'scenario', rating: 'excellent' }, cloud_grid: "excellent", reporting: "excellent", debugging: 'good', component_testing: false, url: "https://github.com/browserstack-webdriverio-appium-cucumber", note: "A powerful BDD stack with excellent support for running individual scenarios in parallel on desktop and mobile browsers.", limitations: "As with any WebDriver-based tool, setup can be more involved than all-in-one solutions. Can feel verbose compared to non-BDD alternatives." },
    // --- Java Web Frameworks ---
    { name: "TestNG", language: "Java", target: ["desktop_web", "mobile_web"], style: "traditional", parallel: { level: 'method', rating: 'excellent' }, cloud_grid: "excellent", reporting: "excellent", debugging: 'good', component_testing: false, url: "https://github.com/BrowserStackCE/browserstack-examples-testng", note: "Powerful, highly configurable runner with native support for granular (method-level) parallel execution.", limitations: "Its XML-based configuration can be verbose. While still powerful, its popularity in new projects is lower than JUnit 5." },
    { name: "JUnit 5", language: "Java", target: ["desktop_web", "mobile_web"], style: "traditional", parallel: { level: 'class', rating: 'excellent' }, cloud_grid: "excellent", reporting: "excellent", debugging: 'good', component_testing: false, url: "https://github.com/BrowserStackCE/browserstack-examples-junit5", note: "The modern, modular, and extensible standard for Java testing, with great support from the ecosystem.", limitations: "Native parallelism is class-based. While sufficient for many, it's less granular than TestNG's method-level parallelism." },
    { name: "Cucumber + JUnit 5", language: "Java", target: ["desktop_web", "mobile_web"], style: "bdd", parallel: { level: 'file', rating: 'good' }, cloud_grid: "excellent", reporting: "excellent", debugging: 'good', component_testing: false, url: "https://github.com/BrowserStackCE/browserstack-examples-cucumber-junit5", note: "A modern BDD stack that integrates well with the standard Java ecosystem via JUnit 5.", limitations: "The default JUnit runner for Cucumber does not support scenario-level parallelism, which can be a bottleneck for large BDD suites." },
    { name: "Cucumber + TestNG", language: "Java", target: ["desktop_web", "mobile_web"], style: "bdd", parallel: { level: 'scenario', rating: 'excellent' }, cloud_grid: "excellent", reporting: "excellent", debugging: 'good', component_testing: false, url: "https://github.com/BrowserStackCE/browserstack-examples-cucumber-testng", note: "An enterprise-grade BDD stack. TestNG's runner enables true parallel execution of individual scenarios.", limitations: "Combines two mature but complex tools. Can have a steeper learning curve and more configuration overhead than simpler setups." },
    // --- Cross-Platform Mobile App Frameworks ---
    { name: "Appium with WebdriverIO", language: "JavaScript", target: ["mobile_app"], style: "cross_platform_traditional", parallel: { level: 'file', rating: 'excellent' }, cloud_grid: "excellent", reporting: "excellent", debugging: 'good', component_testing: false, url: "https://github.com/BrowserStackCE/browserstack-examples-appium-webdriverio", note: "Combines WebdriverIO's powerful runner and syntax with Appium's cross-platform mobile capabilities for iOS and Android.", limitations: "Setup is complex, involving multiple layers (WDIO, Appium, mobile drivers). Debugging can be challenging across all layers." },
    { name: "Appium with WebdriverIO & Cucumber", language: "JavaScript", target: ["mobile_app"], style: "cross_platform_bdd", parallel: { level: 'scenario', rating: 'excellent' }, cloud_grid: "excellent", reporting: "excellent", debugging: 'good', component_testing: false, url: "https://github.com/browserstack-webdriverio-appium-cucumber", note: "A full-stack BDD solution for mobile apps, enabling one test suite for both iOS and Android.", limitations: "Represents a highly layered architecture which can be complex to set up and maintain. Test execution is slower than native frameworks." },
    { name: "Appium with TestNG", language: "Java", target: ["mobile_app", "mobile_web"], style: "cross_platform_traditional", parallel: { level: 'method', rating: 'excellent' }, cloud_grid: "excellent", reporting: "excellent", debugging: 'good', component_testing: false, url: "https://github.com/BrowserStackCE/browserstack-examples-appium-testng", note: "The industry standard for cross-platform mobile automation, paired with TestNG for powerful parallel execution.", limitations: "Setup is complex, involving multiple dependencies (Node.js, Appium Server, SDKs). Mobile tests are inherently slower and can be more flaky than desktop web tests." },
    { name: "Appium with JUnit 5", language: "Java", target: ["mobile_app"], style: "cross_platform_traditional", parallel: { level: 'class', rating: 'excellent' }, cloud_grid: "excellent", reporting: "excellent", debugging: 'good', component_testing: false, url: "https://github.com/BrowserStackCE/browserstack-examples-appium-junit5", note: "A modern approach to cross-platform mobile testing using the standard JUnit 5 runner.", limitations: "JUnit 5's parallelism is class-based, which is less granular than TestNG's method-level parallelism for large mobile suites." },
    { name: "Appium with Cucumber & TestNG", language: "Java", target: ["mobile_app"], style: "cross_platform_bdd", parallel: { level: 'scenario', rating: 'excellent' }, cloud_grid: "excellent", reporting: "excellent", debugging: 'good', component_testing: false, url: "https://github.com/BrowserStackCE/browserstack-examples-appium-cucumber-testng", note: "An enterprise-grade BDD stack for mobile apps. TestNG's runner enables true parallel execution of individual scenarios.", limitations: "Combines three mature but complex tools. Can have a steeper learning curve and more configuration overhead than simpler setups." },
    // --- Native Mobile App Frameworks ---
    { name: "XCUITest", language: "Swift", target: ["mobile_app"], style: "native", parallel: { level: 'test', rating: 'excellent' }, cloud_grid: "excellent", reporting: "good", debugging: 'excellent', component_testing: false, url: "https://github.com/BrowserStackCE/xcuitest-sample-browserstack", note: "Apple's official framework for iOS testing, offering the best performance and deepest integration with the iOS ecosystem.", limitations: "iOS only; cannot be used for Android. Requires Xcode and knowledge of Swift/Objective-C, separating it from web automation skillsets." },
    { name: "Espresso", language: "Kotlin/Java", target: ["mobile_app"], style: "native", parallel: { level: 'test', rating: 'excellent' }, cloud_grid: "excellent", reporting: "good", debugging: 'excellent', component_testing: false, url: "https://github.com/BrowserStackCE/espresso-sample-browserstack", note: "Google's official framework for Android UI testing, providing fast and reliable tests that run inside the app process.", limitations: "Android only; cannot be used for iOS. Tests are written in Java/Kotlin, tightly coupling them with the application's source code." },
];

// --- Helper & Logic Functions (Fully Implemented) ---
const findByName = (name) => REPO_DATABASE.find(repo => repo.name === name);

function getCandidates(answers) {
    let candidates = REPO_DATABASE.filter(r => {
        if (r.language !== answers.language) return false;
        
        const answerTargets = (answers.target === 'desktop_web' || answers.target === 'mobile_web')
            ? ['desktop_web', 'mobile_web']
            : ['mobile_app'];
        if (!r.target.some(t => answerTargets.includes(t))) return false;

        if (answers.target === 'mobile_app') {
            if (answers.mobile_approach === 'native') return r.style === 'native';
            return r.style === answers.mobile_style;
        } else {
            return r.style === answers.style;
        }
    });

    if (candidates.length <= 1) return candidates;

    const bddStyle = answers.style === 'bdd' || answers.mobile_style === 'cross_platform_bdd';
    if (bddStyle && answers.parallel_bdd_level === 'scenario') {
        const scenarioRunners = candidates.filter(c => c.parallel.level === 'scenario');
        if (scenarioRunners.length > 0) candidates = scenarioRunners;
    }
    
    if (candidates.length <= 1) return candidates;

    if (answers.component_testing === true) {
        const componentTesters = candidates.filter(c => c.component_testing === true);
        if (componentTesters.length > 0) candidates = componentTesters;
    }

    if (candidates.length <= 1) return candidates;

    if (answers.debugging_preference === 'visual_debug') {
        const visualDebuggers = candidates.filter(c => c.debugging === 'excellent');
        if (visualDebuggers.length > 0) candidates = visualDebuggers;
    }

    return candidates;
}

function findRepo(answers) {
    if (answers.final_choice) return findByName(answers.final_choice);
    if (answers.native_os) return REPO_DATABASE.find(r => r.name.toLowerCase().includes(answers.native_os));
    
    const finalCandidates = getCandidates(answers);
    if (finalCandidates.length === 1) return finalCandidates[0];
    
    return finalCandidates.length > 0 ? finalCandidates[0] : null;
}

function generateFitAnalysis(repo, answers) {
    const reasons = new Set();
    if (answers.style === 'bdd' || answers.mobile_style === 'cross_platform_bdd') {
        reasons.add("It perfectly matches your selected BDD approach, enabling clear, collaborative tests.");
    }
    if (answers.parallel_bdd_level === 'scenario' && repo.parallel.level === 'scenario') {
        reasons.add("It meets your specific need for high-speed testing by supporting scenario-level parallel execution.");
    }
    if (answers.target === 'mobile_web' && repo.target.includes('mobile_web')) {
        reasons.add("It provides robust support for testing on the real mobile browsers you need to target.");
    }
    if (answers.debugging_preference === 'visual_debug' && repo.debugging === 'excellent') {
        reasons.add("It delivers the top-tier visual debugging experience that is a priority for your team.");
    }
    if (answers.component_testing === true && repo.component_testing === true) {
        reasons.add("It includes support for the component testing you require, in addition to end-to-end tests.");
    }
    reasons.add(repo.note);
    return Array.from(reasons).map(r => `│    * ${chalk.white(r)}`).join('\n');
}

// --- Segregated Question Flow for Web ---
async function runWebAppFlow(initialAnswers) {
    const prompt = inquirer.createPromptModule();
    let answers = { ...initialAnswers };
    console.log(chalk.bold.cyan("\n--- Step 2: Web Testing Style & Workflow ---"));
    const styleCandidates = REPO_DATABASE.filter(r => r.language === answers.language && r.target.includes(answers.target));
    const availableStyles = new Set(styleCandidates.map(r => r.style));
    const styleAnswers = await prompt([
        { type: "list", name: "style", message: "What style of testing best fits your team's needs?",
            choices: () => {
                const choiceMap = { bdd: 'Behavior-Driven (BDD)', traditional: 'Traditional Code-Based', e2e_modern: 'Modern All-in-One' };
                return Array.from(availableStyles).map(s => ({ name: choiceMap[s] || s, value: s}));
            }
        },
        { type: 'confirm', name: 'component_testing', message: 'Besides E2E tests, do you also need to test individual UI components?', default: false, when: () => availableStyles.has('e2e_modern')},
        { type: 'list', name: 'debugging_preference', message: 'How important is an interactive visual debugger with time-travel?',
            choices: [{ name: "It's a top priority.", value: 'visual_debug' }, { name: 'Standard debugging is sufficient.', value: 'standard_debug' }],
            when: (ans) => ans.style === 'e2e_modern'
        },
    ]);
    answers = { ...answers, ...styleAnswers };
    console.log(chalk.dim(`✔ Understood. A ${answers.style} approach for web.`));
    
    const finalCandidates = getCandidates(answers);
    if (finalCandidates.length > 1) {
        console.log(chalk.bold.cyan("\n--- Step 3: Final Selection ---"));
        const finalAnswers = await prompt([{
            type: 'list', name: 'final_choice',
            message: 'Your requirements point to a few excellent options. Please make a final choice:',
            choices: finalCandidates.map(c => ({ name: `${c.name} - ${c.note}`, value: c.name }))
        }]);
        answers = { ...answers, ...finalAnswers };
    }
    return answers;
}

// --- Segregated Question Flow for Mobile Apps ---
async function runMobileAppFlow(initialAnswers) {
    const prompt = inquirer.createPromptModule();
    let answers = { ...initialAnswers };
    console.log(chalk.bold.cyan("\n--- Step 2: Mobile App Strategy ---"));
    const mobileStrategy = await prompt([
        { type: 'list', name: 'mobile_approach', message: 'For your mobile app, which testing approach do you prefer?',
            choices: [
                { name: 'Cross-Platform - Write one test suite for both iOS & Android', value: 'cross_platform'},
                { name: 'Native - Write separate, high-performance tests for each OS', value: 'native'},
            ]
        },
        { type: 'list', name: 'native_os', message: 'Which native platform are you targeting?',
            choices: [ {name: 'iOS (using XCUITest)', value: 'xcuitest'}, {name: 'Android (using Espresso)', value: 'espresso'} ],
            when: (ans) => ans.mobile_approach === 'native'
        },
        { type: 'list', name: 'mobile_style', message: 'What style of cross-platform tests do you want to write?',
            choices: [ {name: 'Traditional Code-Based Tests', value: 'cross_platform_traditional'}, {name: 'Behavior-Driven (BDD) Tests', value: 'cross_platform_bdd'} ],
            when: (ans) => ans.mobile_approach === 'cross_platform'
        },
    ]);
    answers = {...answers, ...mobileStrategy};
    console.log(chalk.dim(`✔ Roger that. A ${answers.mobile_approach} strategy.`));
    
    const finalCandidates = getCandidates(answers);
    if (finalCandidates.length > 1) {
        console.log(chalk.bold.cyan("\n--- Step 3: Final Selection ---"));
        const finalAnswers = await prompt([{
            type: 'list', name: 'final_choice',
            message: 'Your requirements point to a few excellent options. Please make a final choice:',
            choices: finalCandidates.map(c => ({ name: `${c.name} - ${c.note}`, value: c.name }))
        }]);
        answers = { ...answers, ...finalAnswers };
    }
    return answers;
}

// --- Main CLI Execution (Dispatcher) ---
async function main() {
    console.log(chalk.bold.green("\n🚀 Welcome to the Expert Test Automation Framework Recommender!"));
    console.log(chalk.dim(`As of: ${new Date().toLocaleDateString('en-AU', { dateStyle: 'full' })}`));
    console.log(chalk.bold.cyan("\n--- Step 1: Core Requirements ---"));
    const prompt = inquirer.createPromptModule();
    const initialAnswers = await prompt([
        { type: "list", name: "target", message: "First, what is your primary testing target?",
            choices: [
                { name: 'Desktop or Mobile Web', value: 'desktop_web' },
                { name: 'Native or Hybrid Mobile App', value: 'mobile_app' },
            ]
        },
        { type: "list", name: "language", message: "And which programming language will you be using?",
            choices: (ans) => {
                const targets = (ans.target === 'desktop_web') ? ['desktop_web', 'mobile_web'] : ['mobile_app'];
                return [...new Set(REPO_DATABASE.filter(r => r.target.some(t => targets.includes(t))).map(r => r.language))];
            }
        },
    ]);
    console.log(chalk.dim(`✔ Okay, a ${initialAnswers.language} solution for ${initialAnswers.target === 'desktop_web' ? 'Web' : 'Mobile App'} testing.`));

    let finalAnswers;
    if (initialAnswers.target === 'desktop_web') {
        finalAnswers = await runWebAppFlow(initialAnswers);
    } else if (initialAnswers.target === 'mobile_app') {
        finalAnswers = await runMobileAppFlow(initialAnswers);
    } else {
        throw new Error("Invalid target selected.");
    }

    const spinner = ora(chalk.blue('Analyzing your requirements to find the perfect match...')).start();
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    const recommendedRepo = findRepo(finalAnswers);
    spinner.succeed(chalk.bold.green("Analysis Complete!"));

    if (recommendedRepo) {
        console.log(chalk.yellow("\n┌───────────────────────────────────────────────────────────────────┐"));
        console.log(chalk.yellow(`│ ${chalk.bold.white(' ✅ Recommendation Complete!')}                                          │`));
        console.log(chalk.yellow("├───────────────────────────────────────────────────────────────────┘"));
        console.log(`│ Based on your answers, we recommend: ${chalk.bold.green(recommendedRepo.name)}`);
        console.log("│");
        console.log(`│ ${chalk.bold.cyan('💡 Why it\'s a great fit for you:')}`);
        console.log(generateFitAnalysis(recommendedRepo, finalAnswers));
        console.log("│");
        console.log(`│ ${chalk.bold.yellow('🤔 Potential Limitations to Consider:')}`);
        console.log(`│    * ${chalk.white(recommendedRepo.limitations)}`);
        console.log("│");
        console.log(`│ ${chalk.bold.cyan('🚀 To get started, clone the repository:')}`);
        console.log(`│    ${chalk.bold.white(`git clone ${recommendedRepo.url}`)}`);
        console.log(chalk.yellow("└───────────────────────────────────────────────────────────────────"));
    } else {
        console.log(chalk.red("\n❌ Sorry, a suitable framework could not be determined from your selections."));
    }
    console.log();
}

main().catch(error => {
    console.error(chalk.red("\nAn unexpected error occurred:", error));
});
# Test Automation Boilerplate Generator

**An interactive CLI to instantly generate a starter test automation project.**

![Language](https://img.shields.io/badge/language-Node.js-green?style=for-the-badge&logo=nodedotjs)
![License](https://img.shields.io/badge/license-MIT-purple?style=for-the-badge)
![Status](https://img.shields.io/badge/status-Active-brightgreen?style=for-the-badge)

</div>

This command-line tool streamlines the setup process for new test automation projects. It asks a series of questions about your technical stack and testing needs, then generates a minimal, ready-to-use boilerplate project packaged in a `.zip` file.

---

## Table of Contents

-   [Core Features](#-core-features)
-   [How It Works](#️-how-it-works)
-   [Supported Frameworks](#-supported-frameworks)
-   [Getting Started](#-getting-started)
-   [Future Roadmap & Contributing](#-future-roadmap--contributing)
-   [License](#-license)

## ✨ Core Features

* **🤖 Interactive Setup:** A simple and intuitive command-line wizard guides you through the configuration.
* **🚀 Instant Boilerplate Generation:** Go from zero to a functional project structure in seconds.
* **📦 Packaged for Convenience:** The generated project is delivered as a clean `.zip` archive, ready to be shared or unzipped anywhere.
* **✍️ Pre-configured Starters:** Includes minimal, working test examples for **Playwright** and **Selenium** to get you started immediately.

## ⚙️ How It Works

The tool performs a few simple steps:

1.  **Asks Questions:** It prompts you for key information, such as your preferred programming language and the platform you intend to test (Web, Mobile, API, etc.).
2.  **Recommends a Framework:** Based on your answers, it selects a suitable framework.
3.  **Generates Files:** It creates a new directory containing a basic `README.md` and a sample test file for the recommended framework.
4.  **Zips the Archive:** Finally, it packages the entire directory into a `.zip` file and places it in your current working directory.

## ✅ Supported Frameworks

This tool currently provides boilerplate code for the following combinations:

| Platform | Language                  | Framework Recommended | Boilerplate Status |
| :------- | :------------------------ | :-------------------- | :----------------- |
| **Web** | `JavaScript` / `TypeScript` | `Playwright`          | ✅ Generated       |
| **Web** | `Java` / `Python`           | `Selenium`            | ✅ Generated       |
| **Mobile** | Any                       | `Appium`              | ⚠️ Basic README only |
| **API** | Any                       | Varies                | ⚠️ Basic README only |

> **Note:** For combinations marked with ⚠️, the tool will still generate a named folder and a README, but it does not yet include sample test code. Contributions are welcome!

## 🚀 Getting Started

To run this tool on your local machine, follow these steps:

**1. Prerequisites:**
* You must have [Node.js](https://nodejs.org/) (v16.x or newer) and npm installed.

**2. Clone the Repository:**
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
3. Install Dependencies:

Bash

npm install
4. Run the Tool:

Bash

node index.js
Follow the on-screen prompts, and the final .zip file will appear in your project directory.

🛣️ Future Roadmap & Contributing
This project is actively being developed. We welcome contributions from the community! Here are some areas we'd love help with:

[ ] Expanding Boilerplate Support:

Add a sample test for Appium (Mobile).

Add templates for API testing (REST Assured for Java, pytest for Python).

[ ] Improving Recommendation Logic:

Utilize all the questions (Browsers, Parallel, CI/CD) to provide more intelligent recommendations and configurations.

Handle all language/platform combinations gracefully.

[ ] Adding Features:

Add an option to generate the project in a plain directory instead of a zip file.

Integrate basic dependency management files (pom.xml, package.json, requirements.txt).

Please feel free to fork the repository, make changes, and submit a Pull Request.


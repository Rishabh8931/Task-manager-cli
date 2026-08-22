# 📋 Task CLI

A modern, fast, and feature-rich command-line task manager built with TypeScript, featuring an interactive menu, rich colorized outputs, and persistent local storage.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![npm package](https://img.shields.io/badge/npm-v1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)

---

## ✨ Features

- 🎨 **Interactive Terminal Interface:** Powered by `@clack/prompts` for seamless arrow-key navigation, prompts, and spinners.
- 📊 **Rich Visual Output:** Styled data tables using `cli-table3` and `chalk`.
- 📁 **OS-Compliant Persistence:** Uses `env-paths` to save tasks cleanly in standard OS application directories.
- ⚡ **Dual Execution Modes:** Run commands directly (e.g., `task add "Buy groceries"`) or launch the interactive dashboard by simply typing `task`.
- 🛡️ **Type-Safe Core:** Built with strict TypeScript validation, custom error handling, and runtime guard statements.

---

## 📦 Installation

### Global Installation (Recommended)

Install globally via `npm`:

```bash
npm install -g task-cli
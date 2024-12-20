# Vue 🚀 Starter Template

> 基于 ⚡ Vite 构建的 Vue 3 项目起始模板，包含常用插件和工具，支持快速开发 🛠️ 和测试 🧪，为开发者提供最佳的体验。

## 📚 目录

- [📖 简介](#📖-简介)
- [✨ 特性](#✨-特性)
- [🔧 安装](#🔧-安装)
- [🚀 使用](#🚀-使用)
- [📜 脚本命令](#📜-脚本命令)
- [🗂️ 项目结构](#🗂️-项目结构)
- [🔌 插件和依赖](#🔌-插件和依赖)
- [🤝 贡献](#🤝-贡献)
- [📜 许可证](#📜-许可证)

## 📖 简介

这是一个基于 ⚡ Vite 构建的 Vue 3 项目起始模板。项目预配置了许多常用插件和开发工具 🛠️，帮助您快速上手 Vue 3 项目的开发。通过使用 TypeScript、Pinia、Vue Router 和 Cypress 等工具，极大地提升了开发和测试体验 🧪。这个模板旨在提供一个开箱即用的环境，以帮助开发者更加专注于业务逻辑的实现，而不是构建和配置工具链。

无论是小型项目还是大型企业级应用，这个模板都可以帮助您快速启动项目，同时支持更好地管理状态、路由、样式等方面的工作。它可以极大地缩短开发周期，同时提供现代化的开发工具支持，确保代码的可维护性和可扩展性。

## ✨ 特性

- **⚡ Vite**: 极速的开发服务器和构建工具，提供了极快的冷启动速度和热模块替换。
- **🔮 Vue 3**: 最新的 Vue 框架，包含组合式 API，让代码更具可读性和复用性。
- **🛤️ Vue Router**: 高效的路由管理，使得多页面应用的开发变得简单直观。
- **📦 Pinia**: 强大的状态管理工具，是 Vue 官方推荐的新一代状态管理方案。
- **📝 TypeScript**: 强类型的开发体验，帮助开发者提前发现潜在问题，提升代码质量。
- **⚙️ 自动导入**: 使用 unplugin-auto-import 自动导入 Vue、Pinia 等 API，无需手动 import。
- **🔄 自动生成组件**: 使用 unplugin-vue-components 自动加载组件，减少重复导入的工作量。
- **💅 UnoCSS**: 一种灵活且强大的原子 CSS 框架，允许快速地进行样式定制和应用。
- **🖼️ Imagemin**: 构建时对图像进行压缩，优化资源，减少最终打包的体积。
- **🛠️ Vue DevTools**: 集成 Vue DevTools，使得开发过程中对组件状态和路由的调试更加轻松。
- **🧪 Cypress**: 集成端到端测试，确保应用的稳定性和可靠性，帮助捕捉错误和改进用户体验。
- **🔗 Git Hooks**: 使用 simple-git-hooks 和 lint-staged 提高代码提交质量，确保每次提交都是符合代码规范的。

## 🔧 安装

首先，确保您已经安装了 [Node.js](https://nodejs.org/) 和 [PNPM](https://pnpm.io/)。如果尚未安装，请先完成安装。

接下来，克隆此项目并运行以下命令来安装项目依赖：

```bash
pnpm install
```

这将自动安装项目所需的所有依赖项，并为您创建一个可以立即使用的开发环境。

## 🚀 使用

启动开发服务器，开始您的开发之旅：

```bash
pnpm dev
```

运行此命令后，您可以在浏览器中打开 [http://localhost:5173](http://localhost:5173) 查看您的项目。任何更改都会自动重新加载页面，使得开发过程流畅快捷。

构建生产环境包，准备发布应用：

```bash
pnpm build
```

生成的静态文件将存放在 `dist` 文件夹中，您可以将这些文件部署到生产环境的服务器上。

本地预览生产环境包，查看构建结果：

```bash
pnpm preview
```

此命令将会启动一个本地服务器，您可以查看生产版本的最终效果。

运行测试，确保项目质量：

```bash
pnpm test:unit      # 单元测试
pnpm test:e2e       # 端到端测试
```

通过这些测试命令，您可以确保应用程序的各个部分按预期工作。单元测试覆盖组件逻辑，端到端测试覆盖用户使用场景。

## 📜 脚本命令

以下是 `package.json` 中预配置的脚本命令，这些命令使开发和维护过程更加方便：

- `pnpm dev`: 启动开发服务器，进行本地开发。
- `pnpm build`: 运行生产构建，包含类型检查和代码打包。
- `pnpm preview`: 预览生产环境包，查看打包后的效果。
- `pnpm test:unit`: 运行 Vitest 进行单元测试。
- `pnpm test:e2e`: 使用 Cypress 进行端到端测试，验证用户交互流程。
- `pnpm lint`: 使用 ESLint 进行代码格式检查和修复，确保代码风格统一。

## 🗂️ 项目结构

```
vue-starter-template/
├── src/
│   ├── components/           # 🧩 公共组件
│   ├── views/                # 📄 页面组件
│   ├── hooks/                # 🪝 自定义钩子函数
│   ├── auto-typings/         # 🔄 自动生成的类型文件
│   └── main.ts               # 🚪 项目入口文件
├── public/                   # 🌍 公共静态资源
├── tsconfig.json             # 🛠️ TypeScript 配置
└── vite.config.ts            # ⚙️ Vite 配置文件
```

以上是项目的基本目录结构。`src` 文件夹包含应用程序的核心代码，如组件、页面和自定义钩子函数。`public` 文件夹用于存放静态资源，`tsconfig.json` 和 `vite.config.ts` 分别为 TypeScript 和 Vite 的配置文件。

## 🔌 插件和依赖

项目中使用了以下主要插件和依赖，帮助您更轻松地进行开发：

### ⏱️ 运行时依赖

- **🔮 vue**: Vue 3 框架，用于构建用户界面。
- **🛤️ vue-router**: 路由管理工具，提供页面间的导航。
- **📦 pinia**: 状态管理工具，帮助管理应用的全局状态。
- **🔧 @vueuse/core**: 提供了一些实用的 Vue 钩子函数，简化开发工作。

### ⚙️ 开发依赖

- **⚡ vite**: 构建工具，提供快速的开发体验和高效的打包。
- **📝 typescript**: 为项目提供类型检查，增强代码的可维护性和可靠性。
- **⚙️ unplugin-auto-import**: 自动导入常用模块，减少重复代码。
- **🔄 unplugin-vue-components**: 自动加载 Vue 组件，提高开发效率。
- **🖼️ unplugin-imagemin**: 图片资源优化，减少最终构建包的体积。
- **🔌 @vitejs/plugin-vue**: Vite 的 Vue 支持插件，提供 Vue 组件编译支持。
- **🔌 @vitejs/plugin-vue-jsx**: 支持 Vue JSX 语法，使组件编写更加灵活。
- **🧪 cypress**: 端到端测试工具，用于测试用户与应用的交互过程。
- **🛠️ vite-plugin-vue-devtools**: 集成 Vue DevTools，方便调试 Vue 应用。
- **🔍 eslint**: 代码质量检查工具，确保代码风格统一和无错误。
- **💅 sass-embedded**: 支持 SCSS 样式编写，使样式更加模块化和易于维护。
- **🚀 start-server-and-test**: 测试时启动服务器，确保测试过程顺利。
- **🔗 simple-git-hooks**: Git Hooks 工具，用于在特定 Git 事件发生时执行操作，如提交前代码检查。
- **📝 lint-staged**: 只对暂存区的文件执行 Lint 检查，确保提交的代码符合规范，提高代码质量。

## 🤝 贡献

欢迎任何形式的贡献！如果您有新的想法或发现了错误，欢迎提 Issue 或提交 PR。在提交 PR 之前，请确保运行以下命令来检查代码格式：

```bash
pnpm lint
```

我们非常感谢每一位为这个项目作出贡献的人。无论是修复 Bug、改进文档还是添加新功能，您的贡献都是项目成功的重要组成部分。

## 📜 许可证

本项目基于 [MIT](LICENSE) 许可证开源，您可以自由使用、修改和分发。

---

感谢您使用本模板，希望它对您的开发工作有所帮助！如果您有任何问题或建议，欢迎随时与我们联系，我们将非常乐意帮助您解决问题并持续改进这个模板。祝您开发顺利，享受编码的乐趣！

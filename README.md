# Web Dev Box
web 开发工具箱。

功能：
- ES 版本检查（检查build打包后的 js 是否含有ES6、ES7等）
- js 词法分析(TODO)，分析后会得到 token 列表
- js 语法分析(TODO)，分析后得到 AST 抽象语法树

体验一下：[下载 Web Dev Box](https://github.com/En777/web-dev-box/releases)

本项目使用了 github actions 做了 CICD 自动打包部署，提交代码后，会自动打包出 exe 程序发布到 release 页面。

## ES 版本检查
检查 javascript 代码是否符合 ES5、ES6、ES7 等语法规范。

使用场景：

web前端开发场景下，一般我们会使用 babel 把 js 代码转换为 ES5，避免在老的浏览器上报错。有时候 webpack 等构建工具打包后，js代码上线了，偶尔还发现：ES6 新语法没有被转换。

很多项目都存在这样的问题，主要是因为我们经常会配置 babel 忽略 node_modules/ ，导致有些模块没有被 babel 转译。不信的话，你用此程序检查一下，也许就发现了打包后的代码竟然还有ES6+……

这个程序会帮助你检查代码是否含有ES6等新语法。防止ES6 ES7等代码在老的浏览器报错。

如果发现打包后还有 ES6，建议再修改构建配置，保证打包后的代码是 ES5 。

使用方法：

把文件或文件夹，导入到程序中，程序会开始检查代码，等检查完成，程序马上汇报检查结果。

本程序适用于手动检查代码是否含有新语法。

如果想在 build 打包时候，对打包后的 js 出现 ES6+ 主动报错、主动发现，建议使用 [`es-check`](https://www.npmjs.com/package/es-check)，这样更自动化。

## 技术细节

- acorn ，js代码的解析器(parser)
- fast-glob ，支持 `glob` 语法从磁盘获取全部想要的文件，还能灵活忽略其他文件
- electron ，跨平台的桌面端开发框架，可以使用 web 技术快速打包出 windows、mac、linux 客户端
- github actions ，自动化打包 exe 的服务，由 github 提供

本程序是使用 `electron-webpack-quick-start` 脚手架搭建起来的，以下有他的使用说明、文档。

## electron-webpack-quick-start
> A bare minimum project structure to get started developing with [`electron-webpack`](https://github.com/electron-userland/electron-webpack).

Thanks to the power of `electron-webpack` this template comes packed with...

* Use of [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) for development
* HMR for both `renderer` and `main` processes
* Use of [`babel-preset-env`](https://github.com/babel/babel-preset-env) that is automatically configured based on your `electron` version
* Use of [`electron-builder`](https://github.com/electron-userland/electron-builder) to package and build a distributable electron application

Make sure to check out [`electron-webpack`'s documentation](https://webpack.electron.build/) for more details.

### Development Scripts

```bash
# run application in development mode
npm run dev

# `yarn compile` & create build with electron-builder
npm run dist
```

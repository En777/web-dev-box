# Web Dev Box
web 开发工具箱。

功能：
- ES 版本检查（检查build打包后的资源是否含有ES6、ES7等）
- js 词法分析，分析后会得到 token 列表
- js 语法分析，分析后得到 AST 抽象语法树

## ES 版本检查
检查 javascript 代码是否符合 ES5、ES6、ES7 等语法规范。

使用场景：

web前端开发场景下，一般我们会使用 babel 把 js 代码转换为 ES5，避免在老的浏览器上报错。有时候 webpack 等构建工具打包后（因为配置有误），js代码上线了，偶尔还发现：ES6 新语法没有被转换。

这个程序会帮助你检查代码是否含有ES6等新语法。防止ES6 ES7等代码在老的浏览器报错。

使用方法：

把文件或文件夹，导入到程序中，程序会开始检查代码，等检查完成，程序马上汇报检查结果。

本程序适用于手动检查代码是否含有新语法。

如果想在打包时候，自动检查代码是否包含ES6等新语法，建议使用 [`es-check`](https://www.npmjs.com/package/es-check)。

本程序是使用 `electron-webpack-quick-start` 脚手架搭建起来的，以下有他的使用说明、文档。

## electron-webpack-quick-start
> A bare minimum project structure to get started developing with [`electron-webpack`](https://github.com/electron-userland/electron-webpack).

Thanks to the power of `electron-webpack` this template comes packed with...

* Use of [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) for development
* HMR for both `renderer` and `main` processes
* Use of [`babel-preset-env`](https://github.com/babel/babel-preset-env) that is automatically configured based on your `electron` version
* Use of [`electron-builder`](https://github.com/electron-userland/electron-builder) to package and build a distributable electron application

Make sure to check out [`electron-webpack`'s documentation](https://webpack.electron.build/) for more details.

### Getting Started
Simply clone down this repository, install dependencies, and get started on your application.

The use of the [yarn](https://yarnpkg.com/) package manager is **strongly** recommended, as opposed to using `npm`.

```bash
# create a directory of your choice, and copy template using curl
mkdir new-electron-webpack-project && cd new-electron-webpack-project
curl -fsSL https://github.com/electron-userland/electron-webpack-quick-start/archive/master.tar.gz | tar -xz --strip-components 1

# or copy template using git clone
git clone https://github.com/electron-userland/electron-webpack-quick-start.git
cd electron-webpack-quick-start
rm -rf .git

# install dependencies
yarn
```

### Development Scripts

```bash
# run application in development mode
yarn dev

# compile source code and create webpack output
yarn compile

# `yarn compile` & create build with electron-builder
yarn dist

# `yarn compile` & create unpacked build with electron-builder
yarn dist:dir
```

# baxia-plus

## 简介

*baxia-plus*是QuickEA项目前端工程，基于[qiankun](https://qiankun.umijs.org/zh)微前端框架，将不同业务功能封装在不同的子应用内。实现应用的独立开发、测试和部署。

## 资源和环境

### 环境

[143](http://192.168.21.143/)

`pmpm` + `monorepo` + `Vue3` + `Vite` + `Pinia` + `View UI Plus` + `qiankun`

[iview](https://www.iviewui.com/@uino/eam-design/guide/start) [jenkins](http://10.100.32.201:8080/view/QuickEA/) [lodash](https://lodash.com/docs/4.17.15) [设计图](https://codesign.qq.com/app/design/1JyMjoKNYrjLbAV/board?team_id=LOD8r0B8p4jRXkg) [git](https://git.uino.com/eam/baxia-web) [vueuse](https://vueuse.org/) [vue](https://vuejs.org/) [tapd](https://www.tapd.cn/company/participant_projects?jump_count=1)

## 运行项目

```bash
# 配置
1. 一键安装 .vscode 目录中推荐的插件
2. node版本 16+
3. npm版本 8.x+

# 安装pnpm
npm i -g pnpm

# 安装依赖
pnpm i

# 启动项目
pnpm run start

# 代码检查
pnpm run lint:eslint

# 格式化代码
pnpm run lint:prettier
```

## 打包

打包配置，使用vite进行打包 [vite](https://cn.vitejs.dev/guide/build.html)

```bash
# 命令
pnpm run build
```

## 代码格式检查

```bash
pnpm lint
```

## 创建子应用

通过 [http://localhost:7000/](http://localhost:7000/) 访问主应用。

### 按需启动

以上通过 `npm run start`运行全部的应用，目前应用较多，启动时间较长。我们也可以只启动需要的应用来快速进行开发。

```shell
# 启动主应用
cd main && npm run start
# 启动工作台
cd microApps/home && npm run start
# 这样我们就可以轻松的进行工作台的开发了
```

## 目录结构

```js
baxia-web
├─ assets           // README.md需要用到的图片资源
├─ main             // 主应用
├─ microApps        // 子应用
│  ├─ ....          // 子应用文件,参考 全部子应用列表
├─ packages         // 公共工程包
│  ├─ eam-compoents // 公共组件
│  ├─ eam-functions // 公共方法
│  ├─ eam-hooks     // 公共hooks
│  ├─ form-render   // form表单渲染器
│  ├─ http-hub      // 项目的http请求中心，是一个http请求集中管理工具，基于axios封装
├─ public-app       // 公共业务组件
├─ prompt           // 新建子应用控制器
├─ templates        // 子应用模板
├─ scripts          // 命令集合
├─ plopfile.js      // 新建子应用入口文件
├─ version.json     // 项目版本文件
```



## 命名说明

项目中有一些常用的名字，他们在`packag.json`中。以下我们一个一个介绍一下。

- `start:子应用名称`: 启动单个应用，例如：`npm run start:main`这是只启动主应用
- `build`: 打包全部应用，打包的应用会在项目根目录的`dist`文件下
- `build:子应用名称`: 打包单个应用，例如：`npm run build:main`这是只打包主应用。这种方式打包的文件会在打包应用的根目录下的`dist`文件，这里需要注意
- `publish`: 打包并部署全部应用，目前我们有更好的方式[jenkins](http://10.100.32.201:8080/view/QuickEA/)
- `new`: 创建子应用
- `clear`: 删除项目下全部`modules`、`package-lock.json`，`dist`
- `clear:lock`: 删除项目下全部`package-lock.json`
- `clear:modules`: 删除项目下全部`modules`
- `clear:dist`: 删除项目下全部`dist`
- `version`: 将`package.json`下版本号更新到`version.json`

## 创建一个新子应用

```shell
npm run new
```

通过提示，添加模块的名称和启动本地服务的端口号就可以创建一个子应用了。

### 全部子应用列表

| 服务名称                        | 端口 | 服务器路由              |
| ------------------------------- | ---- | ----------------------- |
| EAM(业务架构,数据架构,技术架构) | 7001 | /eam                    |
| 交付物                          | 7002 | /deliverable            |
| 首页                            | 7003 | /home                   |
| 系统设置                        | 7004 | /system-setting         |
| 架构设计                        | 7005 | /framework-design       |
| 架构资产                        | 7006 | /framework-assets       |
| 审批流程                        | 7007 | /approve-flow           |
| 应用广场                        | 7008 | /application-square     |
| 数据超市预览                    | 7009 | /data-store-view        |
| 全景墙                          | 7010 | /app-wall               |
| 配置功能模块                    | 7011 | /config-function-module |
| 架构视图模板                    | 7012 | /view-template          |
| 架构决策                        | 7013 | /architecture-decision  |
| 全局搜索                        | 7014 | /global-search          |
| 应用系统                        | 7015 | /application-system     |
| 画布                            | 7016 | /diagram                |
| 异常页面                        | 7017 | /common             |
| 架构资产                        | 7018 | /architecture-assets    |
| 元模型                          | 7019 | /visual-model           |
|流程架构 | 7021 | /flow|
  -----------------


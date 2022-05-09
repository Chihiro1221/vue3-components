# vue3-components

![maven](https://img.shields.io/badge/Vue-3.0.0-[].svg)
![maven](https://camo.githubusercontent.com/dcf3110e99c354b13ab7d252b5141df6f9c69710b4d1a6c5194089a5c7b82ff1/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7765627061636b2e737667)

## ‍💻 技术栈

- 开发框架：Vue.js（3）
- 开发语言：JavaScript
- 前端工程化：Webpack
- 语法拓展：Tsx、Scss、TypeScript
- 表单验证：Async-Validator
- 语法检测：ESLint、Stylelint、Prettier

## ✨ 项目介绍

该项目封装了一些组件，包含了一些常用的组件，例如：

- Form 表单
- FormItem 表单项
- Input 输入框
- Tabs 标签页
- TabsPane 标签项
- Tree 树形控件
- TreeNode 树节点

### 主要特性

#### Tab组件

- 双向数据绑定
- 监听切换事件
- 自定义tab标签标题（插槽）

### Form组件

- 表单验证
- 错误消息提示
- 原生提交事件

### Tree组件

- 采用一维数组扁平化渲染树形控件（嵌套结构不适合滚动优化）
- 展开/收起
- 懒加载
- 禁用节点
- checkbox 多选
- select 单选
- 父子关联
- 严格模式（父子不关联）
- 获取选择节点
- 获取所有选中节点
- 获取所有半选节点
- 自定义渲染节点
- 自定义icon图标

## 👷‍♂ ️基本使用

安装依赖：

```bash
git clone https://github.com/Chihiro1221/vue3-components.git

cd vue3-components

npm install
```

运行项目：

```bash
npm run serve
```

全局引入：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import vComponents from '@/components/index'

const app = createApp(App)
app.use(vComponents)
app.mount('#app')
```

按需引入：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import { Tree } from '@/components/index'

const app = createApp(App)
app.use(Tree)
app.mount('#app')
```

## 主要特性

- provide/inject（依赖注入）
- slots （插槽读取子组件`props`与`slots`）
- attrs （属性读取子组件`props`）
- expose（向外暴露属性）
- 表单验证（async-validator）
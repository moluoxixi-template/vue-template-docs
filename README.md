# vue-template

Vue 3 + TypeScript + Vite + TailwindCSS + qiankun + storybook + vitepress搭建的vue模板

vitepress | storybook 提供优雅的组件库文档

基于文件系统的布局,根据layout目录结构自动生成布局,默认使用element布局

基于文件系统的路由,根据views目录结构自动生成路由,目前仅支持两级菜单

基于env变量的插件配置,项目默认采用VITE_GLOB_APP_CODE作为 路由 + css前缀 + 项目启动前缀 用于适配qiankun

## 依赖下载

```sh
pnpm install
```

### 项目启动

```sh
pnpm dev
```

### 项目打包

```sh
pnpm build
```

## 开发前必读

### src/common 子模块自动更新

本项目在 src/common
目录下包含一个子模块，来源于 http://192.168.18.106/frontendgroup/his/common.git。为了确保每次推送代码前都使用最新的子模块代码，项目配置了自动更新机制：

1. 项目使用 Git 钩子 (pre-push) 在每次推送前自动更新 src/common 子模块
2. 如果子模块有更新，钩子会自动提交这些更改
3. 开发人员无需手动更新子模块，系统会自动处理

如需手动更新子模块，可以运行以下命令：

```bash
git submodule update --remote --merge -- src/common
```

### 开发样式规范

参考文档：http://192.168.211.58:9888/pages/viewpage.action?pageId=20185383
padding/margin: 所有间距都需是8的倍数

### 主题颜色变量

- 所有颜色变量都在[base.css](./src/assets/styles/base.css)
- element主题颜色定义在[index.scss](./src/assets/styles/element/index.scss)

### 打开控制台造成页面卡顿

请注释[vite.config.js](./vite.config.js)中的 `vueJsx()`和 `vueDevTools()`

### 命名规则以及注释方式

1. 函数名以小写字母开头，驼峰命名法，如：getPatientInfo
2. 组件或页面采用大驼峰方式命名，所有一级页面独立一个文件夹，如：床位一览： BedList/Index.vue
   页面所用的组件，如：BedList/components/PatientBar.vue，方便后期维护
3. 注释采用JSdoc语法

- 基本类型的注释方式

```javascript
/** @type {string} 字符串*/
let a = 'Hello World!'

/** @type {number} 数字*/
var b = 123

/** @type {boolean} 布尔值*/
const c = true
```

- 函数的注释方式

```javascript
/**
 * 函数用于加法操作。
 * @param {number} a - 第一个数字。
 * @param {number} b - 第二个数字。
 * @returns {number} - 返回两个数字的和。
 */
function add(a, b) {
  return a + b
}
```

- 类的注释方式

```javascript
/**
 * 表示一个人员。
 * @class
 * @classdesc 这个类用于表示人员信息。
 * @param {string} name - 姓名。
 * @param {number} age - 年龄。
 */
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}
```

- 命名空间的注释方式

```javascript
/**
 * @namespace
 * @description 这是一个示例命名空间。
 */
const myNamespace = {
  // ...
}
```

### 代码格式化规范

-

使用vscode安装插件[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
,同时要把VsCode配置：Prettier: Config Path的配置清空，这样会自动寻找项目根目录下的.prettierrc文件

- 使用webstorm请自行百度

使用prettier进行代码格式化，配置文件.prettierrc解释

```json
{
  "printWidth": 100, //每行最多显示的字符数
  "tabWidth": 2, //tab的宽度 2个字符
  "useTabs": false, //禁止使用tab代替空格
  "semi": true, //结尾使用分号
  "singleQuote": true, //使用单引号代替双引号
  "trailingComma": "none", //结尾是否添加逗号
  "bracketSpacing": true, //对象括号俩边是否用空格隔开
  "bracketSameLine": true, //组件最后的尖括号不另起一行
  "arrowParens": "always", //箭头函数参数始终添加括号
  "htmlWhitespaceSensitivity": "ignore", //html存在空格是不敏感的
  "vueIndentScriptAndStyle": false, //vue 的script和style的内容是否缩进
  "endOfLine": "auto", //行结尾形式 mac和linux是\n  windows是\r\n
  "singleAttributePerLine": false //组件或者标签的属性是否控制一行只显示一个属性
}
```

### 环境变量

目前仅配置了开发环境 `.env.development` 和生产环境，`.env.production` 文件。开发环境通过代理的方式跨域请勿修改
`VITE_APP_URL`字段

### 跨组件通信方式

跨组件通讯和全局状态管理请使用 `Pinia`,后续看项目需求是否使用 `pinia-plugin-persistedstate`插件做持久化储存策略

### Radash文档地址

[Radash](https://radash-docs.vercel.app/docs/getting-started)

### git提交规范

- feat：表示新增了一个新功能
- fix：修复了一个bug
- docs：修改了文档
- style：修改了代码格式，没有改变逻辑
- refactor： 重构了代码，没有新增功能或修复bug
- perf： 优化了性能
- chore：构建过程或辅助工具的变动

### 堡垒机更新静态页面

1. `npm run build`打包
2. 登录堡垒机
3. 连上堡垒机文件管理进入Home/收藏夹/麒麟\_HIS新产品2_IP_208_26/麒麟系统--root用户
4. 将打包完的dist文件直接整个拖拽至当前目录内
5. 打开堡垒机web终端
6. 执行

```bash
./resdent.sh
```

看到 `Script executed successfully.`代表成功

## 组件相关

### el-tab特殊样式

- 元素配类名

```html
<!-- 加class tabs-card -->
<el-tabs class="tabs-card" type="border-card">
  <el-tab-pane label="门诊病历文件夹"></el-tab-pane>
</el-tabs>
```

- 引入样式，哪里使用哪里引入

```scss

<style lang="scss" scoped>
@import "@/assets/styles/tab.scss";
</style>
```

- 解决套了特殊样式下的el-tab下包含的子组件内正常el-tab的问题,只需要加上类名 `tabs-normal`即可

```html
<el-tabs type="border-card" class="tabs-normal">
  <el-tab-pane label="User">User</el-tab-pane>
  <el-tab-pane label="Config">Config</el-tab-pane>
  <el-tab-pane label="Role">Role</el-tab-pane>
  <el-tab-pane label="Task">Task</el-tab-pane>
</el-tabs>
```

## Shrink组件使用

- 引用：import Shrink from '@/layout/components/Shrink.vue';
- 参数

```js
/**
 * 收缩组件封装 by:lafitewu 2024/7/2
 * @param {Number} direction - 收缩容器方向 1：位于容器左边  2：位于容器右边(默认值)
 * @param {Number} arrow - 箭头方向 1：left  2：right（默认值）
 * @param {String} top - button位置top是绝对定位位置 示例top="calc(50% - 40px)"/top="60px"。 默认650px
 */

  <Shrink :direction=1 :arrow="arrowVal" @click="shrinkClick"></Shrink>

```

- 案例可参考 @/views/BedList/components/AdmissionNote/CaseProcess.vue

## ShrinkPanel 收缩面板组件使用

已经实现双向绑定需要默认展开可以v-model一个值 设为true即可

- 引入组件

```js
import ShrinkPanel from '@/components/ShrinkPanel/Index.vue'
```

- 使用

```html
<ShrinkPanel width="532px">
  <div>xxxxx</div>
</ShrinkPanel>
```

- 参数

```js
// 展开方向 目前有ltr rtl 默认ltr
  direction: {
    type: String,
    default: 'ltr'
  },
// 展开内容宽度，必传 字符串格式可以时计算属性calc
  width: {
    type: String,
    default: '100%'
  },
// 用来实现上下展开的高度，默认100%
  height: {
    type: String,
    default: '100%'
  }
```

### 防抖和节流自定义指令

1. 节流

```html
<el-button color="#3A81FF" v-throttle:click="{handler: handleNew, args: 'test'}">添加</el-button>
```

2. 防抖

```html
<el-button color="#3A81FF" v-debounce:click="{handler: handleNew, args: 'test'}">添加</el-button>
```

### 参数解释

- `click` 触发事件类型，可以去阅读自定义指令源码，支持所有原生事件监听
- `handler` 触发事件回调 默认 `() => {}`
- `args` 触发事件回调参数 默认 `null`
- `delay` 延迟时间，默认 `1000ms`

### Steps步骤条组件使用

- 引用：import Steps from '@/layout/components/Steps.vue';
- 参数

```js
/**
 * 收缩组件封装 by:lafitewu 2024/7/8
 * @param {Array} stepsData - 步骤数据源 默认格式: ["选择模版","选择模版2"]
 * @param {Number} active - 当前选择步骤 默认1
 * @param {Number} stepType - 当前类型 默认1 =》简洁版本、2=》高级版本 （stepsData格式改变=>[{ indexs: 0, title: '手术申请', desc: '2024/05/27 09:21' }]）
 */

  <Steps :stepsData="stepsData" :active="active"></Steps>

```

```js
const active = ref(1)
const stepsData = ref(['选择模版', '编辑病历信息'])
```

- 案例可参考 @/views/BedList/components/AdmissionNote/RecordComponents/AddRecord.vue
- 高级版本案例可参考 @/views/ClinicalApproval/components/SurgicalApproval.vue

### CustomTabs自定义tabs组件使用

- 引用：import CustomTabs from '@/components/CustomTabs.vue';
- 参数

```js
/**
 * 收缩组件封装 by:lafitewu 2024/7/15
 * @param {Array} tabsData - 步骤数据源 默认格式: [{id: 1, name: "全部", total: 5},{id: 2, name: "未打印", total: 5}]   ps: 当没有数量时，可以不用传total字段
 * @param {Number} width -  默认130
 * @param {Number} height -  默认38
 * @param {Number} activeName -  双向绑定数据(与element双向绑定)
 */

<CustomTabs v-model="activeName" @change="printTabs"></CustomTabs>


```

```js
const printTabs = (e) => {
  console.log(e) //返回选择数据
}
```

- 案例可参考 @/views/BedList/components/AdmissionNote/RecordComponents/BatchPrinting.vue

### Title自定义title组件使用

- 引用：import Title from '@/components/Title/Index.vue';
- 参数

```js
/**
 * 收缩组件封装 by:lafitewu 2024/7/18
 * @param {String} name - 当前选中 默认空
 */

<Title name="诊断过程"></Title>
```

### PopoverTableSelect 组件

`PopoverTableSelect` 是一个基于 Element Plus 的 `el-popover` 和 `vxe-grid`
封装的弹出表格选择组件，支持虚拟触发（virtual-ref）、自定义表格列（columns）、数据源（data）等参数，支持键盘上下键快速切换行、回车选中、点击选中等交互。

- 支持通过 `virtual-ref` 绑定任意元素作为弹出触发点
- 支持自定义表格列（columns）和数据（data）
- 默认选中表格第一行
- 支持在 `virtual-ref` 元素上按上下键切换表格行并自动滚动
- 回车抛出当前选中行，点击表格行抛出点击行
- 组件已内置键盘上下键切换、回车选中、自动滚动等交互逻辑。
- columns 配置参考 vxe-grid 官方文档。

#### 使用方法

```vue
<PopoverTableSelect
  :virtual-ref="inputRef"
  :columns="columns"
  :data="tableData"
  @select="handleSelect"
  @row-click="handleRowClick"
/>
```

#### Props 参数

| 参数        | 说明                    | 类型            | 默认值 |
| ----------- | ----------------------- | --------------- | ------ |
| virtual-ref | 触发 Popover 的元素 ref | Ref/HTMLElement | 必填   |
| columns     | vxe-grid 列配置         | Array           | []     |
| data        | 表格数据                | Array           | []     |
| width       | 弹窗宽度                | String/Number   | 400    |
| height      | 表格高度                | String/Number   | 300    |

#### 事件

| 事件名    | 说明             | 回调参数          |
| --------- | ---------------- | ----------------- |
| select    | 回车选中行时触发 | row（当前行数据） |
| row-click | 点击行时触发     | row（当前行数据） |

#### 依赖

- element-plus
- vxe-table

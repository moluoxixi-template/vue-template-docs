# 更新日志

## 1.3.1 (2025-01-XX)

### ✨ 新功能
- 新增 `ConfigTable` 配置化表格组件
- 新增 `ConfigForm` 配置化表单组件  
- 新增 `DraggableTable` 可拖拽表格组件
- 新增 `DateRangePicker` 日期范围选择器组件
- 新增 `MarkdownEditor` Markdown编辑器组件
- 新增 `ApiDialog` API对话框组件
- 新增 `Calendar` 日历组件
- 新增 `EnterNextTable` 回车下一行表格组件
- 新增 `EnterNextDragTable` 可拖拽回车表格组件
- 新增 `EnterNextContainer` 回车容器组件
- 新增 `PopoverTableSelect` 弹窗表格选择器组件
- 新增 `KeepAllAlive` 全局缓存组件
- 新增 `Tabs` 标签页组件
- 新增 `Select` 选择器组件
- 新增 `Icon` 图标组件
- 新增 `Watermark` 水印组件
- 新增 `Splitter` 分割器组件
- 新增 `ConfigProvider` 配置提供者组件
- 新增 `ViteConfig` Vite配置工具
- 新增 `EslintConfig` ESLint配置工具
- 新增 `ExportExcel` Excel导出工具

### 🐛 Bug 修复
- 修复组件类型定义问题
- 修复按需引入时的样式问题

### 📝 文档
- 完善所有组件的API文档
- 新增快速开始指南
- 新增安装说明文档
- 优化示例代码

### 🏗️ 工程化
- 升级到 Vue 3.5.13
- 升级到 Element Plus 2.10.1
- 支持 TypeScript 5.8
- 优化打包配置
- 支持按需引入

---

## 版本规范

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范。

### 版本号格式

版本号格式为：`主版本号.次版本号.修订号`

- **主版本号**：当你做了不兼容的 API 修改
- **次版本号**：当你做了向下兼容的功能性新增  
- **修订号**：当你做了向下兼容的问题修正

### 更新类型说明

- 🚀 **重大更新** - 包含破坏性变更的主版本更新
- ✨ **新功能** - 新增功能或组件
- 🐛 **Bug 修复** - 修复已知问题
- 📝 **文档** - 文档相关更新
- 🎨 **样式** - 样式调整和UI改进
- ⚡ **性能** - 性能优化
- 🏗️ **工程化** - 构建流程、工具链相关
- 🔧 **配置** - 配置文件调整
- 🚨 **删除** - 移除废弃功能

## 迁移指南

### 从 1.x 升级到 2.x

当发布 2.x 版本时，这里会提供详细的迁移指南。

## 发布周期

- **主版本**：包含破坏性变更，不定期发布
- **次版本**：包含新功能，通常每月发布
- **修订版本**：包含bug修复，根据需要随时发布

## 获取最新版本

### NPM

```bash
# 查看最新版本
npm view @moluoxixi/components version

# 升级到最新版本
npm update @moluoxixi/components
```

### 版本预览

如果你想体验最新的功能，可以安装开发版本：

```bash
npm install @moluoxixi/components@beta
```

::: warning 注意
Beta 版本可能不稳定，不建议在生产环境中使用。
:::

## 问题反馈

如果你在使用过程中遇到问题，欢迎通过以下方式反馈：

- [GitHub Issues](https://github.com/componentProject/vue-component/issues)
- [讨论区](https://github.com/componentProject/vue-component/discussions)

感谢你对 Moluoxixi Vue组件库的支持！
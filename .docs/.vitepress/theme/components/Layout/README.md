# Layout 组件

这是一个基于 Element Plus 文档布局的简化版本，移除了国际化功能，仅保留布局相关的功能。

## 组件结构

```
Layout/
├── index.vue                # 主布局组件
├── components/              # 子组件目录
│   ├── VPOverlay.vue       # 覆盖层（移动端）
│   ├── VPSkipLink.vue      # 跳过链接（无障碍）
│   ├── VPNav.vue           # 导航栏组件
│   ├── VPNavbar.vue        # 导航栏内容
│   ├── VPNavFull.vue       # 全屏导航
│   ├── VPSubNav.vue        # 子导航（移动端侧边栏切换）
│   ├── VPSidebar.vue       # 侧边栏组件
│   ├── VPSidebarLink.vue   # 侧边栏链接
│   ├── VPContent.vue       # 内容区域组件
│   ├── VPDocContent.vue    # 文档内容
│   ├── VPHeroContent.vue   # 英雄内容（首页）
│   ├── VPNotFound.vue      # 404页面
│   └── VPFooter.vue        # 页脚组件
├── composables/            # 组合式函数
│   ├── sidebar.ts          # 侧边栏逻辑
│   ├── fullscreen.ts       # 全屏逻辑
│   └── toggle-widgets.ts   # 组件切换逻辑
├── constant.ts             # 常量定义
├── utils.ts               # 工具函数
└── README.md              # 说明文档
```

## 主要功能

1. **响应式布局**：支持桌面端和移动端
2. **侧边栏导航**：可折叠的侧边栏导航
3. **顶部导航**：包含logo和导航链接
4. **全屏导航**：移动端的全屏导航菜单
5. **内容区域**：支持多种内容类型（文档、首页、404等）
6. **无障碍支持**：跳过链接等无障碍功能

## 使用方法

在 `theme/index.ts` 中导入并使用：

```typescript
import LayoutApp from './components/Layout/index.vue'

export default {
  extends: DefaultTheme,
  Layout: LayoutApp,
  // ... 其他配置
}
```

## 配置要求

在 VitePress 配置中需要设置：

```typescript
export default {
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      // ...
    ],
    sidebars: {
      '/guide/': [
        {
          text: '指南',
          children: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            // ...
          ]
        }
      ]
    }
  }
}
```

## 样式变量

组件使用以下CSS变量：

- `--vp-layout-max-width`: 最大宽度
- `--vp-layout-top-height`: 顶部高度
- `--vp-sidebar-width`: 侧边栏宽度
- `--vp-c-brand`: 品牌色
- `--vp-c-text-1/2/3`: 文本颜色
- `--vp-c-bg`: 背景色
- `--vp-c-divider`: 分割线颜色

## 注意事项

1. 移除了国际化相关功能，所有文本都是中文
2. 简化了部分复杂功能，专注于布局
3. 保持了响应式设计和无障碍支持
4. 与 Element Plus 组件库兼容 
# Vue3 Multilang Country Selector - 文档导航

## 📚 文档列表

### 主要文档
- **[README.md](./README.md)** - 英文主文档，包含完整的API参考和使用示例
- **[README.zh-CN.md](./README.zh-CN.md)** - 中文主文档，包含完整的API参考和使用示例

### 专题文档
- **[INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md)** - 国际化功能详细说明（英文）
- **[INTERNATIONALIZATION.zh-CN.md](./INTERNATIONALIZATION.zh-CN.md)** - 国际化功能详细说明（中文）
- **[LICENSE](./LICENSE)** - MIT 开源许可证

## 🎮 演示页面

### 在线演示
启动开发服务器后，可以访问以下演示页面：

```bash
npm run dev
```

1. **主演示页面** - `http://localhost:5174/`
   - 完整功能演示
   - 包含语言选择器
   - 展示所有组件特性

2. **国际化演示页面** - `http://localhost:5174/i18n-demo.html`
   - 专门展示多语言功能
   - 并排显示不同语言版本
   - 实时语言切换演示

3. **中文演示页面** - `http://localhost:5174/demo-zh.html`
   - 中文界面演示
   - 中文说明和示例
   - 适合中文用户

## 🔧 开发文档

### 项目结构
```
vue3-multilang-country-selector/
├── src/
│   ├── components/
│   │   ├── CountrySelector.vue      # 主组件
│   │   └── __tests__/               # 组件测试
│   ├── data/
│   │   ├── countries.ts             # 国家数据
│   │   └── accurate-translations.ts # 翻译数据
│   ├── utils/
│   │   └── i18n.ts                  # 国际化工具
│   ├── types.ts                     # TypeScript类型定义
│   ├── index.ts                     # 主入口文件
│   ├── main.ts                      # 主演示应用
│   ├── i18n-demo.ts                 # 国际化演示应用
│   └── demo-zh.ts                   # 中文演示应用
├── index.html                       # 主演示页面
├── i18n-demo.html                   # 国际化演示页面
├── demo-zh.html                     # 中文演示页面
├── package.json                     # 项目配置
├── vite.config.ts                   # Vite配置
├── tsconfig.json                    # TypeScript配置
└── vitest.config.ts                 # 测试配置
```

### 开发命令
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建库文件
npm run build:lib

# 运行测试
npm run test

# 代码检查
npm run lint

# 代码格式化
npm run format

# TypeScript类型检查
npx tsc --noEmit
```

## 🌐 国际化支持

### 支持的语言
- `en` - English（英语）
- `zh-CN` - 简体中文
- `cht` - 繁體中文
- `fr` - Français（法语）
- `de` - Deutsch（德语）
- `it` - Italiano（意大利语）
- `ko` - 한국어（韩语）
- `ja` - 日本語（日语）
- `ro` - Română（罗马尼亚语）
- `es` - Español（西班牙语）
- `tk` - Türkçe（土耳其语）
- `pt` - Português（葡萄牙语）
- `el` - Ελληνικά（希腊语）
- `vi` - Tiếng Việt（越南语）
- `local` - 本地名称

### 国际化文件
- `src/utils/i18n.ts` - 国际化工具函数
- `src/data/accurate-translations.ts` - 国家名称翻译数据

## 🧪 测试

### 测试文件
- `src/components/__tests__/CountrySelector.test.ts` - 组件单元测试

### 测试覆盖
- 基本功能测试
- 属性和事件测试
- 国际化功能测试
- 用户交互测试

## 📦 构建和发布

### 构建配置
- **开发构建**：`npm run dev` - 用于开发和演示
- **库构建**：`npm run build:lib` - 用于NPM发布
- **类型生成**：自动生成TypeScript声明文件

### 发布准备
1. 更新版本号：`npm version patch/minor/major`
2. 构建库文件：`npm run build:lib`
3. 运行测试：`npm test`
4. 发布到NPM：`npm publish`

## 🤝 贡献指南

### 如何贡献
1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 运行测试
5. 提交 Pull Request

### 贡献类型
- 🐛 Bug修复
- ✨ 新功能
- 📝 文档改进
- 🌐 翻译贡献
- 🧪 测试改进

### 翻译贡献
特别欢迎母语使用者贡献翻译：
- 改进现有翻译质量
- 添加新语言支持
- 修正翻译错误

## 📞 支持和反馈

### 问题报告
- GitHub Issues：报告Bug和功能请求
- 讨论区：技术讨论和使用问题

### 联系方式
- 项目主页：GitHub Repository
- 文档网站：GitHub Pages
- NPM包：npm package page

## 📄 许可证

本项目采用 MIT 许可证，详见 [LICENSE](./LICENSE) 文件。

---

**快速开始**：
1. 查看 [README.md](./README.md) 了解基本用法
2. 访问 `http://localhost:5174/` 查看在线演示
3. 阅读 [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md) 了解国际化功能

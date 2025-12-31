# HKX Monorepo

Monorepo powered by pnpm + dumi + father. It hosts the HKX React component
library.

## Packages

| Package              | Description      |
| -------------------- | ---------------- |
| `@hkx-design`        | web 端 UI 组件库 |
| `@hkx-design-mobile` | h5 端 UI 组件库  |
| `@hkx-plugin`        | 工程化插件库     |
| `@hkx-hook`          | 业务 hook 库     |
| `@hkx-util`          | 工具函数库       |
| `@hkx-ai`            | 智能 ai 库       |

## Development

```bash
# install dependencies
$ pnpm install

# develop docs + packages together
$ pnpm dev

# build docs
$ pnpm run docs:build

# Locally preview the production build.
$ pnpm run docs:preview

# check your project for potential problems
$ pnpm run doctor

# build every package in the workspace
$ pnpm run build

# build only the component package
$ pnpm --filter @hkx/components build

# publish every package under ./packages (see Release section)
$ pnpm release
```

## Publish

### 添加账号

pnpm adduser --registry http://10.200.204.5:8081/repository/npm-hkx/

### 登录 npm 仓库：

pnpm login --registry http://10.200.204.5:8081/repository/npm-hkx/

### 提前构建（可选）：

pnpm --filter @hkx-plugins/file-upload run build

### 发布：

pnpm --filter @hkx-plugins/file-upload publish --registry=http://10.200.204.5:8081/repository/npm-hkx/ --no-git-checks

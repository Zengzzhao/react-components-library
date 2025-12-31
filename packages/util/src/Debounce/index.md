---
title: Debounce 防抖
order: 2
group:
  title: 通用
  order: 2
---

# Debounce 防抖

防抖函数，在事件被触发后延迟执行，如果在延迟期间再次触发则重新计时。适用于搜索输入、窗口 resize 等场景。

## 安装

```bash
pnpm add @hkx/util
```

## API

debounce(func: Function, wait: number): Function

| 参数 | 说明             | 类型     | 默认值 |
| ---- | ---------------- | -------- | ------ |
| func | 要防抖的函数     | Function | -      |
| wait | 延迟时间（毫秒） | number   | -      |

返回值: Function - 防抖处理后的函数

使用场景

- 搜索框输入联想
- 窗口 resize 事件
- 表单验证
- 按钮提交防重复点击

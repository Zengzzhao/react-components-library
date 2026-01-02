---
title: Throttle 节流
order: 3
group:
  title: 工具库
  order: 2
---

# Throttle 节流

节流函数，在指定时间间隔内只执行一次。适用于滚动事件、鼠标移动等高频触发场景。

## 安装

```bash
pnpm add @hkx/util
```

## API

throttle(func: Function, wait: number): Function

| 参数 | 说明             | 类型     | 默认值 |
|------|------------------|----------|--------|
| func | 要节流的函数     | Function | -      |
| wait | 间隔时间（毫秒） | number   | -      |

返回值: Function - 节流处理后的函数

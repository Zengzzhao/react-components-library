---
title: Date 日期
order: 1
group:
  title: 通用
  order: 2
---

# Date 日期

日期处理工具函数，提供日期格式化和日期计算功能。

## 安装

```bash
pnpm add @hkx/util
```

## API

### formatDate

格式化日期为本地化字符串。

formatDate(date: Date, locale?: string): string

| 参数   | 说明               | 类型   | 默认值  |
| ------ | ------------------ | ------ | ------- |
| date   | 要格式化的日期对象 | Date   | -       |
| locale | 本地化语言标识     | string | 'en-US' |

### addDays

在指定日期上增加或减少天数。

addDays(date: Date, days: number): Date

| 参数 | 说明                       | 类型   | 默认值 |
| ---- | -------------------------- | ------ | ------ |
| date | 基准日期                   | Date   | -      |
| days | 要增加的天数（负数为减少） | number | -      |

返回值: Date - 计算后的新日期对象

import { defineConfig } from 'dumi';
import { resolve } from 'path';

// 尝试获取当前根目录下的 antd 路径，之后通过别名使用antd时引入的都是这个路径的antd，确保版本一致
let antdPath = '';
try {
  antdPath = require.resolve('antd', { paths: [__dirname] });
} catch (e) {
  // antd not found, will rely on webpack's normal resolution
}

export default defineConfig({
  // 配置输出目录
  outputPath: 'dist',
  // 配置路由的解析目录（解析左侧二级菜单）
  resolve: {
    // 配置站点级文档，路径下的 Markdown 文档会根据目录结构解析为路由。
    docDirs: ['docs'],
    // 配置原子资产（例如组件、函数、工具等）级 Markdown 的解析目录。
    atomDirs: [
      // 映射 /designs 路由
      { type: 'design', dir: 'packages/design/docs' },
      { type: 'design', dir: 'packages/design/src' },
      // 映射 /design-mobiles 路由
      { type: 'design-mobile', dir: 'packages/designMobile/docs' },
      { type: 'design-mobile', dir: 'packages/designMobile/src' },
      // 映射 /plugins 路由
      { type: 'plugin', dir: 'packages/plugin/docs' },
      { type: 'plugin', dir: 'packages/plugin/src' },
      // 映射 /utils 路由
      { type: 'util', dir: 'packages/util/docs' },
      { type: 'util', dir: 'packages/util/src' },
      // 映射 /hooks 路由
      { type: 'hook', dir: 'packages/hook/docs' },
      { type: 'hook', dir: 'packages/hook/src' },
      // 映射 /ais 路由
      { type: 'ai', dir: 'packages/ai/docs' },
      { type: 'ai', dir: 'packages/ai/src' },
    ],
  },
  // 配置别名，方便在文档中引用本地的各个包
  alias: {
    '@hkx/plugin': resolve(__dirname, 'packages/plugin'),
    '@hkx/design': resolve(__dirname, 'packages/design'),
    '@hkx/design-mobile': resolve(__dirname, 'packages/designMobile'),
    '@hkx/util': resolve(__dirname, 'packages/util'),
    '@hkx/hook': resolve(__dirname, 'packages/hook'),
    '@hkx/ai': resolve(__dirname, 'packages/ai'),
    ...(antdPath ? { antd: antdPath } : {}),
  },
  // 配置webpack
  chainWebpack(config: any) {
    // Ensure modules can be resolved from root node_modules in pnpm workspace
    config.resolve.modules.prepend(resolve(__dirname, 'node_modules'));
  },
  // 配置主题
  themeConfig: {
    name: 'hkx-npm',
    // 配置头部一级菜单
    nav: [
      { title: '开发指南', link: '/development/quick-start' },
      { title: 'design', link: '/designs' },
      { title: 'design-mobile', link: '/design-mobiles' },
      { title: 'plugin', link: '/plugins' },
      { title: 'util', link: '/utils' },
      { title: 'hook', link: '/hooks' },
      { title: 'ai', link: '/ais' },
    ],
  },
});

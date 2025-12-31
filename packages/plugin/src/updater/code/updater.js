/**
 * 检查版本更新
 */
class Updater {
  /** 旧的script的hash值 */
  oldScript;
  /** 新的script的hash值 */
  newScript;
  /** 发布订阅：通知系统更新了 */
  dispatch;
  /** 轮询器 */
  loopId = null;
  /** 更新key */
  UPDATE_KEY = "update";
  /** 无更新key */
  NO_UPDATE_KEY = "no-update";

  constructor(options) {
    this.oldScript = new Set();
    this.newScript = new Set();
    this.dispatch = {};
    this.init(options?.isQianKun, options?.basePath);
    this.timing(options?.timer);
  }

  /**
   * 初始化
   * @param 
   */
  async init(isQianKun, basePath) {
    const html = await this.getHtml(basePath);
    this.oldScript = this.parserScript(isQianKun, html);
  }

  /**
   * 获取html
   */
  async getHtml(basePath) {
    const res = await fetch(basePath, { method: "GET", cache: "no-cache" });
    const html = await res.text();
    return html;
  }

  /**
   * 解析script
   */
  parserScript(isQianKun, html) {
    try {
      // qiankun编译模式：匹配script标签中的import('url')，提取资源URL
      if (isQianKun) {
        const IMPORT_REGEX = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
        const scriptList = [...html.matchAll(IMPORT_REGEX)].map((m) => m[1]);
        return new Set(scriptList);
      }
      // 普通编译模式：获取script标签列表
      else {
        const SCRIPT_REGEX = /<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/gi;
        const scriptList = html.match(SCRIPT_REGEX) || [];
        return new Set(scriptList);
      }
    } catch (e) {
      return new Set([]);
    }
  }

  /**
   * 轮询
   */
  timing(time = 10000) {
    this.loopId && clearTimeout(this.loopId);
    this.loopId = setTimeout(async () => {
      const newHtml = await this.getHtml();
      this.newScript = this.parserScript(newHtml);
      this.compare(this.oldScript, this.newScript);
      this.timing(time);
    }, time);
  }

  /**
   * 比较新旧版本
   */
  compare(oldList, newList) {
    const oldLength = oldList.size;
    const mergeList = Array.from(new Set([...oldList].concat([...newList])));

    //新旧版本一致，通知无更新
    if (mergeList.length === oldLength) {
      this.dispatch?.[this.NO_UPDATE_KEY]?.forEach((fn) => fn());
    }
    //新旧版本不一致，通知更新
    else {
      this.dispatch?.[this.UPDATE_KEY]?.forEach((fn) => fn());
    }
  }

  /**
   * 发布订阅通知
   */
  on(key, fn) {
    this.dispatch[key] ??= [];
    this.dispatch[key].push(fn);
    return this;
  }

  /**
   * 取消订阅
   */
  remove(key) {
    delete this.dispatch[key];
    this.loopId && clearTimeout(this.loopId);
  }

  /** 实例 */
  static instance;

  /**
   * 获取实例
   */
  static getInstance(options = {}) {
    if (!this.instance) {
      this.instance = new Updater(options);
    }
    return this.instance;
  }
}

export const createUpdateManager = (options) => Updater.getInstance(options);

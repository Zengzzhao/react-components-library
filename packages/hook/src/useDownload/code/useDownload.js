/*
 * @Author: xinqiao lxq1990.0716@qq.com
 * @Date: 2025-11-07 15:15:55
 * @LastEditors: xinqiao lxq1990.0716@qq.com
 * @LastEditTime: 2025-12-23 17:53:29
 * @FilePath: /supervision-admin-web/src/plugins/file/download/index.js
 * @Description: 文件下载工具函数
 */

import { useState, useCallback } from "react";
import { HttpCodeEnum } from "@/request/enum";
import { requestDownload } from "./request";

/**
 * 下载文件hook
 */
export const useDownload = () => {
  const [loading, setLoading] = useState(false);

  /**
   * 下载文件
   * @param fileId - 文件ID
   * @param fileName - 文件名
   */
  const downloadFile = useCallback(async ({ fileId, fileName }) => {
    setLoading(true);
    try {
      // 返回java文件流（Blob对象）
      const res = await requestDownload(fileId);
      // 创建下载链接，并点击
      const url = window.URL.createObjectURL(res);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || `file_${fileId}`;
      document.body.appendChild(link);
      link.click();
      // 清空
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setLoading(false);
      return { code: HttpCodeEnum.SUCCESS, data: res };
    } catch (err) {
      setLoading(false);
      return { code: HttpCodeEnum.ERROR, msg: err?.msg || "文件下载失败" };
    }
  }, []);

  return { downloadFile, loading, requestDownload };
}

export default useDownload;

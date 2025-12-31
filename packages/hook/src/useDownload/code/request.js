/*
 * @Author: xinqiao lxq1990.0716@qq.com
 * @Date: 2025-11-07 15:15:55
 * @LastEditors: xinqiao lxq1990.0716@qq.com
 * @LastEditTime: 2025-11-15 10:54:53
 * @FilePath: /supervision-admin-web/src/plugins/file/download/code/downloadRequest.js
 * @Description: 请求下载
 */

import * as request from "@/request";

/**
 * 请求下载
 * @param fileId - 文件ID
 */
export const requestDownload = (fileId) => {
  return request.download(`/admin-api/oss/file/get/attachment/${fileId}`);
};

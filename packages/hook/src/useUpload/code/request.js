/*
 * @Author: xinqiao lxq1990.0716@qq.com
 * @Date: 2025-11-07 15:15:55
 * @LastEditors: xinqiao lxq1990.0716@qq.com
 * @LastEditTime: 2025-11-20 16:26:00
 * @FilePath: /supervision-admin-web/src/plugins/file/upload/index.js
 * @Description: 文件上传工具函数
 */

/**
 * 文件上传工具函数
 * @param uploadPostFn - 上传请求函数
 * @param files - 要上传的文件数组
 */
export const requestUpload = (uploadPostFn, files) => {
  const formData = new FormData();
  const file = files[0];
  if (file instanceof File) {
    formData.append("file", file);
  } else {
    throw new Error("files参数必须是File对象、File数组或FormData对象");
  }
  return uploadPostFn("/admin-api/oss/file/upload", formData);
};

export default requestUpload;

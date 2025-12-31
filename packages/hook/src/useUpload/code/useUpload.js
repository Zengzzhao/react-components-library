/*
 * @Author: xinqiao lxq1990.0716@qq.com
 * @Date: 2025-11-07 15:15:55
 * @LastEditors: xinqiao lxq1990.0716@qq.com
 * @LastEditTime: 2025-12-23 17:53:11
 * @FilePath: /supervision-admin-web/src/plugins/file/upload/useFileUpload.js
 * @Description: 文件上传 Hook
 */

import { useState, useCallback, useRef } from "react";
import { requestUpload } from "./request";
import { HttpCodeEnum } from "./enum";

/**
 * 文件上传 Hook（基于antd Upload组件）
 * @param onSuccess - 上传成功回调
 * @param onError - 上传失败回调
 * @param onChange - 文件列表变化回调
 * @param maxSize - 最大文件大小（bytes）
 * @param suffixes - 允许的文件类型后缀
 * @param uploadPostFn - 上传请求函数（业务系统控制上传请求，验签、加密、token失效等逻辑由业务系统处理）
 */
const useUpload = ({
  onSuccess = () => {},
  onError = () => {},
  onChange = () => {},
  maxSize = 100 * 1024 * 1024,
  suffixes = [],
  uploadPostFn = () => {},
}) => {
  /** 上传成功ref（存储Upload组件的成功回调） */
  const uploadSuccessRef = useRef({});
  /** 上传失败ref（存储Upload组件的失败回调） */
  const uploadErrorRef = useRef({});
  /** 上传进度ref（存储Upload组件的进度回调） */
  const uploadProgressRef = useRef({});

  // 上传状态
  const [uploading, setUploading] = useState(false);
  // 上传进度
  const [progress, setProgress] = useState(0);
  // 已上传的文件列表
  const [fileList, setFileList] = useState([]);

  /**
   * 处理上传成功
   */
  const handleSuccess = useCallback(
    (data) => {
      setProgress(100);
      uploadSuccessRef?.current?.(data);
      onSuccess(data);
    },
    [onSuccess]
  );

  /**
   * 处理上传失败
   */
  const handleError = useCallback(
    (errorMsg) => {
      setProgress(0);
      uploadErrorRef?.current?.(new Error(errorMsg));
      onError(errorMsg);
    },
    [onError]
  );

  /**
   * 校验文件
   */
  const validateFile = useCallback(
    (file) => {
      // 校验文件大小
      if (maxSize && file.size > maxSize) {
        const maxSizeMB = (maxSize / 1024 / 1024).toFixed(2);
        const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
        handleError(`文件大小不能超过 ${maxSizeMB}MB，当前文件大小为 ${fileSizeMB}MB`);
        return false;
      }
      // 校验文件类型
      if (suffixes && suffixes.length > 0) {
        const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
        if (!suffixes.includes(extension)) {
          handleError(`不支持的文件类型，仅支持: ${suffixes.join(", ")}`);
          return false;
        }
      }
      return true;
    },
    [maxSize, suffixes, handleError]
  );

  /**
   * 存储Upload组件的回调函数
   */
  const saveCallback = useCallback((onSuccess, onError, onProgress) => {
    uploadSuccessRef.current = onSuccess;
    uploadErrorRef.current = onError;
    uploadProgressRef.current = onProgress;
  }, []);

  /**
   * 上传请求（用于Upload组件）
   * @param file - 文件
   * @param onSuccess - 上传成功回调
   * @param onError - 上传失败回调
   * @param onProgress - 上传进度回调
   */
  const customRequestUpload = useCallback(
    async ({ file, onSuccess, onError, onProgress }) => {
      // 存储Upload组件的回调函数
      saveCallback(onSuccess, onError, onProgress);

      // 校验文件
      const fileArray = Array.isArray(file) ? file : [file];
      for (const file of fileArray) {
        if (!validateFile(file)) return;
      }

      // 开始上传
      setUploading(true);
      setProgress(0);
      try {
        const { code, data } = await requestUpload(uploadPostFn, fileArray);
        if (code === HttpCodeEnum.SUCCESS) {
          handleSuccess(data);
        } else {
          handleError(data?.msg || "上传失败");
        }
      } catch (err) {
        handleError(err?.message || "上传失败，请重试");
      } finally {
        setUploading(false);
      }
    },
    [handleError, handleSuccess, saveCallback, validateFile]
  );

  /**
   * 监听文件列表变化
   * @param fileList - 新的文件列表
   */
  const onFileListChange = useCallback(
    // error | done | uploading | removed
    ({ fileList: newFileList }) => {
      const normalFileList = newFileList.filter(({ status }) => status === "uploading" || status === "done");
      setFileList(normalFileList);
      const doneFileList = newFileList.filter(({ status }) => status === "done");
      onChange(doneFileList);
    },
    [onChange]
  );

  return {
    uploading,
    progress,
    fileList,
    setFileList,
    customRequestUpload,
    onFileListChange,
    requestUpload,
  };
};

export default useUpload;

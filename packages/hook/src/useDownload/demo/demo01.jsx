/*
 * @Author: xinqiao lxq1990.0716@qq.com
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: xinqiao lxq1990.0716@qq.com
 * @LastEditTime: 2025-12-23 17:17:07
 * @FilePath: /supervision-admin-web/src/plugins/file/upload/demo/demo02.jsx
 * @Description: 文件下载demo
 */

import React from "react";
import { Modal, message, Button } from "antd";
import { HttpCodeEnum } from "@/constants/httpCodeEnum";
import { useFileDownload } from "../";
import { Divider } from "antd";

const DownloadDemo = ({ visible }) => {
  const [messageApi, messageHolder] = message.useMessage();

  /** 文件上传 hook */
  const { downloadFile } = useFileDownload();

  /**
   * 取消
   */
  const onCancel = () => {};

  /**
   * 确认
   */
  const onConfirm = async () => {};

  const fileImg = { id: "1989271022548942849", name: "房子.jpg" };
  const fileExcel = { id: "1989533092421382146", name: "前端框架工作量评估.xlsx" };

  /**
   * 下载文件
   */
  const download = async (fileObj) => {
    const { id, name } = fileObj;
    const { code, msg } = await downloadFile(id, name);
    if (code === HttpCodeEnum.SUCCESS) {
      messageApi.success("下载成功");
    } else {
      messageApi.error(msg);
    }
  };

  return (
    <>
      {messageHolder}
      <Modal className="hk-modal" title="文件下载" width={600} open={visible} onCancel={onCancel} onOk={onConfirm}>
        <div className="hk-modal-box">
          <Button type="primary" onClick={() => download(fileImg)}>
            {fileImg.name}
          </Button>
          <Divider type="vertical" />
          <Button type="primary" onClick={() => download(fileExcel)}>
            {fileExcel.name}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DownloadDemo;

---
title: useDownload 文件下载
order: 2
group:
  title: 组件
  order: 2
---

# useDownload 文件下载

基础请求工具，包含：验签、加密、get请求、post请求、upload请求、download请求等。

## Pre-Installation

在安装 `@hkx-plugins/request` 之前，请先确保项目中存在以下依赖：

```bash
pnpm add react
pnpm add antd
pnpm add @ant-design/icons
```

## Installation

```bash
pnpm add @hkx-plugins/request
```

## Usage

```js
import { Form, message, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useFileUpload } from "@hkx-plugins/file-upload";
import * as request from "@/request";

const UploadDemo = ({ visible, onCancel: parentCancel, onSuccess: parentSuccess }) => {
  const [messageApi, messageHolder] = message.useMessage();

  /** 表单 */
  const [form] = Form.useForm();

  /** 表单校验规则 */
  const rules = {
    attachment: [{ required: true, message: "请上传附件" }],
  };

  /** 文件上传 hook */
  const { fileList, setFileList, customRequestUpload, onFileListChange } = useFileUpload({
    suffixes: [".jpg", ".png"],
    uploadPostFn: request.upload,
    onSuccess: (result) => {
      console.log("onSuccess: ", result);
    },
    onError: (error) => {
      messageApi.error(error);
      console.log("onError: ", error);
    },
    onChange: (files) => {
      console.log("onChange: ", files);
      const attachment = files.map(({ response }) => response.fileId);
      // 业务逻辑处理：记录并存储fileId至Form表单中
      form.setFieldsValue({ attachment });
    },
  });

  return (
    <>
      {messageHolder}
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item label="附件" name="attachment" rules={rules.attachment}>
          <Upload
            maxCount={2}
            accept=".jpg,.png"
            fileList={fileList}
            customRequest={customRequestUpload}
            onChange={onFileListChange}
          >
            {fileList?.length < 2 && <Button icon={<UploadOutlined />}>选择文件</Button>}
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};
export default UploadDemo;
```

/**
  title: 版本更新
  description: web端版本更新
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { Modal } from "antd";
import { createUpdateManager } from "@hkx/plugin";

/** 更新频率（毫秒） */
const UPDATE_INTERVAL = 10 * 1000;

// 单例保存当前弹窗实例
let modalInstance = null;

/**
 * 获取编译路径前缀
 */
const getBasePath = () => {
  if (checkQiankun()) {
    return import.meta.env.VITE_APP_QIANKUN_DOMAIN + import.meta.env.VITE_APP_QIANKUN_BASE_ROUTE;
  }
  return import.meta.env?.VITE_APP_BASE_BUILD;
}

/**
 * 校验qiankun环境
 */
const checkQiankun = () => import.meta.env?.VITE_IS_QIANKUN === "true";

/**
 * 创建更新弹窗
 */
const createUpdateModal = ({ onConfirm = () => {}, onCancel = () => {} }) => {
  if (modalInstance) return;

  const div = document.createElement("div");
  const root = createRoot(div);
  modalInstance = root;

  /**
   * 卸载Modal
   */
  const destroyModal = () => {
    root.unmount();
    modalInstance = null;
    div.remove();
  };

  root.render(
    <Modal
      open
      width={450}
      title="版本更新"
      okText="更新"
      cancelText="取消"
      onOk={() => {
        onConfirm();
        destroyModal();
      }}
      onCancel={() => {
        onCancel();
        destroyModal();
      }}
      maskClosable={false}
    >
      <p>发现新版本，是否更新？</p>
    </Modal>
  );
};

/**
 * 启动版本更新检查（过滤掉本机开发环境）
 */
const startupUpdater = () => {
  if (import.meta.env?.MODE === "location") return;

  // 创建版本更新实例
  const updater = createUpdateManager({
    timer: UPDATE_INTERVAL,
    isQianKun: checkQiankun(),
    basePath: getBasePath()
  });
  // 有新版本通知
  updater.on("update", async () => {
    console.log("%c发现新版本，请刷新页面", "color: red;");
    createUpdateModal({
      onConfirm: () => location.reload(),
      onCancel: () => updater.remove("update"),
    });
  });
  // 无新版本通知
  updater.on("no-update", () => {
    // console.log("no-update");
  });

  return <div>无演示效果</div>
};

export default startupUpdater;

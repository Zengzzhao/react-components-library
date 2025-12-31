# 基于官方 nginx 镜像
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/nginx:1.24.0

# 将构建后的前端文件复制到 nginx 的默认静态资源目录
COPY ./dist /etc/nginx/html

# 暴露 80 端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]

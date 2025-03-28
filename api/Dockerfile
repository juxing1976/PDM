# 基础镜像选择（推荐 Alpine 或 Distroless）  
FROM node:18-alpine AS builder  
 
# 元数据标识（用于审计）  
LABEL maintainer="PDM Team <dev@pdm.com>" \  
      env="production"  
 
# 工作目录与依赖安装  
WORKDIR /app  
COPY package*.json ./  
RUN npm install --production --frozen-lockfile  
 
# 多阶段构建（减少最终镜像体积）  
FROM node:18-alpine  
COPY --from=builder /app/node_modules ./node_modules  
COPY . .  
 
# 安全配置（非 root 用户运行）  
RUN addgroup -S appgroup && adduser -S appuser -G appgroup  
USER appuser  
 
# 服务暴露与健康检查  
EXPOSE 3000  
HEALTHCHECK --interval=30s --timeout=5s \  
  CMD curl -f http://localhost:3000/health || exit 1  
 
# 启动命令（推荐使用 exec 形式）  
CMD ["npm", "start"]
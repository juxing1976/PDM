// frontend/src/components/BOMTreeInstruction.tsx 
 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 使用 useNavigate 替代 useHistory
 
import './BOMTreeInstruction.css';
 
const BOMTreeInstruction = () => {
  const navigate = useNavigate(); // 使用 useNavigate 钩子

   // 点击“开始操作”后直接跳转到 BOM 树操作界面
   const handleStartOperation = () => {
    console.log('开始操作按钮被点击，准备跳转到 /bomtreeoperation');
    navigate('/bomtreeoperation');
  };
 
  return (
    <div className="instruction-page">
      {/* 页面标题 */}
      <h2>欢迎使用 BOM 树操作功能</h2>
 
      {/* 操作步骤说明 */}
      <p>请按照以下步骤进行操作：</p>
      <ol>
        <li>选择根节点 ID。</li>
        <li>执行搜索、编辑、删除等操作。</li>
        <li>使用撤销/重做功能管理操作历史。</li>
      </ol>
 
      {/* 开始操作按钮 */}
      <button onClick={handleStartOperation} className="continue-button">
        开始操作
      </button>
    </div>
  );
};
 
export default BOMTreeInstruction;
// frontend/src/components/Homepage.tsx
import React from 'react'; //缺失会报错，不可删除！
import  { useState } from 'react';
import VersionSelector from './VersionSelector';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.css';

 
const Homepage = () => {
  
  return (
    <div className="home-page">
      {/* 页面标题 */}
      <h1 className="homepage-title">欢迎进入广州云智PDM系统</h1>
 
      {/* 提示信息 */}
      <p className="homepage-prompt">请选择您要执行的操作：</p>
 
      {/* 操作列表 */}
      <ul className="homepage-list">
        <li className="homepage-list-item">
          <Link to="/bom-editor" className="action-button">
            编辑 BOM
          </Link>
        </li>
        <li className="homepage-list-item">
          <Link to="/upload-bom" className="action-button">
            上传 BOM
          </Link>
        </li>
        <li className="homepage-list-item">
          <Link to="/BOMTreeInstruction" className="action-button">
            BOM 树操作
          </Link>
        </li>
      </ul>
 
      {/* BOM 历史版本选择器 */}
      <VersionSelector />
    </div>
  );
};
 
export default Homepage;


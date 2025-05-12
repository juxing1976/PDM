
// frontend/src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OperationPrompt from './components/OperationPrompt';
import BOMTreeOperation from './components/BOMTreeOperation';
import BOMTreeInstruction from './components/BOMTreeInstruction';
import BomEditor from './components/BomEditor';
import BomUpload from './components/BomUpload';
import './App.css';
import NavButton from './components/NavButton';
import Homepage from './components/HomePage';
import './global.css';

interface ErrorBoundaryProps {
  children: React.ReactNode; // 明确声明 props 包含 children 属性
}
 
interface ErrorBoundaryState {
  hasError: boolean;
}
 
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
 
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
 
  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, info);
  }
 
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
 
    return this.props.children;//访问 children 属性
  }
}
// export default ErrorBoundary;
 
const App: React.FC = () => {
  const [isPromptVisible, setIsPromptVisible] = useState(false);
 
  const handleConfirm = async () => {
    try {
      console.log('操作确认成功');
      setIsPromptVisible(false);
    } catch (error) {
      console.error('操作确认失败:', error);
    }
  };
 
  const handleCancel = () => {
    console.log('操作已取消');
    setIsPromptVisible(false);
  };
 
  const showPrompt = () => setIsPromptVisible(true);
  
 
  return (
    <Router>
      <ErrorBoundary>
        <div className="app-container">
            {/* 全局固定的 header */}

            {/* 全局导航栏 */}
        <header className="app-header">

        <div className="logo-container">
          <img src="./images/logo.png"  alt="广州云智" className="logo" />
        </div>
        </header>
          
          {/* 路由配置 */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/bom-editor" element={<BomEditor />} />
            <Route path="/upload-bom" element={<BomUpload />} />
            <Route path="/bomtreeinstruction" element={<BOMTreeInstruction />} />
            <Route path="/bomtreeoperation" element={<BOMTreeOperation />} />
          </Routes>
 
          {/* 操作提示框 */}
          <OperationPrompt
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            message="确定要执行此操作吗？"
            isPromptVisible={isPromptVisible}
          />
          <button className="common-button prompt-button" onClick={showPrompt}>
            点击按钮启动信息提示框
          </button>
   
          <NavButton to="/">Home Page</NavButton>
       
        </div>
      </ErrorBoundary>
    </Router>
  );
};
 
export default App;


// // frontend/src/App.tsx 
// import React, { Component, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
// import BomUpload from './components/BomUpload';
// import VersionSelector from './components/VersionSelector';
// import OperationPrompt from './components/OperationPrompt';
// import BomTree from './components/BOMTree';
// import BomEditor from './components/BomEditor';
 
// class ErrorBoundary extends Component<{ children: React.ReactNode }> {
//   state = { hasError: false };
 
//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }
 
//   componentDidCatch(error: Error, info: React.ErrorInfo) {
//     console.error('Error caught by boundary:', error, info);
//   }
 
//   render() {
//     if (this.state.hasError) {
//       return <h1>Something went wrong. Please try again later.</h1>;
//     }
 
//     return this.props.children;
//   }
// }
 
// const App: React.FC = () => {
//   const [isPromptVisible, setIsPromptVisible] = useState(false);
 
//   const handleConfirm = async () => {
//     try {
//       console.log('操作确认成功');
//       setIsPromptVisible(false);
//     } catch (error) {
//       console.error('操作确认失败:', error);
//     }
//   };
 
//   const handleCancel = () => {
//     console.log('操作已取消');
//     setIsPromptVisible(false);
//   };
 
//   const showPrompt = () => setIsPromptVisible(true);
 
//   return (
//     <ErrorBoundary>
//       <Router>
//         <div className="app-container">
//           <h1>PDM 系统</h1>
//           <div className="home-page">
//             <h2>欢迎使用 PDM 系统</h2>
//             <p>请选择您要执行的操作：</p>
//             <ul>
//               <li>
//                 {/* 使用 Link 替代 window.location.href */}
//                 <Link to="/bom-editor">编辑 BOM</Link>
//               </li>
//               <li>
//                 <Link to="/upload-bom">上传 BOM</Link>
//               </li>
//               <li>
//                 <VersionSelector />
//               </li>
//               <li>
//                 <Link to="/query-bom">查询 BOM 树</Link>
//               </li>
//             </ul>
//           </div>
 
//           {/* 路由配置 */}
//           <Routes>
//             {/* 默认路由 */}
//             <Route path="/" element={<Navigate to="/bom-editor" replace />} />
//             {/* 具体路由 */}
//             <Route path="/bom-editor" element={<BomEditor />} />
//             <Route path="/upload-bom" element={<BomUpload />} />
//             <Route path="/query-bom" element={<BomTree />} />
//           </Routes>
 
//           {/* 操作提示框 */}
//           <OperationPrompt 
//             onConfirm={handleConfirm}
//             onCancel={handleCancel}
//             message="确定要执行此操作吗？"
//             isPromptVisible={isPromptVisible}
//           />
//           <button onClick={showPrompt}>触发操作提示</button>
//         </div>
//       </Router>
//     </ErrorBoundary>
//   );
// };
 
// export default App;

// // frontend/src/App.tsx
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import VersionSelector from './components/VersionSelector';
// import OperationPrompt from './components/OperationPrompt';
// import BomTree from './components/BOMTree';
// import BomEditor from './components/BomEditor';
// import BomUpload from './components/BomUpload';
// import './App.css'; // 引入外部样式文件
 
// const App: React.FC = () => {
//   const [isPromptVisible, setIsPromptVisible] = useState(false);
 
//   const handleConfirm = async () => {
//     try {
//       console.log('操作确认成功');
//       setIsPromptVisible(false);
//     } catch (error) {
//       console.error('操作确认失败:', error);
//     }
//   };
 
//   const handleCancel = () => {
//     console.log('操作已取消');
//     setIsPromptVisible(false);
//   };
 
//   const showPrompt = () => setIsPromptVisible(true);
 
//   return (
//     <Router>
//       <div className="app-container">
//         {/* 欢迎信息 */}
//         <div className="home-page">
//           <h2 className="welcome-message">欢迎进入新幕科技 PDM 系统</h2>
//           <p className="operation-prompt">请选择您要执行的操作：</p>
 
//           {/* 操作列表 */}
//           <ul className="operation-list">
//             {/* 编辑 BOM */}
//             <li className="operation-item">
//               <Link to="/bom-editor" className="operation-link">
//                 编辑 BOM
//               </Link>
//             </li>
 
//             {/* 上传 BOM */}
//             <li className="operation-item">
//               <Link to="/upload-bom" className="operation-link">
//                 上传 BOM
//               </Link>
//             </li>
 
//             {/* 查询 BOM 树 */}
//             <li className="operation-item">
//               <Link to="/query-bom" className="operation-link">
//                 查询 BOM 树 
//               </Link>
//             </li>
//           </ul>
//           {/* BOM 历史版本选择器 */}
//           {/* <p className="operation-prompt">BOM历史版本选择器</p> */}
//           {/* <span>BOM 历史版本选择器</span> */}
//           <ul className="submenu">
//                 <li>
//                   <VersionSelector />
//                 </li>
//           </ul>
              
          
//         </div>
 
//         {/* 路由配置 */}
//         <Routes>
//           <Route path="/" element={<Navigate to="/home" replace />} />
//           <Route path="/home" element={<div>Home Page</div>} />
//           <Route path="/bom-editor" element={<BomEditor />} />
//           <Route path="/upload-bom" element={<BomUpload />} />
//           <Route path="/query-bom" element={<BomTree />} />
//         </Routes>
 

 
 
//         {/* 操作提示框 */}
//         <OperationPrompt
//           onConfirm={handleConfirm}
//           onCancel={handleCancel}
//           message="确定要执行此操作吗？"
//           isPromptVisible={isPromptVisible}
//         />
//         <button onClick={showPrompt}>触发操作提示</button>
//       </div>
//     </Router>
//   );
// };
 
// export default App;
// frontend/src/components/VersionSelector.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VersionSelector.css'; // 引入外部样式文件
 
interface VersionSelectorProps {
  onRollback?: (versionId: string) => Promise<void>; // 添加可选的 onRollback 属性
}
 
const VersionSelector: React.FC<VersionSelectorProps> = ({ onRollback }) => {
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [versions, setVersions] = useState<string[]>([]);
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);
  const [isPromptVisible, setIsPromptVisible] = useState<boolean>(false);
 
  // 从后端获取版本列表
  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await axios.get('/api/bom/versions');
        const versionList = response.data;
 
        if (versionList.length > 0) {
          setVersions(versionList); // 设置版本列表
          setCurrentVersion(versionList[versionList.length - 1]); // 设置最新版本为当前版本
        }
      } catch (error: any) {
        console.error('Failed to fetch versions:', error.response?.data || error.message);
        alert('Failed to load BOM versions. Please try again.');
      }
    };
 
    fetchVersions();
  }, []);
 
  // 处理回滚操作
  const handleRollback = async () => {
    if (!onRollback || !selectedVersion) return;
 
    try {
      setIsPromptVisible(true); // 显示提示框
 
      const userResponse = window.confirm(
        `Are you sure you want to rollback to version ${selectedVersion}?`
      );
 
      if (userResponse) {
        await onRollback(selectedVersion); // 执行回滚操作
        alert(`Successfully rolled back to version ${selectedVersion}.`);
      }
 
      setIsPromptVisible(false); // 关闭提示框
    } catch (error: any) {
      console.error('Failed to rollback:', error.response?.data || error.message);
      alert('Rollback failed. Please try again.');
    }
  };
 
  // 用户退出前提示
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (selectedVersion && currentVersion !== selectedVersion) {
      event.preventDefault();
      event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    }
  };
 
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
 
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [selectedVersion, currentVersion]);
 
  // 如果没有版本列表，则不显示版本选择器
  if (versions.length === 0) {
    return null;
  }
 
  return (
    <div className="version-selector">
      <p className="operation-prompt">BOM 历史版本选择器</p>
      
  <label htmlFor="version-select">选择版本:</label> {/* 添加 label 标签 */}
  {/* 设置 id 与 label 关联 */}
  <select 
    id="version-select"
    value={selectedVersion}
    onChange={(e) => setSelectedVersion(e.target.value)}
    disabled={versions.length === 0}
  >
    <option value="">请选择版本</option>
    {Array.isArray(versions) && versions.length > 0 ? (
      versions.map((version) => (
        <option key={version} value={version}>
          {version}
        </option>
      ))
    ) : (
      <option value="" disabled>
        加载中...
      </option>
    )}
  </select>
  <button onClick={handleRollback} disabled={!selectedVersion}>
    回滚到此版本
  </button>
 
      {/* 提示框 */}
      {isPromptVisible && (
        <div className="prompt-overlay">
          <div className="prompt-box">
            <p>Are you sure you want to rollback to this version?</p>
            <div>
              <button onClick={() => handleRollback()}>确认</button>
              <button onClick={() => setIsPromptVisible(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default VersionSelector;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
 
// interface VersionSelectorProps {
//     onRollback: (rootId: string) => void; // 回调函数类型定义
//   }
   
//   const VersionSelector: React.FC<VersionSelectorProps> = ({ onRollback }) => {
//     const [versions, setVersions] = useState<any[]>([]);
//     const [selectedVersion, setSelectedVersion] = useState<any | null>(null);
   
//     // 加载版本列表 
//     useEffect(() => {
//       const fetchVersions = async () => {
//         try {
//           const response = await axios.get('/api/bom/versions');
//           setVersions(response.data);
//         } catch (error: any) {
//           console.error('Failed to load versions:', error.response?.data || error.message);
//         }
//       };
   
//       fetchVersions();
//     }, []);
   
//     // 处理版本选择
//     const handleSelectVersion = (version: any) => {
//       setSelectedVersion(version);
//     };
   
//     // 确认回滚
//   const handleConfirmRollback = async () => {
//     if (!selectedVersion) return;
 
//     try {
//       await axios.post('/api/bom/rollback', { versionId: selectedVersion.id });
 
//       // 调用父组件传递的回调函数 
//       if (onRollback) {
//         onRollback(selectedVersion.rootId);
//       }
 
//       alert(`Successfully rolled back to version ${selectedVersion.versionNumber}`);
//     } catch (error: any) {
//       console.error('Failed to rollback:', error.response?.data || error.message);
//       alert('Rollback failed. Please try again.');
//     }
//   };
   
//     return (
//       <div>
//         <h3>Version Selector</h3>
//         <ul>
//           {versions.map((version) => (
//             <li key={version.id} onClick={() => handleSelectVersion(version)}>
//               Version {version.versionNumber} - Created at {version.createdAt}
//             </li>
//           ))}
//         </ul>
//         <button onClick={handleConfirmRollback} disabled={!selectedVersion}>
//           Rollback to Selected Version
//         </button>
//       </div>
//     );
//   };
   
//   export default VersionSelector;
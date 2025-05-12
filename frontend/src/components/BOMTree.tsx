
// 下面程序于2025/5/10弃用,App.tsx中开始引用BOMTreeOperation.tsx程序。
// frontend/src/components/BOMTree.tsx


// import { DragEvent, useEffect, useState } from 'react';
// import React from 'react';  //缺失会报错，不可删除！
// import axios from 'axios';
// import OperationPrompt from './OperationPrompt.js';
// import VersionSelector from './VersionSelector.js';
// import './BOMTree-style.css';
 
// // 子组件：树节点
// const TreeNode = ({
//   node,
//   onDragStart,
//   onDrop,
//   onEdit,
//   isDraggingOver,
// }: {
//   node: any;
//   onDragStart: (node: any) => void;
//   onDrop: (node: any) => void;
//   onEdit: (node: any) => void;
//   isDraggingOver: boolean;
// }) => (
//   <div 
//     key={node.id}
//     draggable
//     className={`tree-node ${isDraggingOver ? 'drag-over' : ''}`}
//     onDragStart={(e: DragEvent<HTMLDivElement>) => onDragStart(node)}
//     onDrop={(e: DragEvent<HTMLDivElement>) => onDrop(node)}
//     onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
//     onDragEnter={(e: DragEvent<HTMLDivElement>) => e.currentTarget.classList.add('drag-over')}
//     onDragLeave={(e: DragEvent<HTMLDivElement>) => e.currentTarget.classList.remove('drag-over')}
//   >
//     <span>{node.name}</span>
//     <button onClick={() => onEdit(node)}>Edit</button>
//   </div>
// );
 
// // 主组件：BOM 树
// const BOMTree = () => {
//   const [treeData, setTreeData] = useState<any[]>([]);
//   const [draggingNode, setDraggingNode] = useState<any | null>(null);
//   const [rootId, setRootId] = useState<string>('root');
//   const [history, setHistory] = useState<any[]>([]);
//   const [currentIndex, setCurrentIndex] = useState<number>(-1);
//   const [promptState, setPromptState] = useState<{ visible: boolean; message: string; onConfirm: () => Promise<void>; onCancel: () => void }>({
//     visible: false,
//     message: '',
//     onConfirm: async () => {},
//     onCancel: () => {},
//   });
 
//   // 初始化树结构
//   useEffect(() => {
//     loadTreeData(rootId);
//   }, [rootId]);
 
//   // 加载树结构
//   const loadTreeData = async (rootId: string) => {
//     try {
//       const response = await axios.get(`/api/bom/tree/${rootId}`);
//       setTreeData(response.data);
//       // 检查 API 返回的数据是否为数组
//       if (Array.isArray(response.data)) {
//         setTreeData(response.data);
//       } else {
//         console.error('Invalid data format from API:', response.data);
//         setTreeData([]); // 如果数据格式不正确，设置为空数组以避免错误
//       }
 
//       // 初始化历史记录
//       if (currentIndex === -1) {
//         recordOperation({ treeData: [...response.data] });
//       }
//     } catch (error: any) {
//       console.error('Failed to load tree data:', error.response?.data || error.message);
//       alert('Failed to load BOM tree. Please try again.');
//       setTreeData([]); // 设置为空数组以避免 .map() 错误
//     }
//   };
 
//   // 设置根节点 ID 
//   const handleSetRootId = () => {
//     const newRootId = prompt('Enter new root ID:');
//     if (newRootId) {
//       setRootId(newRootId);
//     }
//   };
 
//   // 记录操作
//   const recordOperation = (operation: any) => {
//     const newHistory = [...history.slice(0, currentIndex + 1), operation];
//     setHistory(newHistory);
//     setCurrentIndex(newHistory.length - 1);
//   };
 
//   // 撤销操作
//   const undo = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//       setTreeData(history[currentIndex].treeData);
//     }
//   };
 
//   // 重做操作
//   const redo = () => {
//     if (currentIndex < history.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//       setTreeData(history[currentIndex].treeData);
//     }
//   };
 
//   // 处理拖拽开始事件
//   const handleOnDragStart = (node: any) => {
//     setDraggingNode(node);
//   };
 
//   // 处理拖拽释放事件
//   const handleOnDrop = (target: any) => {
//     if (!draggingNode) return;
 
//     const sourceId = draggingNode.id;
//     const targetId = target.id;
 
//     showPrompt(
//       'Do you want to save the changes?',
//       async () => await syncDragAndDrop(sourceId, targetId),
//       () => console.log('Operation canceled')
//     );
//   };
 
//   // 同步拖拽操作到后端
//   const syncDragAndDrop = async (sourceId: string, targetId: string) => {
//     try {
//       await axios.post('/api/bom/drag/drop', { sourceId, targetId });
//       console.log('Drag and drop completed successfully');
 
//       // 更新历史记录
//       recordOperation({ sourceId, targetId, treeData: [...treeData] });
//     } catch (error: any) {
//       throw new Error(error.response?.data || error.message);
//     }
//   };
 
//   // 编辑节点名称
//   const handleEditNode = (node: any) => {
//     const updatedName = prompt('Enter new name:', node.name);
//     if (updatedName) {
//       const updatedTree = treeData.map((n) =>
//         n.id === node.id ? { ...n, name: updatedName } : n 
//       );
 
//       showPrompt(
//         'Do you want to save the changes?',
//         async () => await syncEditNode(updatedTree),
//         () => console.log('Operation canceled')
//       );
//     }
//   };
 
//   // 同步编辑操作到后端
//   const syncEditNode = async (updatedTree: any[]) => {
//     try {
//       await axios.post('/api/bom/edit/node', { treeData: updatedTree });
//       setTreeData(updatedTree);
 
//       // 更新历史记录 
//       recordOperation({ treeData: [...updatedTree] });
//     } catch (error: any) {
//       throw new Error(error.response?.data || error.message);
//     }
//   };
 
//   // 搜索功能
//   const handleSearch = async (keyword: string) => {
//     if (!keyword.trim()) {
//       alert('Please enter a valid keyword.');
//       return;
//     }
 
//     try {
//       const response = await axios.get('/api/bom/search', { params: { keyword } });
 
//       // 检查搜索结果是否为数组
//       if (Array.isArray(response.data)) {
//         setTreeData(response.data);
 
//         if (response.data.length === 0) {
//           alert('No results found for the given keyword.');
//         }
//       } else {
//         console.error('Invalid search result format:', response.data);
//         setTreeData([]); // 如果数据格式不正确，设置为空数组以避免错误
//       }
   
 
//       // 记录当前操作到历史记录 
//       recordOperation({ treeData: [...response.data], action: 'search', keyword });
//       } catch (error: any) {
//         console.error('Failed to search BOM tree:', error.response?.data || error.message);
//         alert('An error occurred while searching. Please try again.');
//         setTreeData([]); // 设置为空数组以避免 .map() 错误
//       }
//   };
 
//   // 显示提示框
//   const showPrompt = (message: string, onConfirm: () => Promise<void>, onCancel: () => void) => {
//     setPromptState({
//       visible: true,
//       message,
//       onConfirm,
//       onCancel,
//     });
//   };
 
//   // 关闭提示框 
//   const closePrompt = () => {
//     setPromptState({
//       visible: false,
//       message: '',
//       onConfirm: async () => {},
//       onCancel: () => {},
//     });
//   };
 
//   return (
//     <div>
//       {/* 动态设置根节点 ID */}
//       <button onClick={handleSetRootId}>Set New Root</button>
 
//       {/* 搜索功能 */}
//       <input type="text" placeholder="Search..." onChange={(e) => handleSearch(e.target.value)} />
 
//       {/* 版本选择 */}
//       <VersionSelector onRollback={loadTreeData} /> {/* 传递 loadTreeData 作为回调函数 */}
 
//       {/* 撤销/重做功能 */}
//       <div>
//         <button onClick={undo} disabled={currentIndex <= 0}>Undo</button>
//         <button onClick={redo} disabled={currentIndex >= history.length - 1}>Redo</button>
//       </div>
 
//       {/* 渲染树结构 */}
//       {treeData.length === 0 ? ( // 如果 treeData 为空，显示提示信息
//         <div>No data available.</div>
//       ) : (
//         treeData.map((node) => ( // 如果 treeData 不为空，渲染树节点
//           <TreeNode 
//             key={node.id}
//             node={node}
//             onDragStart={handleOnDragStart}
//             onDrop={handleOnDrop}
//             onEdit={handleEditNode}
//             isDraggingOver={false}
//           />
//         ))
//       )}


//       {/* 提示框 */}
//       <OperationPrompt 
//         message={promptState.message}
//         onConfirm={promptState.onConfirm}
//         onCancel={() => {
//           promptState.onCancel();
//           closePrompt();
//         }}
//         isPromptVisible={promptState.visible}
//       />
//     </div>
//   );
// };
 
// export default BOMTree;





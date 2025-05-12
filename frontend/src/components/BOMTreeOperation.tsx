// frontend/src/components/BOMTreeOperation.tsx
 
import React, { DragEvent, useEffect, useState } from 'react';
import axios from 'axios';
import OperationPrompt from './OperationPrompt.js';
import VersionSelector from './VersionSelector.js';
import HistoryViewer from './HistoryViewer.js'; // 新增组件
import './BOMTree-style.css';
 
// 子组件：树节点
const TreeNode = ({
  node,
  onDragStart,
  onDrop,
  onEdit,
  onDelete,
  onAddChild,
  onViewDetails,
  isDraggingOver,
  isExpanded,
  toggleExpand,
}: {
  node: any;
  onDragStart: (node: any) => void;
  onDrop: (node: any) => void;
  onEdit: (node: any) => void;
  onDelete: (node: any) => void;
  onAddChild: (node: any) => void;
  onViewDetails: (node: any) => void;
  isDraggingOver: boolean;
  isExpanded: boolean;
  toggleExpand: () => void;
}) => (
  <div 
    key={node?.id} // 确保即使 node.id 为 undefined 或 null 也不会报错
    draggable
    className={`tree-node ${isDraggingOver ? 'drag-over' : ''}`}
    onDragStart={(e: DragEvent<HTMLDivElement>) => onDragStart(node)}
    onDrop={(e: DragEvent<HTMLDivElement>) => onDrop(node)}
    onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
    onDragEnter={(e: DragEvent<HTMLDivElement>) => e.currentTarget.classList.add('drag-over')}
    onDragLeave={(e: DragEvent<HTMLDivElement>) => e.currentTarget.classList.remove('drag-over')}
  >
    <span onClick={toggleExpand}>
      {node?.children && node.children.length > 0 ? (isExpanded ? '-' : '+') : ''} {node?.name || 'Unnamed'} {/* 如果 node.name 为 undefined，则显示 "Unnamed" */}
    </span>
    <button onClick={() => onEdit(node)}>Edit</button>
    <button onClick={() => onDelete(node)}>Delete</button>
    <button onClick={() => onAddChild(node)}>Add Child</button>
    <button onClick={() => onViewDetails(node)}>Details</button>
    {isExpanded && node?.children?.map((child: any) => ( // 确保 node.children 不为 null 或 undefined
      <TreeNode
        key={child?.id}
        node={child}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddChild={onAddChild}
        onViewDetails={onViewDetails}
        isDraggingOver={false}
        isExpanded={false}
        toggleExpand={() => {}}
      />
    ))}
  </div>
);
 
// 主组件：BOM 树
const BOMTreeOperation = () => {
  const [treeData, setTreeData] = useState<any[]>([]);
  const [draggingNode, setDraggingNode] = useState<any | null>(null);
  const [rootId, setRootId] = useState<string>(''); // 初始为空字符串
  const [history, setHistory] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [promptProps, setPromptProps] = useState({
    onConfirm: async () => {},
    onCancel: () => {},
    message: '',
    isPromptVisible: false,
  });

  // 添加根节点选择功能
   const [isRootSelectionVisible, setIsRootSelectionVisible] = useState(true); // 是否显示根节点选择界面

  // 设置根节点 ID 
  const handleSetRootId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRootId(event.target.value);
  };
  // 确认根节点 ID 
  const handleConfirmRootId = () => {
    if (!rootId.trim()) {
      alert('请输入有效的根节点 ID！');
      return;
    }
    loadTreeData(rootId); // 加载树数据 
    setIsRootSelectionVisible(false); // 隐藏根节点选择界面
  };
 
  // 添加手动加载按钮 
  // const handleLoadTree = () => {
  //   loadTreeData(rootId);
  // };
  
 
  // 加载树结构 
  const loadTreeData = async (rootId: string) => {
    try {
      const response = await axios.get(`/api/bom/tree/${rootId}`);
      // 检查返回值是否为HTML 
      if (typeof response.data === 'string' && /<!DOCTYPE html>/i.test(response.data)) {
        console.error('Received HTML response instead of JSON:', response.data);
        alert('Failed to load BOM tree. Please check the API endpoint or your authentication.');
        setTreeData([]);
        return;
      }  
      
      // 检查返回值是否为数组，如果不是则设置为空数组
      if (!Array.isArray(response.data)) {
        console.error('Invalid data format from API:', response.data);
        setTreeData([]);
      } else {
        setTreeData(response.data);
      }
 
      if (currentIndex === -1) {
        recordOperation({ treeData: [...response.data || []], version: rootId }); // 确保即使 response.data 为 null 或 undefined 也不会报错
      }
    } catch (error: any) {
        if (error.response) {
            // 服务器返回了错误响应
            console.error('Server responded with error:', error.response.data);
            alert(`Server Error: ${error.response.data.message || 'Please try again later.'}`);
          } else if (error.request) {
            // 请求已发送但未收到响应
            console.error('No response received from server:', error.request);
            alert('Network Error: Please check your internet connection.');
          } else {
            // 其他错误
            console.error('Error occurred:', error.message);
            alert('An unexpected error occurred. Please try again.');
          }
          setTreeData([]); // 设置为空数组以避免后续操作出现问题
        }
  };
 
  
 
  // 搜索功能
  const handleSearch = async (keyword: string) => {
    if (!keyword.trim()) {
      alert('Please enter a valid keyword.');
      return;
    }
 
    try {
      const response = await axios.get('/api/bom/search', { params: { keyword } });
 
      // 检查返回值是否为数组，如果不是则设置为空数组
      if (!Array.isArray(response.data)) {
        console.error('Invalid search result format:', response.data);
        setTreeData([]);
      } else {
        setTreeData(response.data);
 
        if (response.data.length === 0) {
          alert('No results found for the given keyword.');
        }
      }
 
      recordOperation({
        treeData: [...treeData],
        action: 'search',
        keyword,
      });
    } catch (error: any) {
      console.error('Failed to search BOM tree:', error.response?.data || error.message);
      alert('An error occurred while searching. Please try again.');
      setTreeData([]);
      recordOperation({
        treeData: [],
        action: 'search',
        keyword,
        error: error.response?.data || error.message,
      });
    }
  };
 
  // 记录操作
  const recordOperation = (operation: any) => {
    const newHistory = [...history.slice(0, currentIndex + 1), operation];
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };
 
  // 撤销操作
  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTreeData(history[currentIndex]?.treeData || []); // 确保即使 history[currentIndex].treeData 为 null 或 undefined 也不会报错
    }
  };
 
  // 重做操作
  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTreeData(history[currentIndex]?.treeData || []); // 确保即使 history[currentIndex].treeData 为 null 或 undefined 也不会报错
    }
  };
 
  // 处理拖拽开始事件
  const handleOnDragStart = (node: any) => {
    setDraggingNode(node);
  };
 
  // 处理拖拽释放事件 
  const handleOnDrop = (target: any) => {
    if (!draggingNode) return;
 
    setPromptProps({
      onConfirm: async () => await syncDragAndDrop(draggingNode?.id, target?.id), // 确保即使 draggingNode.id 或 target.id 为 null 或 undefined 也不会报错
      onCancel: () => console.log('Operation canceled'),
      message: 'Do you want to save the changes?',
      isPromptVisible: true,
    });
  };
 
  // 同步拖拽操作到后端 
  const syncDragAndDrop = async (sourceId: string, targetId: string) => {
    try {
      await axios.post('/api/bom/drag/drop', { sourceId, targetId });
      const updatedTree = [...treeData]; // 假设更新后的树结构从后端返回
      setTreeData(updatedTree);
      recordOperation({ action: 'dragDrop', sourceId, targetId, treeData: updatedTree });
    } catch (error: any) {
      throw new Error(error.response?.data || error.message);
    }
  };
 
  // 编辑节点名称
  const handleEditNode = (node: any) => {
    const updatedName = prompt('Enter new name:', node?.name || ''); // 确保即使 node.name 为 null 或 undefined 也不会报错
    if (updatedName) {
      setPromptProps({
        onConfirm: async () => await syncEditNode(node?.id, updatedName), // 确保即使 node.id 为 null 或 undefined 也不会报错
        onCancel: () => console.log('Operation canceled'),
        message: 'Do you want to save the changes?',
        isPromptVisible: true,
      });
    }
  };
 
  // 同步编辑操作到后端
  const syncEditNode = async (nodeId: string, name: string) => {
    try {
      const updatedTree = treeData.map((n) => (n.id === nodeId ? { ...n, name } : n));
      await axios.post('/api/bom/edit/node', { treeData: updatedTree });
      setTreeData(updatedTree);
      recordOperation({ action: 'edit', nodeId, name, treeData: updatedTree });
    } catch (error: any) {
      throw new Error(error.response?.data || error.message);
    }
  };
 
  // 删除节点
  const handleDeleteNode = (node: any) => {
    setPromptProps({
      onConfirm: async () => await syncDeleteNode(node?.id), // 确保即使 node.id 为 null 或 undefined 也不会报错
      onCancel: () => console.log('Deletion canceled'),
      message: 'Are you sure you want to delete this node?',
      isPromptVisible: true,
    });
  };
 
  const syncDeleteNode = async (nodeId: string) => {
    try {
      const updatedTree = treeData.filter((node) => node.id !== nodeId);
      await axios.post('/api/bom/delete/node', { nodeId });
      setTreeData(updatedTree);
      recordOperation({ action: 'delete', nodeId, treeData: updatedTree });
    } catch (error: any) {
      throw new Error(error.response?.data || error.message);
    }
  };
 
  // 添加子节点
  const handleAddChild = (parent: any) => {
    const newNodeName = prompt('Enter new node name:');
    if (newNodeName) {
      setPromptProps({
        onConfirm: async () => await syncAddNode(parent?.id, newNodeName), // 确保即使 parent.id 为 null 或 undefined 也不会报错
        onCancel: () => console.log('Operation canceled'),
        message: 'Do you want to add this node?',
        isPromptVisible: true,
      });
    }
  };
 
  const syncAddNode = async (parentId: string, name: string) => {
    try {
      const newNode = { id: `new-${Date.now()}`, name, parentId };
      const updatedTree = [...treeData, newNode];
      await axios.post('/api/bom/add/node', { parentId, name });
      setTreeData(updatedTree);
      recordOperation({ action: 'add', parentId, name, treeData: updatedTree });
    } catch (error: any) {
      throw new Error(error.response?.data || error.message);
    }
  };
 
  // 查看节点详情 
  const handleViewDetails = (node: any) => {
    alert(`Node Details: ID=${node?.id || 'Unknown'}, Name=${node?.name || 'Unnamed'}`); // 确保即使 node.id 或 node.name 为 null 或 undefined 也不会报错
  };
 
  // 切换节点展开状态
  const toggleExpand = (nodeId: string) => {
    setExpandedNodes((prevExpanded) => {
      const newSet = new Set(prevExpanded);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };
 
  return (
    <div>
        {/* 根节点选择界面 */}
        {isRootSelectionVisible && (
        <div className="root-selection-container">
          <h3>请选择或输入树根节点 ID:</h3>
          <input
            type="text"
            placeholder="请输入根节点 ID"
            value={rootId}
            onChange={handleSetRootId}
            className="root-id-input"
          />
          <button onClick={handleConfirmRootId} className="confirm-root-button">
            确认
          </button>
        </div>
      )}
      {/* 如果已选择根节点，则显示树结构 */}
      {!isRootSelectionVisible && (
        <div>
          {/* 手动加载按钮 */}
          <button onClick={() => setIsRootSelectionVisible(true)}>重新选择根节点</button>
 
          {/* 搜索功能 */}
          <input type="text" placeholder="Search..." onChange={(e) => handleSearch(e.target.value)} />
 
          {/* 版本选择 */}
          <VersionSelector onRollback={loadTreeData} />
 
          {/* 撤销/重做功能 */}
          <div>
            <button onClick={undo} disabled={currentIndex <= 0}>
              Undo
            </button>
            <button onClick={redo} disabled={currentIndex >= history.length - 1}>
              Redo
            </button>
          </div>
 
          {/* 渲染树结构 */}
          {treeData.length === 0 ? (
            <div>No data available.</div>
          ) : (
            treeData.map((node) => (
              <TreeNode
                key={node?.id}
                node={node}
                onDragStart={handleOnDragStart}
                onDrop={handleOnDrop}
                onEdit={handleEditNode}
                onDelete={handleDeleteNode}
                onAddChild={handleAddChild}
                onViewDetails={handleViewDetails}
                isDraggingOver={false}
                isExpanded={expandedNodes.has(node?.id || '')}
                toggleExpand={() => toggleExpand(node?.id || '')}
              />
            ))
          )}
        </div>
      )}
 
      {/* 操作提示框 */}
      <OperationPrompt
        onConfirm={promptProps.onConfirm}
        onCancel={() => {
          promptProps.onCancel();
          setPromptProps((prev) => ({ ...prev, isPromptVisible: false }));
        }}
        message={promptProps.message}
        isPromptVisible={promptProps.isPromptVisible}
      />
 
      {/* 历史记录查看器 */}
      <HistoryViewer history={history} />
    </div>
  );
};
 
export default BOMTreeOperation;
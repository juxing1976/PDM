// frontend/src/components/BomEditor.tsx
import {useState } from 'react';
import axios from 'axios';
import React from 'react';
 
const BomEditor = () => {
  const [bomData, setBomData] = useState<any>({});
  const [isCreating, setIsCreating] = useState<boolean>(false);
 
  // 创建 BOM 
  const handleCreateBOM = async () => {
    setIsCreating(true);
    try {
      const response = await axios.post('/api/bom', bomData);
      alert('BOM created successfully!');
      console.log('BOM created:', response.data);
    } catch (error: any) {
      alert(`Failed to create BOM: ${error.response?.data || error.message}`);
    } finally {
      setIsCreating(false);
    }
  };
 
  // 更新 BOM 
  const handleUpdateBOM = async (id: string) => {
    try {
      const response = await axios.put(`/api/bom/${id}`, bomData);
      alert('BOM updated successfully!');
      console.log('BOM updated:', response.data);
    } catch (error: any) {
      alert(`Failed to update BOM: ${error.response?.data || error.message}`);
    }
  };
 
  // 删除 BOM
  const handleDeleteBOM = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this BOM?')) return;
 
    try {
      await axios.delete(`/api/bom/${id}`);
      alert('BOM deleted successfully!');
    } catch (error: any) {
      alert(`Failed to delete BOM: ${error.response?.data || error.message}`);
    }
  };
 
  return (
    <div>
      <h2>BOM 编辑器</h2>
      <input 
        type="text"
        placeholder="Enter BOM name"
        value={bomData.name || ''}
        onChange={(e) => setBomData({ ...bomData, name: e.target.value })}
      />
      <button onClick={handleCreateBOM} disabled={isCreating}>
        {isCreating ? 'Creating...' : '创建 BOM'}
      </button>
      <button onClick={() => handleUpdateBOM('1')}>更新 BOM</button>
      <button onClick={() => handleDeleteBOM('1')}>删除 BOM</button>
    </div>
  );
};
 
export default BomEditor;
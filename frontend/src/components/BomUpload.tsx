// components/BomUpload.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
 
const BomUpload: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
 
  // 处理文件选择
  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setMessage('文件已选择，点击上传按钮进行上传');
  };
 
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
  });
 
  // 处理文件上传
  const handleUpload = async () => {
    if (!file) {
      setMessage('请先选择一个文件');
      return;
    }
 
    setLoading(true); // 设置加载状态
 
    const formData = new FormData();
    formData.append('bomFile', file);
 
    try {
      const response = await axios.post('/api/bom', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message || '文件上传成功');
    } catch (error) {
      setMessage('上传失败，请稍后再试');
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false); // 清除加载状态
    }
  };
 
  return (
    <div className="upload-container">
      <h2>BOM Excel 文件上传</h2>
      <div {...getRootProps()} className={isDragActive ? 'dropzone active' : 'dropzone'}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>释放文件以上传...</p>
        ) : (
          <p>拖拽 Excel 文件到这里，或点击选择文件</p>
        )}
      </div>
      <button onClick={handleUpload} disabled={!file || loading} className="upload-button">
        {loading ? '正在上传...' : '上传'}
      </button>
      <p className="message">{message}</p>
    </div>
  );
};
 
export default BomUpload;
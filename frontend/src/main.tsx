// frontend/src/components/VersionSelector.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
 
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

 /** 
   * 下面是优化之前的程序。
   * ### 功能总结
 
该程序实现了一个简单的文件上传功能：
1. 用户可以通过文件选择器选择文件。
2. 点击“Upload”按钮后，文件通过 `fetch` API 上传到服务器。
3. 根据上传结果，显示成功或失败的消息。
 
---
 
### 问题分析与优化
 
1. **未使用的状态变量**：
   - `count` 和 `setCount` 被声明但从未使用。
   - **优化**：删除未使用的状态变量。
 
2. **最佳实践**：
   - 使用外部样式文件代替内联样式。
   - 添加加载状态以提升用户体验。
   
   */

// // 在 `App.tsx` 中添加文件上传功能：

// import React, { useState } from 'react';
 
// const FileUpload: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState<string>('');
 
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setFile(event.target.files[0]);
//     }
//   };
 
//   const handleUpload = async () => {
//     if (!file) return;
 
//     const formData = new FormData();
//     formData.append('file', file);
 
//     try {
//       const response = await fetch('http://localhost:3000/upload', {
//         method: 'POST',
//         body: formData,
//       });
 
//       if (response.ok) {
//         const result = await response.json();
//         setMessage(`File uploaded successfully: ${result.fileName}`);
//       } else {
//         setMessage('Failed to upload file');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setMessage('An error occurred while uploading the file');
//     }
//   };
 
//   return (
//     <div>
//       <h2>File Upload</h2>
//       <label htmlFor="file-upload">Choose a file to upload:</label>
//       <input 
//         id="file-upload" 
//         type="file" 
//         onChange={handleFileChange} 
//         aria-label="Select file for upload" 
//       />
//       <button onClick={handleUpload} title="Upload the selected file">Upload</button>
//       <p>{message}</p>
//     </div>
//   );
// };
 
// function App() {
//   const [count, setCount] = useState(0);
 
//   return (
//     <>
//       <div>
//         {/* 现有内容 */}
//       </div>
//       <FileUpload />
//     </>
//   );
// }
 
// export default App;
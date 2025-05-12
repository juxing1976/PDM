// frontend/src/components/OperationPrompt.tsx
import React from 'react' 


interface OperationPromptProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  isPromptVisible: boolean; // 必需属性
}
 
const OperationPrompt = ({ onConfirm, onCancel, message, isPromptVisible }: OperationPromptProps) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (error: any) {
      console.error('Failed to confirm operation:', error);
      alert('操作失败，请稍后再试。');
    }
  };
 
  // 如果 isPromptVisible 为 false，则不渲染提示框
  if (!isPromptVisible) return null;
 
  return (
    <div className="prompt-overlay">
      <div className="prompt-box">
        <p>{message}</p>
        <div>
          <button onClick={handleConfirm}>确认</button>
          <button onClick={onCancel}>取消</button>
        </div>
      </div>
    </div>
  );
};
 
export default OperationPrompt;

// frontend/src/components/OperationPrompt.tsx

// import { useState } from 'react';
// // import axios from 'axios';
// import './OperationPrompt-style.css';
 
// interface OperationPromptProps {
//   onConfirm: () => void;
//   onCancel: () => void;
//   message: string;
// }
 
// const OperationPrompt = ({ onConfirm, onCancel, message }: OperationPromptProps) => {
//   const [isPromptVisible, setIsPromptVisible] = useState(false);
 
//   const showPrompt = () => setIsPromptVisible(true);
//   const hidePrompt = () => setIsPromptVisible(false);
 
//   const handleConfirm = async () => {
//     try {
//       await onConfirm();
//       hidePrompt();
//     } catch (error: any) {
//       console.error('Failed to sync with backend:', error.response?.data || error.message);
//       alert('Failed to save changes. Please try again.');
//     }
//   };
 
//   return (
//     <>
//       {isPromptVisible && (
//         <div className="prompt-overlay">
//           <div className="prompt-box">
//             <p>{message}</p>
//             <div>
//               <button onClick={handleConfirm}>Yes</button>
//               <button onClick={onCancel}>No</button>
//             </div>
//           </div>
//         </div>
//       )}
//       <button onClick={showPrompt}>Trigger Prompt</button>
//     </>
//   );
// };
 
// export default OperationPrompt;
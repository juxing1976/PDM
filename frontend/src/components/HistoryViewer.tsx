// frontend/src/components/HistoryViewer.tsx

import React from 'react';
import './HistoryViewer-style.css'; // 导入样式文件
 
interface HistoryViewerProps {
  history: any[];
}
 
const HistoryViewer: React.FC<HistoryViewerProps> = ({ history }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
 
  // 过滤历史记录
  const filteredHistory = history.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  return (
    <div className="history-viewer">
      <h3>History Viewer</h3>
      <input
        type="text"
        placeholder="Search history..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="history-search-input" // 使用 CSS 类名
      />
      <ul className="history-list"> {/* 使用 CSS 类名 */}
        {filteredHistory.map((item, index) => (
          <li key={index} className="history-item"> {/* 使用 CSS 类名 */}
            {JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};
 
export default HistoryViewer;


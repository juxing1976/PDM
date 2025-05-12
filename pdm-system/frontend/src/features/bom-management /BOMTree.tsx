// frontend/src/features/bom-management/BOMTree.tsx 
import { Tree } from 'antd';
import { useAppSelector } from '@/lib/hooks';
 
const BOMTree = () => {
  const { data, status } = useAppSelector(state => state.bom);
  
  const buildTreeData = (nodes) => {
    return nodes?.map(node => ({ 
      title: <div className="bom-node">
        <span className="part-code">{node.code}</span>
        <span className="version">v{node.version}</span>
      </div>,
      key: node.id,
      children: buildTreeData(node.children)
    }));
  };
 
  return (
    <div className="bom-container">
      {status === 'loading' ? (
        <Spin spinning />
      ) : (
        <Tree 
          showLine 
          treeData={buildTreeData(data)}
        />
      )}
    </div>
  );
};
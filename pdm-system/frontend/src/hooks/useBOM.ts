// frontend/src/hooks/useBOM.ts 
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchBOM } from '../features/bom-management/slice'; 
import { RootState } from '../app/store'; // 假设这是 Redux 根状态类型 
 
const useBOM = (bomId: string) => { 
  const dispatch = useDispatch(); 
  const { data, status } = useSelector((state: RootState) => state.bom); 
 
  const loadBOM = () => { 
    dispatch(fetchBOM(bomId)); 
  }; 
 
  return { 
    data, 
    status, 
    loadBOM, 
  }; 
}; 
 
export default useBOM; 
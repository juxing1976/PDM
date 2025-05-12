// frontend/src/features/bom-management/slice.ts 
// 在 slice.ts 中引入 api.ts 
import {api} from '../../lib/api/api.ts';
import { AxiosError } from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
 
// BOM基础类型定义 
interface BOMItem {
  id: string;
  componentId: string;
  name: string;
  quantity: number;
  unit: string;
  level: number;
  parentId: string | null;
  revision: string;
  status: 'draft' | 'released' | 'obsolete';
}
 
interface BOMState {
  data: {
    id: string;
    projectId: string;
    items: BOMItem[];
    currentRevision: string;
    createdBy: string;
    createdAt: string;
  } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
 
// 异步获取BOM 
export const fetchBOM = createAsyncThunk('bom/fetch', async (bomId: string, { rejectWithValue }) => {
  try {
    const response = await api.get(`//Users/jx/Docs/PDM/projects/pdm_shared/pdm-system/frontend/src/lib/api/bom/${bomId}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
      return rejectWithValue(error.response?.data || { message: 'Unknown error occurred' });
  }
});
 
// 新增异步操作：更新BOM项
export const updateBOMItem = createAsyncThunk('bom/updateItem', 
  async (payload: { bomId: string; itemId: string; updates: Partial<BOMItem> }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/bom/${payload.bomId}/items/${payload.itemId}`, payload.updates);
      return response.data;
    } catch (err) {const error = err as AxiosError;
      return rejectWithValue(error.response?.data || { message: 'Unknown error occurred' });
    }
});
 
const initialState: BOMState = {
  data: null,
  status: 'idle',
  error: null 
};
 
const bomSlice = createSlice({
  name: 'bom',
  initialState,
  reducers: {
    // 同步操作：临时修改数量 
    tempUpdateQuantity: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
      if (state.data) {
        const item = state.data.items.find(i => i.id === action.payload.itemId);
        if (item) item.quantity = action.payload.quantity;
      }
    },
    // 重置BOM状态 
    resetBOM: () => initialState 
  },
  extraReducers: (builder) => {
    builder 
      .addCase(fetchBOM.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBOM.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchBOM.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateBOMItem.fulfilled, (state, action) => {
        if (state.data) {
          const index = state.data.items.findIndex(i => i.id === action.payload.id);
          if (index !== -1) {
            state.data.items[index] = { ...state.data.items[index], ...action.payload };
          }
        }
      });
  }
});
 
export const { tempUpdateQuantity, resetBOM } = bomSlice.actions;
export default bomSlice.reducer;
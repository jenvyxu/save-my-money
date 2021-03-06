import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import { httpGetTag, httpAddTag } from '../../http';
import { Tag, TagList } from '../types/tagTypes';
import { Category } from '../types/categoryTypes';

const initialState: TagList = [
  { id: 0, name: '房租', icon: 'fangzu', category: 'cost' },
  { id: 1, name: '水电', icon: 'shuidian', category: 'cost' },
  { id: 2, name: '居家', icon: 'shop', category: 'cost' },
  { id: 3, name: '交通', icon: 'train', category: 'cost' },
  { id: 4, name: '学习', icon: 'book', category: 'cost' },
  { id: 5, name: '日用', icon: 'riyong', category: 'cost' },
  { id: 6, name: '餐饮', icon: 'canyin', category: 'cost' },
  { id: 7, name: '购物', icon: 'shopping', category: 'cost' },
  { id: 8, name: '娱乐', icon: 'youxi', category: 'cost' },
  { id: 9, name: '旅游', icon: 'lvyou', category: 'cost' },
  { id: 10, name: '宠物', icon: 'chongwu', category: 'cost' },
  { id: 11, name: '工资', icon: 'gongji', category: 'income' },
  { id: 12, name: '报销', icon: 'baoxiao', category: 'income' },
  { id: 13, name: '补助', icon: 'buzhu', category: 'income' },
  { id: 14, name: '红包', icon: 'hongbao', category: 'income' },
  { id: 15, name: '分红', icon: 'fenhong', category: 'income' },
  { id: 16, name: '奖金', icon: 'jiangjin', category: 'income' },
  { id: 18, name: '借款', icon: 'jiekuan', category: 'income' },
]

function nextId(tagList: TagList) {
  let maxId = tagList.reduce((id, tag) => Math.max(tag.id, id), 0)
  return maxId + 1
}

export type TagArgs = {
  name: string,
  icon: string,
  category: Category
}

// 添加标签
export const asyncAddTag = createAsyncThunk<Tag, TagArgs, { state: RootState }>(
  'tag/asyncAddTag',
  async (obj, { getState, rejectWithValue }) => {
    const preTagList = getState().tagList
    const newTag = {...obj, id: nextId(preTagList)}
    try {
      await httpAddTag(newTag)
      return newTag
    }catch(err) {
      return rejectWithValue(err)
    }
  }
)

// 获取标签列表
export const fetchTagList = createAsyncThunk(
  'tag/fetchTagList',
  async () => {
    const { tagList } = await httpGetTag()
    return tagList
  }
)

const tag = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    addTag(state, action) {
      state.push({...action.payload, id: nextId(state)})
    },
    deleteTag(state, action) {
      state = state.filter(tag => tag.id !== action.payload)
    },
    getTagList(state, action) {
      state.concat(action.payload)
    }
  },
  extraReducers: builder => { 
    builder.addCase(fetchTagList.fulfilled, (state, action) => {
      state.push(...action.payload)
    })
    builder.addCase(asyncAddTag.fulfilled, (state, action) => {
      state.push(action.payload)
    })
    builder.addCase(asyncAddTag.rejected, (state, action) => {
      console.log(action.payload)
    })
  }
})

export const { addTag, deleteTag, getTagList } = tag.actions
export default tag.reducer
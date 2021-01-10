
import {ADD_TAG, DELETE_TAG, UPDATE_TAG} from '../actionTypes'

export type Tag = {
  id: number,
  name: string,
  icon: string,
  category: 'cost'|'income'
}

export type TagList = Array<Tag>

type Action = {
  type: typeof ADD_TAG|typeof DELETE_TAG|typeof UPDATE_TAG
  payload: Tag | number
}

const initialState: TagList = [
  { id: 1, name: '房租', icon: 'fangzu', category: 'cost' },
  { id: 2, name: '水电', icon: 'shuidian', category: 'cost' },
  { id: 3, name: '居家', icon: 'shop', category: 'cost' },
  { id: 4, name: '交通', icon: 'train', category: 'cost' },
  { id: 5, name: '学习', icon: 'book', category: 'cost' },
  { id: 6, name: '日用', icon: 'riyong', category: 'cost' },
  { id: 7, name: '餐饮', icon: 'canyin', category: 'cost' },
  { id: 8, name: '购物', icon: 'shopping', category: 'cost' },
  { id: 9, name: '娱乐', icon: 'youxi', category: 'cost' },
  { id: 10, name: '旅游', icon: 'lvyou', category: 'cost' },
  { id: 11, name: '宠物', icon: 'chongwu', category: 'cost' },
  { id: 12, name: '工资', icon: 'gongji', category: 'income' },
  { id: 13, name: '报销', icon: 'baoxiao', category: 'income' },
  { id: 14, name: '补助', icon: 'buzhu', category: 'income' },
  { id: 15, name: '红包', icon: 'hongbao', category: 'income' },
  { id: 16, name: '分红', icon: 'fenhong', category: 'income' },
  { id: 17, name: '奖金', icon: 'jiangjin', category: 'income' },
  { id: 18, name: '借款', icon: 'jiekuan', category: 'income' },
]

function nextId(tagList: TagList) {
  let maxId = tagList.reduce((id, tag) => Math.max(tag.id, id), 0)
  return maxId + 1
}

export default function(state: TagList = initialState, action: Action)  {
  switch(action.type) {
    case ADD_TAG: {
      return [...state, {...action.payload as Partial<Tag>, id: nextId(state)}]

    }
    case DELETE_TAG: {
      return state.filter(tag => tag.id !== action.payload)
    }
    default: 
      return state
  }
}
import styled from 'styled-components';
import React, {useState} from 'react';
import {connect} from 'react-redux';

const Wrapper = styled.ul`
  display: flex;
  font-size: 14px;
  background: #e8ecef;
  padding: 2px;
  border-radius: 4px;
    >li {
      padding: 3px 8px;
      border-radius: 4px;
      &.selected {
        background: #fff;
      }
    }
`
type Props = {
  value: 'income' | 'cost';
  onChange: (value: 'income' | 'cost') => void,
}

const CategorySection: React.FC<Props> = ({value, onChange}) => {
  const categoryMap = { 'income': '收入', 'cost': '支出'}
  type Keys = keyof typeof categoryMap
  const [categoryList] = useState<Keys[]>(['income', 'cost'])
  const category = value
  return (
    <Wrapper>
      {categoryList.map(c =>
        <li className={category === c ? 'selected' : ''}
            key={c}
            onClick={()=>{onChange(c)}}
        >{categoryMap[c]}</li>
      )}
    </Wrapper>
  )
}

export default connect(null)(CategorySection)
import { FC, useEffect, useState } from 'react'
import { Activity, TREE_IMG } from '../../types'
import './garden.css';

const Tree: FC = ({}) => {
  return (
    <div
      className='tree' 
      style={{ backgroundImage: TREE_IMG }}>
    </div>
  )
}

export default Tree

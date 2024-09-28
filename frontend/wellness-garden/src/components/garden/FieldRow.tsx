import { FC } from 'react'
import { Activity } from '../../types';
import Plot from './Plot';
import './garden.css';

interface FieldRowProps {
  activities: Activity[];
}

const FieldRow: FC<FieldRowProps> = ({activities}) => {
  return (
    <div className='fieldRow'>
      {activities.map((activity) => <Plot key={activity.name} activity={activity}></Plot>)}
    </div>      
  )
}

export default FieldRow

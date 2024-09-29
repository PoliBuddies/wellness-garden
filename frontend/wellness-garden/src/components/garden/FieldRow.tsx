import { FC } from 'react'
import { ActivityWithPlotImg } from '../../types';
import Plot from './Plot';
import './garden.css';

interface FieldRowProps {
  activities: ActivityWithPlotImg[];
}

const FieldRow: FC<FieldRowProps> = ({activities}) => {
  return (
    <div className='fieldRow'>
      {activities.map((activity, index) => 
          <Plot key={index} activity={activity}></Plot>
        )
      }
    </div>   
  )
}

export default FieldRow

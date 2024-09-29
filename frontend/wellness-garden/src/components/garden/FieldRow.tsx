import { FC } from 'react'
import { ActivityWithPlotImg } from '../../types';
import Plot from './Plot';
import './garden.css';

interface FieldRowProps {
  activities: ActivityWithPlotImg[];
  refetch: () => Promise<void>;
}

const FieldRow: FC<FieldRowProps> = ({activities, refetch}) => {
  const tiers = [3, 2, 0, 1, 1, 1, 1];

  return (
    <div className='fieldRow'>
      {activities.map((activity, index) => 
          <Plot key={index} activity={activity} flowerTier={tiers[index % tiers.length]} refetch={refetch}></Plot>
        )
      }
    </div>   
  )
}

export default FieldRow

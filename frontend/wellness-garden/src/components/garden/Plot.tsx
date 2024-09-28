import { FC } from 'react'
import './garden.css'
import { Activity } from '../../types'

interface PlotProps {
    activity: Activity;
}  

const Plot: FC<PlotProps> = ({activity}) => {
  return (
    <div className='plot'>
      {activity.name}
    </div>
  )
}

export default Plot

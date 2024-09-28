import { FC, useEffect, useState } from 'react'
import { Activity } from '../../types'
import FieldRow from './FieldRow';
import './garden.css';

interface FieldProps {
    activities: Activity[];
}

interface SplitedActivities {
  firstRow: Activity[];
  secondRow: Activity[];
}

const Field: FC<FieldProps> = ({activities}) => {
  const [splitedActivities, setSplitedActivities] = useState<SplitedActivities | null>(null)

  const splitActivitiesIntoFieldRows = (): SplitedActivities => {
    return  { 
      firstRow: activities.slice(0, activities.length/2),
      secondRow: activities.slice(activities.length/2, activities.length)
    };
  }

  useEffect(() => {
    setSplitedActivities(splitActivitiesIntoFieldRows())
  }, [activities])
    
  return (
    <>
    {splitedActivities && 
      <div className='field'>      
        <FieldRow activities={splitedActivities.firstRow}></FieldRow>
        <FieldRow activities={splitedActivities.secondRow}></FieldRow>
      </div>}
    </>
  )
}

export default Field

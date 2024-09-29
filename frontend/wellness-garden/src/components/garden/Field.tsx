import { FC, useEffect, useState } from 'react'
import { Activity, ActivityWithPlotImg, PlotTilesImg } from '../../types'
import FieldRow from './FieldRow';
import './garden.css';

interface FieldProps {
    activities: Activity[];
    refetch: () => Promise<void>;
}

interface SplitedActivities {
  firstRow: ActivityWithPlotImg[];
  secondRow: ActivityWithPlotImg[];
}

const Field: FC<FieldProps> = ({activities, refetch}) => {
  const [splitedActivities, setSplitedActivities] = useState<SplitedActivities | null>(null)

  const getPlotTileImg = (i: number, isTop: boolean): string => {
    if (i === 0) {
      return isTop ? PlotTilesImg.TOP_LEFT : PlotTilesImg.BOTTOM_LEFT;
    } else if (i === activities.length/2 -1) {
      return isTop ? PlotTilesImg.TOP_RIGHT : PlotTilesImg.BOTTOM_RIGHT;
    }
    return isTop ? PlotTilesImg.TOP_MID : PlotTilesImg.BOTTOM_MID; 
  }

  const splitActivitiesIntoFieldRows = (): SplitedActivities => {
    return  { 
      firstRow: activities.slice(0, activities.length/2)
        .map((x, index) => {
          return {...x, img: getPlotTileImg(index, true)}
        }),
      secondRow: activities.slice(activities.length/2, activities.length)
        .map((x, index) => {
          return {...x, img: getPlotTileImg(index, false)}
        })
    };
  }

  useEffect(() => {
    setSplitedActivities(splitActivitiesIntoFieldRows())
  }, [activities])
    
  return (
    <>
    {splitedActivities && 
      <div className='field'>      
        <FieldRow refetch={refetch} activities={splitedActivities.firstRow}></FieldRow>
        <FieldRow refetch={refetch} activities={splitedActivities.secondRow}></FieldRow>
      </div>}
    </>
  )
}

export default Field

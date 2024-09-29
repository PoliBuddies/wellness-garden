import { FC, useState } from 'react'
import './garden.css'
import { ActivityWithPlotImg } from '../../types'
import { Modal, Tooltip, Typography } from '@mui/material';
import ActivityEdit from './ActivityEdit';
import ActivityDetails from './ActivityDetails';
import Flower from './Flower';

interface PlotProps {
    activity: ActivityWithPlotImg;
    flowerTier: number;
    refetch: () => Promise<void>;
 }

const Plot: FC<PlotProps> = ({activity, flowerTier=1, refetch}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const hideModal = () => {
    setModalVisible(false);
  }

  return (
    <>
      <div onClick={() => setModalVisible(true)}>
        {activity.id ? (
          <Tooltip 
            placement='top'
            title={          
              <div className='activity-tooltip'>
                <Typography className="tooltip-name">ACTIVITY</Typography>
                <div>
                  <Typography className="tooltip-icon">{activity.icon ?? ''}</Typography>
                  <Typography className="tooltip-activity">{activity.name ?? ''}</Typography>
                </div>
                <div className="tooltip-stats">
                  <Typography className="tooltip-points">
                    <span className="tooltip-value">13</span>
                    <span className="tooltip-label">POINTS</span>
                  </Typography>
                  <Typography className="tooltip-level">
                    <span className="tooltip-value">2</span>
                    <span className="tooltip-label">LEVEL</span>
                  </Typography>
                </div>
              </div>
            }>
            <div
              className='plot' 
              style={{ backgroundImage: activity.img }}>
                {activity.id && <Flower id={activity.id} tier={flowerTier}/>}
            </div>
          </Tooltip>
        ) 
        : (
            <div
              className='plot' 
              style={{ backgroundImage: activity.img }}>
            </div>
          )
        }
      </div>
      {activity.id ? (      
        <Modal open={isModalVisible} onClose={hideModal}>
         <div><ActivityDetails activityId={activity.id}/></div>
        </Modal>
      ) : (
        <Modal open={isModalVisible} onClose={hideModal}>
          <div><ActivityEdit refetch={refetch} closeModal={hideModal}/></div>
        </Modal> 
        ) 
      }
    </>
  )
}

export default Plot

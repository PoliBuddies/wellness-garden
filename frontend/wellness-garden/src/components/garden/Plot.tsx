import { FC, useState } from 'react'
import './garden.css'
import { ActivityWithPlotImg } from '../../types'
import { Modal, Tooltip, Typography } from '@mui/material';
import React from 'react';
import ActivityEdit from './ActivityEdit';
import ActivityDetails from './ActivityDetails';

interface PlotProps {
    activity: ActivityWithPlotImg;
    refetch: () => Promise<void>;
 }

const Plot: FC<PlotProps> = ({activity, refetch}) => {
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
              <React.Fragment>
                <Typography color="inherit">{activity.name ?? ''}{activity.icon ?? ''}</Typography>
              </React.Fragment>
            }>
            <div
              className='plot' 
              style={{ backgroundImage: activity.img }}>
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

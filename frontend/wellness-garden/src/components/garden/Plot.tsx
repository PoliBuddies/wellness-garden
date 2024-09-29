import { FC, useState } from 'react'
import './garden.css'
import { ActivityWithPlotImg, resolveMood } from '../../types'
import { Box, Modal, Tooltip, Typography } from '@mui/material';
import React from 'react';
import ActivityEdit from './ActivityEdit';

interface PlotProps {
    activity: ActivityWithPlotImg;
}

const Plot: FC<PlotProps> = ({activity}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <>
      <div onClick={() => setModalVisible(true)}>
        {activity.mood ? ( //todo mood history
          <Tooltip 
            placement='top' 
            title={          
              <React.Fragment>
                <Typography color="inherit">{activity.name}</Typography>
                <Typography color="inherit">{activity.description}</Typography>
                <Typography color="inherit">{resolveMood(activity.mood[0])}</Typography>
                <Typography color="inherit">{activity.emote}</Typography>
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
      <Modal open={isModalVisible} onClose={() => setModalVisible(false)}>
        <ActivityEdit activity={activity}/>
      </Modal>
    </>
  )
}

export default Plot

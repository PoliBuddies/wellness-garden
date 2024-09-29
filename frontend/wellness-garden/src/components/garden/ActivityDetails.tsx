import { FC, useEffect, useState } from 'react'
import { BACKEND_URL, FullActivity, USER_ID } from '../../types';
import { Box, Typography } from '@mui/material';

interface ActivityDetailsProps {
    activityId: number;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ActivityDetails: FC<ActivityDetailsProps> = ({activityId}) => {
    const getEmptyActivity = (): FullActivity => {
        return {
          name: '',
          icon: '',
          description: '',
          mood: [],
        }
      }

    async function fetchActivity(id: number): Promise<void> {
      try{
        const res = await window.fetch(BACKEND_URL + '/activities/' + USER_ID + '/' + id, {method: 'GET'});
        const data = await res.json();
        setActivity(data as FullActivity) 
      } catch {
        setActivity(getEmptyActivity());
      }
    } 

    useEffect(() => {
        if(activityId) {
          fetchActivity(activityId);
        }
      }, [activityId])

      const [activity, setActivity] = useState<FullActivity>(getEmptyActivity())
    
//todo activity display
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">Activity details</Typography>
      <Typography id="modal-modal-title" variant="h6" component="h2">Name: {activity.name}</Typography>
      <Typography id="modal-modal-title" variant="h6" component="h2">Emote: {activity.icon}</Typography>
      <Typography id="modal-modal-title" variant="h6" component="h2">Description: {activity.description}</Typography>
    </Box>
  )
}

export default ActivityDetails

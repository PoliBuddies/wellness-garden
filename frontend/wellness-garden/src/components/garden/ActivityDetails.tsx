import { FC, useEffect, useState } from 'react'
import { BACKEND_URL, FullActivity, USER_ID } from '../../types';
import { Box, Button, Typography } from '@mui/material';

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

    const handleSubmit = async () => {
      const URL = "http://127.0.0.1:5000//activities/1/" + activityId + "/moods/"
      try {
        fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mood })
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }

    useEffect(() => {
        if(activityId) {
          fetchActivity(activityId);
        }
      }, [activityId])

      const [activity, setActivity] = useState<FullActivity>(getEmptyActivity())
      const [mood, setMood] = useState<number>();
    
      const handleMoodChange = (event: any) => {
        setMood(event.target.value);
      };

//todo activity display
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">Activity details</Typography>
      <Typography id="modal-modal-title" variant="h6" component="h2">Name: {activity.name}</Typography>
      <Typography id="modal-modal-title" variant="h6" component="h2">Emote: {activity.icon}</Typography>
      <Typography id="modal-modal-title" variant="h6" component="h2">Description: {activity.description}</Typography>
      <form id="mood_form">
        <label>Your mood score:
        <select name="mood" id="mood" form="mood_form" value={mood} onChange={handleMoodChange}>
          <option value="1">😢</option>
          <option value="2">😕</option>
          <option value="3">😐</option>
          <option value="4">😊</option>
          <option value="5">😁</option>
        </select>
        </label>
      </form>
      <Button onClick={handleSubmit}>Register activity</Button>
    </Box>
  )
}

export default ActivityDetails

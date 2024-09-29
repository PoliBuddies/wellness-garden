import { FC, useEffect, useState } from 'react'
import { BACKEND_URL, FullActivity, USER_ID } from '../../types';
import { Box, Button, styled, Typography } from '@mui/material';
import './garden.css';

interface ActivityDetailsProps {
    activityId: number;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '25px',
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
      const [mood, setMood] = useState<number>(1);
    
      const handleMoodChange = (event: any) => {
        setMood(event.target.value);
      };

  const FormButton = styled(Button)({
    height: "50px",
    border: "2px solid #888",
    width: "50%",
    margin: "0 auto",
  }) as typeof Button;

  return (
    <Box sx={style} id="modal-garden-box">
      <div className='formWrapper'>
        <div id="modal-header">
          <Typography id="modal-title" variant="h4" component="h2">{activity.name}</Typography>
          <Typography id="modal-emote" variant="h5" component="h2">{activity.icon}</Typography>
        </div>
        <Typography id="modal-desc" variant="h5" component="h2">
          <span className='modal-label'>Description</span>
          {activity.description}
        </Typography>
        <div id="modal-activities">
          <div className='modal-label'>Last activities</div>
          <div className='last-activities'>
            <div className='last-activities-entry'>
              <div className="activ-entry-date">24.09.2024</div>
              <div className="activ-entry-emote">😁</div>
            </div>
            <div className='last-activities-entry'>
              <div className="activ-entry-date">26.09.2024</div>
              <div className="activ-entry-emote">😁</div>
            </div>
            <div className='last-activities-entry'>
              <div className="activ-entry-date">29.09.2024</div>
              <div className="activ-entry-emote">😀</div>
            </div>
          </div>
        </div>
        <div id="mood_form_divider"></div>
        <form id="mood_form">
          <label>Your mood score:
            <select name="mood" id="mood" form="mood_form" value={mood} onChange={handleMoodChange}>
              <option value="1">😢</option>
              <option value="2">😕</option>
              <option value="3">😐</option>
              <option value="4">😊</option>
              <option value="5" selected>😁</option>
            </select>
          </label>
        </form>
        <FormButton onClick={handleSubmit}>Register activity</FormButton>
      </div>
    </Box>
  )
}

export default ActivityDetails

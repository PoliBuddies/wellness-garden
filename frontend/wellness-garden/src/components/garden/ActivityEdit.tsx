import React, { useState } from 'react'
import { BACKEND_URL, CreateActivityRequest, USER_ID } from '../../types';
import { Box, Button, TextField, Typography } from '@mui/material';

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

const ActivityEdit = () => {

  const getEmptyActivity = (): CreateActivityRequest => {
    return {
      title: '',
      emote: '',
      description: '',
    }
  }

  const [formActivity, setFormActivity] = useState<CreateActivityRequest>(getEmptyActivity())

  const handleChangeFormActivityName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormActivity({...formActivity, title: e.target.value})
  }

  const handleChangeFormActivityEmote = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormActivity({...formActivity, emote: e.target.value})
  }

  const handleChangeFormActivityDescription = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormActivity({...formActivity, description: e.target.value})
  }
  
  async function submitForm(): Promise<void> {
    const res = await window.fetch(BACKEND_URL + '/activities/' + USER_ID, {method: 'POST', body: JSON.stringify(formActivity)});
    const { data } = await res.json();
    //todo close modal
  } 

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">Add new activity</Typography>
      <TextField
        required
        id="outlined-required"
        label="Activity name"
        value={formActivity.title}
        onChange={(e) => handleChangeFormActivityName(e)}
      />
      <TextField
        required
        id="outlined-required"
        label="Emote"
        value={formActivity.emote}
        onChange={(e) => handleChangeFormActivityEmote(e)}
      />
      <TextField
        required
        id="outlined-required"
        label="Description"
        value={formActivity.emote}
        onChange={(e) => handleChangeFormActivityDescription(e)}
      />
      <Button onClick={() => submitForm()}>Submit form</Button>
    </Box>
  )
}

export default ActivityEdit

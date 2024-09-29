import React, { FC, useState } from 'react'
import { BACKEND_URL, CreateActivityRequest, USER_ID } from '../../types';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import './garden.css';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: "rgba(255,255,255,1)",
    border: '2px solid rgba(255,255,255,0.7)',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
};

const SubmitButton = styled(Button)({
	height: "48px",
	marginBottom: '16px',
	backgroundColor: "rgba(255,255,255,0.2)",
	borderColor: "rgba(255,255,255,0.7)",
	textShadow: "0px 0px 8px rgba(0,0,0,0.4)",
	boxShadow: "0px 0px 14px rgba(0,0,0,0.15) inset",
	":hover": {
		backgroundColor: "rgba(128,128,128,0.05)",
		borderColor: "rgba(255,255,255,1)",
		color: "rgba(255,0255,255,1)",
		textShadow: "0px 0px 8px rgba(0,0,0,0.4)",
		boxShadow: "0px 0px 14px rgba(0,0,0,0.15) inset",
	}
}) as typeof Button;

interface ActivityEditProps {
  closeModal: () => void;
  refetch: () => Promise<void>; 
}

const ActivityEdit: FC<ActivityEditProps> = ({closeModal, refetch}) => {

  const getEmptyActivity = (): CreateActivityRequest => {
    return {
      title: '',
      icon: '',
      description: '',
    }
  }

  const [formActivity, setFormActivity] = useState<CreateActivityRequest>(getEmptyActivity())

  const handleChangeFormActivityName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormActivity({...formActivity, title: e.target.value})
  }

  const handleChangeFormActivityEmote = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormActivity({...formActivity, icon: e.target.value})
  }

  const handleChangeFormActivityDescription = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormActivity({...formActivity, description: e.target.value})
  }
  
  async function submitForm(): Promise<void> {
    const res = await window.fetch(BACKEND_URL + '/activities/' + USER_ID + '/', {
        method: 'POST',
        body: JSON.stringify(formActivity),
        headers: new Headers({'content-type': 'application/json'}),
        }
      );
    const { data } = await res.json();
    closeModal();
    refetch();
  } 

  return (
    <Box sx={style}>
      <div className='formWrapper'>
        <Typography id="modal-modal-title" variant="h6" component="h2">Add new activity</Typography>
        <TextField
          className='formInput'
          required
          id="outlined-required"
          label="Activity name"
          value={formActivity.title}
          onChange={(e) => handleChangeFormActivityName(e)}
        />
        <TextField
          className='formInput'
          required
          id="outlined-required"
          label="Emote"
          value={formActivity.icon}
          onChange={(e) => handleChangeFormActivityEmote(e)}
        />
        <TextField
          className='formInput'
          required
          id="outlined-required"
          label="Description"
          value={formActivity.description}
          onChange={(e) => handleChangeFormActivityDescription(e)}
        />
        <SubmitButton onClick={() => submitForm()}>Submit form</SubmitButton>
      </div>     
    </Box>
  )
}

export default ActivityEdit

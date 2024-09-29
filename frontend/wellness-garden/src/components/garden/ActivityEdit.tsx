import React, { FC, useState } from 'react'
import { Activity } from '../../types';
import { Box, TextField, Typography } from '@mui/material';

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

interface ActivityEditProps {
    activity: Activity;
}

const ActivityEdit: FC<ActivityEditProps> = ({activity}) => {
  const [isEditing] = useState<boolean>(!!activity.name) 
  const [formActivity, setFormActivity] = useState<Activity>(activity.name ? activity : {name: ''})

  const handleChangeFormActivityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormActivity({...formActivity, name: e.target.value})
  }
  

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
          {isEditing ? 'Edit activity' : 'Add new activity'}
      </Typography>
      <TextField
        required
        id="outlined-required"
        label="Activity name"
        value={formActivity.name}
        onChange={(e) => handleChangeFormActivityChange(e)}
      />
    </Box>
  )
}

export default ActivityEdit

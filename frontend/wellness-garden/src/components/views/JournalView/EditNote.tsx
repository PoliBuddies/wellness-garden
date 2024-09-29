import { FC, useState } from "react";
import { BACKEND_URL, USER_ID } from "../../../types";
import { Box, Button, styled, TextField, Typography } from "@mui/material";

interface EditNoteProps {
    note: string;
    date: Date;
    refetch: (year: number, month: number) => Promise<void>;
    closeModal: () => void;
}

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

const EditNote: FC<EditNoteProps> = ({note, date, refetch, closeModal}) => {
    const [noteContent, setNoteContent] = useState<string>(note ? note : '');

    const handleChangeNote = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setNoteContent(e.target.value)
      }

    async function submitForm(): Promise<void> {
    const res = await window.fetch(BACKEND_URL + '/journals/' + USER_ID + '/entries/', {
        method: 'POST',
        body: JSON.stringify({title: 'title', content: noteContent, date: date}),
        headers: new Headers({'content-type': 'application/json'}),
        }
        );
        const { data } = await res.json();
        refetch(date.getFullYear(), date.getMonth());
        closeModal();
      } 

  return (
    <Box sx={style}>
    <div className='formWrapper'>
      <Typography id="modal-modal-title" variant="h6" component="h2">{note ? 'Edit note' : 'Add note'}</Typography>
      <TextField
        className='formInput'
        required
        id="outlined-required"
        label="Activity name"
        value={noteContent}
        onChange={(e) => handleChangeNote(e)}
      />
      <SubmitButton onClick={() => submitForm()}>Add not</SubmitButton>
    </div>     
  </Box>
  )
}

export default EditNote

import { FC, useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditNote from "./EditNote";
import './JournalView.css';

interface NoteProps {
    note: string;
    date: Date;
    day: number;
    refetch: (year: number, month: number) => Promise<void>;
}

const Note: FC<NoteProps> = ({note, refetch, date, day}) => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const hideModal = (): void => {
        setModalVisible(false)
    }

  return (
    <div>
        <div className="note">
                <h3><i>Today's notes:</i></h3>
                <div onClick={() => {setModalVisible(true)}} className="icon">
                    <FontAwesomeIcon icon={note ? faEdit : faCirclePlus} size="1x"/>
            </div>
        <div>{note}</div>
        </div>
        <Modal open={isModalVisible} onClose={hideModal}>
            <div><EditNote date={date} chosenDay={day} closeModal={hideModal} note={note} refetch={refetch}/></div>
        </Modal> 
    </div>
  )
}

export default Note

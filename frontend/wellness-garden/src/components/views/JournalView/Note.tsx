import { FC, useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditNote from "./EditNote";

interface NoteProps {
    note: string;
    date: Date;
    refetch: (year: number, month: number) => Promise<void>;
}

const Note: FC<NoteProps> = ({note, refetch, date}) => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const hideModal = (): void => {
        setModalVisible(false)
    }

  return (
    <div>
        <div>
            {note}
            <div onClick={() => {setModalVisible(true)}} className="icon">
                <FontAwesomeIcon icon={note ? faEdit : faCirclePlus} size="2x"/>
            </div>
        </div>
        <Modal open={isModalVisible} onClose={hideModal}>
            <div><EditNote date={date} closeModal={hideModal} note={note} refetch={refetch}/></div>
        </Modal> 
    </div>
  )
}

export default Note

import { FC } from 'react'
import { Link } from 'react-router-dom'
import './common.css';
import { Button, styled } from '@mui/material';

interface SideNavButtonsProps {
	buttons: {
		to: string;
		content: string;
	}[];
}

const SideNavButton = styled(Button)({
	height: "64px",
	fontSize: "1.6rem",
	fontWeight: "600",
	marginBottom: '30px',
}) as typeof Button;


const SideNavButtons: FC<SideNavButtonsProps> = ({buttons}) => {
  return (
    <div className='sideNavButtons'>
      {buttons.length > 0 && buttons.map((button, index) => 
        <SideNavButton
					key={index}
          variant="contained" 
					color="primary" 
					content={Link}
					to={button.to}>
					{button.content || ""}
        </SideNavButton>
				)
      }
    </div>
  )
}

export default SideNavButtons

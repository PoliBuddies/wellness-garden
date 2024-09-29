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
	marginRight: '30px',
	backgroundColor: "rgba(255,255,255,0.4)",
	borderColor: "rgba(255,255,255,0.7)",
	color: "rgba(255,0255,255,1)",
	textShadow: "0px 0px 10px rgba(0,0,0,0.6)",
	boxShadow: "0px 0px 14px rgba(0,0,0,0.25) inset",
	":hover": {
		backgroundColor: "rgba(192,192,192,0.3)",
		borderColor: "rgba(255,255,255,1)",
		color: "rgba(255,0255,255,1)",
		textShadow: "0px 0px 10px rgba(0,0,0,0.6)",
		boxShadow: "0px 0px 14px rgba(0,0,0,0.25) inset",
	}
}) as typeof Button;


const SideNavButtons: FC<SideNavButtonsProps> = ({buttons}) => {
  return (
    <div className='sideNavButtons'>
      {buttons.length > 0 && buttons.map((button, index) => 
        <SideNavButton
			key={index}
			variant="outlined" 
			color="primary" 
			component={Link}
			to={button.to}>
			{button.content || ""}
        </SideNavButton>
		)
      }
    </div>
  )
}

export default SideNavButtons

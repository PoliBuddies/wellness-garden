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
	backgroundColor: "rgba(255,255,255,0.2)",
	borderColor: "rgba(255,255,255,0.7)",
	color: "rgba(255,0255,255,1)",
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

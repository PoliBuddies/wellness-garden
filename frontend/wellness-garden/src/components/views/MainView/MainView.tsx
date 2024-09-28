import { styled } from '@mui/material';
import './MainView.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { GardenButton } from '../../common/GardenButton';

const SplitButton = styled(Button)({
  width: "160px",
  height: "60px",
  fontSize: "1rem",
  lineHeight: "1.4rem",
  fontWeight: "600",
  borderWidth: "2px",
}) as typeof Button;

const MainView = () => {
  return (
    <div className="view main-view">
      <div className="main-view-bg">
        <img className="bg-clouds" src="/mainbg_clouds.png" alt="Wellness Garden clouds" />
        <img className="bg-ground" src="/mainbg_ground1.png" alt="Wellness Garden ground" />
      </div>
      <div className="main-view-content">
        <h1>Wellness Garden</h1>
        <div className="main-view-nav">
          <GardenButton variant="contained" color="primary" component={Link} to="/garden">
            Go to Garden
          </GardenButton>
          <div className='main-view-nav-split'>
            <SplitButton variant="outlined" color="primary">Journal</SplitButton>
            <SplitButton variant="outlined" color="primary">Mood Board</SplitButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainView;

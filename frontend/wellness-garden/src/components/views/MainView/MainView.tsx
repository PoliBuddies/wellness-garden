import { styled } from '@mui/material';
import './MainView.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { GardenButton } from '../../common/GardenButton';
import { motion } from 'framer-motion';

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
      <motion.div className="main-view-bg"
        initial={{ filter: "blur(0px)" }}
        animate={{ filter: "blur(4px)" }}
        exit={{ filter: "blur(0px)" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.div className="bg-clouds"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        ></motion.div>
        <motion.div className="bg-ground"
          initial={{ y: "50vh" }}
          animate={{ y: 0 }}
          exit={{ y: "50vh" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>
      <motion.div className="main-view-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <h1>Wellness Garden</h1>
        <div className="main-view-nav">
          <GardenButton variant="contained" color="primary" component={Link} to="/garden">
            Go to Garden
          </GardenButton>
          <div className='main-view-nav-split'>
            <SplitButton variant="outlined" color="primary" component={Link} to="/journal">
              Journal
            </SplitButton>
            <SplitButton variant="outlined" color="primary" component={Link} to="/tree">
              Social Tree
            </SplitButton>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default MainView;

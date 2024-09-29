import { useEffect, useState } from 'react'
import { Activity } from '../../../types';
import Field from '../../garden/Field';
import './GardenView.css';
import SideNavButtons from '../../common/SideNavButtons';
import { motion } from 'framer-motion';

const GardenView = () => {
	// todo implement logic to pick larger from fetch.length + x (x === 2 || 3 depending on fetch.length being even or odd ) or 8
	const [activities, setActivities] = useState<Activity[]>([]);

	const numberOfFields = 8;

	const navButtons = [
		{	
			to: '/journal',
			content: 'Journal',
		},
		{
			to: '/',
			content: 'Go Back',
		}
	];
	
	const fetchActivities = (): Activity[] => {
		let mockActivities: Activity[] = []
		//TODO send actual Request
		for(let i = 0; i < numberOfFields; i++){
			mockActivities.push({
				name: i % 2 === 0 ? i.toString() : undefined,
				description: i % 2 === 0 ? (i + 100).toString() : undefined, 
				mood: i % 2 === 0 ? [i] : undefined,
				emote: i % 2 === 0 ? '🤣' : undefined,
			});
		}
		return mockActivities;
	}

	useEffect(() => {
		setActivities(fetchActivities())
    }, []);

  return (
		<div className="view garden-view">
			<div>
				<div className="garden-view-bg">
					<motion.div className="bg-ground-grass"
						initial={{ y: "80vh" }}
						animate={{ y: 0 }}
						exit={{ y: "80vh" }}
						transition={{ duration: 1, ease: "easeInOut" }}
					></motion.div>
				</div>
				<motion.img src="/fence.png" alt="Garden fence" className="garden-view-fence"
					initial={{ y: "80vh" }}
					animate={{ y: 0 }}
					exit={{ y: "80vh" }}
					transition={{ duration: 1, ease: "easeInOut" }}
				/>
				<motion.div className='garden-view-field'
					initial={{ y: "80vh" }}
					animate={{ y: 0 }}
					exit={{ y: "80vh" }}
					transition={{ duration: 1, ease: "easeInOut" }}
				>
					<Field activities={activities}></Field>
				</motion.div>
			</div>
			<motion.div className='garden-view-nav-buttons'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5, ease: "easeInOut" }}
			>
				<SideNavButtons buttons={navButtons}></SideNavButtons>
			</motion.div>
		</div>
  )
}

export default GardenView



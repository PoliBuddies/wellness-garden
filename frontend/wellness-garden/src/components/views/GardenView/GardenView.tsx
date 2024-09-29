import { useEffect, useState } from 'react'
import { Activity, BACKEND_URL, USER_ID } from '../../../types';
import Field from '../../garden/Field';
import Tree from '../../garden/Tree';
import './GardenView.css';
import SideNavButtons from '../../common/SideNavButtons';
import { motion } from 'framer-motion';

const GardenView = () => {
	const [activities, setActivities] = useState<Activity[]>([]);

	const minNumberOfFields = 12;

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

	async function fetchActivities(): Promise<void> {
		try {
			const res = await window.fetch(BACKEND_URL + '/activities/' + USER_ID, {method: 'GET'});
        	const data  = await res.json();
			const fetchedActivities = data as Activity[];
			if(fetchedActivities.length < minNumberOfFields){
				for(let i = fetchedActivities.length; i < minNumberOfFields; i++){
					fetchedActivities.push({
						id: undefined,
						name: undefined,
						icon: undefined,
					});
				}
			}
			setActivities(fetchedActivities);
		} catch {
			const emptyActivities: Activity[] = [];
			for(let i = 0; i < minNumberOfFields; i++){
				emptyActivities.push({
					id: undefined,
					name: undefined,
					icon: undefined,
				});
			}
			setActivities(emptyActivities);
		}
    } 

	useEffect(() => {
		fetchActivities();
    }, []);

  return (
		<div className="view garden-view">
			<div>
				<div className="garden-view-bg">
					<motion.div className="bg-ground-grass"
						initial={{ y: "230vh" }}
						animate={{ y: 0 }}
						exit={{ y: "230vh" }}
						transition={{ duration: 1.75, ease: "easeInOut" }}
					></motion.div>
				</div>
				<motion.img src="/fence.png" alt="Garden fence" className="garden-view-fence"
					initial={{ y: "230vh" }}
					animate={{ y: 0 }}
					exit={{ y: "230vh" }}
					transition={{ duration: 1.75, ease: "easeInOut" }}
				/>
				<motion.div className='garden-view-field'
					initial={{ y: "230vh" }}
					animate={{ y: 0 }}
					exit={{ y: "230vh" }}
					transition={{ duration: 1.75, ease: "easeInOut" }}
				>
					<Field activities={activities} refetch={fetchActivities}></Field>
				</motion.div>

				<motion.div 
					initial={{ y: "230vh", x: "60vw" }}
					animate={{ y: 0 }}
					exit={{ y: "230vh" }}
					transition={{ duration: 1.75, ease: "easeInOut" }}>
					<Tree></Tree>
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



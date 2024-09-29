import { useEffect, useState } from 'react'
import { Activity } from '../../../types';
import Field from '../../garden/Field';
import './GardenView.css';
import SideNavButtons from '../../common/SideNavButtons';

const GardenView = () => {
	// todo implement logic to pick larger from fetch.length + x (x === 2 || 3 depending on fetch.length being even or odd ) or 8
	const [activities, setActivities] = useState<Activity[]>([]);

	const numberOfFields = 8;

	const navButtons = [
		{	
			to: '/',
			content: 'Journal',
		},
		{
			to: '/',
			content: 'Mood',
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
					<div className="bg-ground-grass"></div>
				</div>
				<img src="/fence.png" alt="Garden fence" className="garden-view-fence" />
				<div className='garden-view-field'>
					<Field activities={activities}></Field>
				</div>
			</div>
			<div className='garden-view-nav-buttons'>
				<SideNavButtons buttons={navButtons}></SideNavButtons>
			</div>
		</div>
  )
}

export default GardenView



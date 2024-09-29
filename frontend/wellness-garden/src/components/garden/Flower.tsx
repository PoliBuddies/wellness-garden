import { FC } from 'react';
import './garden.css';

interface FlowerProps {
    id: number;
    tier: number;
}

const Flower: FC<FlowerProps> = ({id, tier}) => {
    const seededRandom = (seed: number): () => number => {
        let m = 0x80000000;
        let a = 1103515245;
        let c = 12345;
        
        let state = seed;
    
        return () => {
            state = (a * state + c) % m;
            return state / m;
        };
    };


    const getRandomFlowerImg = (): string => {
        const random = seededRandom(id);
        const randomNumber = Math.floor(random() * 8);
        if (tier === 0) {           
            return 'url("/flower_2_1.png")';
        }
        else if (tier === 2) {
            return 'url("/flower_2_2.png")';
        }
        else if (tier === 3) {
            return 'url("/flower_2_3.png")';
        }
        switch (randomNumber) {
            case 0:
                return 'url("/flower_1_1.png")';
            case 1:
                return 'url("/flower_2_1.png")';
            case 2:
                return 'url("/flower_2_2.png")';
            case 3:
                return 'url("/flower_2_3.png")';
            case 4:
                return 'url("/flower_3_1.png")';
            case 5:
                return 'url("/flower_3_2.png")';
            case 6:
                return 'url("/flower_3_3.png")';
            case 7:
                return 'url("/flower_4_1.png")';
            default:
                return "Invalid number";
        }
    } 

  return (
    <div  
        className='flower' 
        style={{ backgroundImage: getRandomFlowerImg() }}></div>
  )
}

export default Flower

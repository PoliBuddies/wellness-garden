export enum VIEWS {
    MAIN_VIEW = 'MAIN_VIEW',
    GARDEN_VIEW = 'GARDEN_VIEW',
    TREE_VIEW = 'TREE_VIEW',
    MOOD_BOARD_VIEW = 'MOOD_BOARD_VIEW',
};

export interface Activity {
    id?: number,
    name?: string,
    icon?: string,
    points?: number,
} //todo define properly

export interface ActivityWithPlotImg extends Activity {
    img: string;
}

export interface FullActivity extends Activity {
    description: string,
    mood: number[],
}

export enum PlotTilesImg {
    TOP_LEFT = 'url("/plot-1.png")',
    BOTTOM_LEFT = 'url("/plot-2.png")',
    TOP_MID = 'url("/plot-3.png")',
    BOTTOM_MID = 'url("/plot-4.png")',
    TOP_RIGHT = 'url("/plot-5.png")',
    BOTTOM_RIGHT = 'url("/plot-6.png")',
}

export const resolveMood = (mood: number): string => {
    switch(mood) {
        case 1: return '😢';
        case 2: return '😕';
        case 3: return '😐';
        case 4: return '😊';
        case 5: return '😁';
        default: return '🥸';
    } 
}

export const USERNAME: string = 'username';

export const USER_ID: number = 1;

export const BACKEND_URL = 'http://127.0.0.1:5000';

export interface CreateActivityRequest {
    title: string;
    description: string;
    icon: string;
}

export const TREE_IMG = 'url("/tree_mock.png")';
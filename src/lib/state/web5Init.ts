import { Web5 } from "@web5/api";
import { AppDispatch } from "./store";
import { setWeb5, setDID, setIsAuthenticated } from './web5Slice';

export const initializeWeb5 = async (dispatch: AppDispatch) => {
    try {
        const { web5, did } = await Web5.connect();
        dispatch(setWeb5(web5));
        dispatch(setDID(did));
        dispatch(setIsAuthenticated(true));
    } catch (error) {
        console.error('Failed to initialize web5:', error);
    }
};
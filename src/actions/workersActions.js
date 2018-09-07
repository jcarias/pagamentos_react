import { workersRef } from "../utils/firebaseUtils";
import { FETCH_WORKERS } from "./types";

export const addWorker = newWorker => async dispatch => {
    workersRef.push().set(newWorker);
};

export const fetchWorkers = () => async dispatch => {
    workersRef.on("value", snapshot => {
        dispatch({
            type: FETCH_WORKERS,
            payload: snapshot.val()
        });
    });
};

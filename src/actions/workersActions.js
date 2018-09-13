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

export const updateWorker = (key, worker) => async dispatch => {
    workersRef.child(key).set(worker);
};

export const deleteWorker = key => async dispatch => {
    //TODO: Delete Worker Services
    //TODO: Delete Worker Payments
    //Delete the actual Worker
    //workersRef.child(key).remove();
};

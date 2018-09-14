import { workersRef, servicesRef, paymentsRef } from "../utils/firebaseUtils";
import { FETCH_WORKERS, REQUEST } from "./types";

export const addWorker = newWorker => async dispatch => {
    workersRef.push().set(newWorker);
};

export const fetchWorkers = () => async dispatch => {
    dispatch({ type: REQUEST });
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
    dispatch({ type: REQUEST });
    console.log("Delete worker: " + key);

    servicesRef
        .orderByChild("worker")
        .equalTo(key)
        .once("value", snapshot => {
            let services = snapshot.val();
            if (services) {
                Object.keys(services).map(key => {
                    servicesRef.child(key).remove();
                    return true;
                });
            }

            // If the worker has services he might have payments
            paymentsRef
                .orderByChild("worker")
                .equalTo(key)
                .once("value", snapshot => {
                    let payments = snapshot.val();
                    if (payments) {
                        Object.keys(payments).map(key => {
                            paymentsRef.child(key).remove();
                            return true;
                        });
                    }
                });
        });

    //Delete the actual Worker
    workersRef.child(key).remove();
};

import { servicesRef } from "../utils/firebaseUtils";
import {
    FETCH_SERVICES,
    REQUEST_SERVICES,
    FETCH_SERVICE,
    UPDATE_SERVICE_FILTERS
} from "./types";

export const getServiceByKey = (key, callback) => async dispatch => {
    dispatch({ type: REQUEST_SERVICES });
    servicesRef.child(key).once("value", snapshot => {
        dispatch({
            type: FETCH_SERVICE,
            payload: snapshot.val()
        });
        if (callback) {
            callback(snapshot.val);
        }
    });
};

export const addService = newService => async dispatch => {
    servicesRef.push().set(newService);
};

export const deleteService = key => async dispatch => {
    servicesRef.child(key).remove();
};

export const updateService = (key, service) => async dispatch => {
    servicesRef.child(key).update(service);
};

export const fetchServices = (
    year = new Date().getFullYear(),
    month = new Date().getMonth()
) => async dispatch => {
    dispatch({
        type: UPDATE_SERVICE_FILTERS,
        payload: { year: year, month: month }
    });
    dispatch({ type: REQUEST_SERVICES });
    let startDate = new Date(year, month, 1, 0, 0, 0, 0).getTime();
    let endDate = new Date(year, month + 1, 1, 0, 0, 0, 0).getTime();
    servicesRef
        .orderByChild("serviceDate")
        .startAt(startDate)
        .endAt(endDate)
        .on("value", snapshot => {
            dispatch({
                type: FETCH_SERVICES,
                payload: snapshot.val()
            });
        });
};

export const fetchServicesYear = (
    year = new Date().getFullYear()
) => async dispatch => {
    dispatch({ type: REQUEST_SERVICES });
    let startDate = new Date(year, 0, 1, 0, 0, 0, 0).getTime();
    let endDate = new Date(year + 1, 0, 1, 0, 0, 0, 0).getTime();
    servicesRef
        .orderByChild("serviceDate")
        .startAt(startDate)
        .endAt(endDate)
        .on("value", snapshot => {
            dispatch({
                type: FETCH_SERVICES,
                payload: snapshot.val()
            });
        });
};

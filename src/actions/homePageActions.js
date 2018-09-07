import { servicesRef } from "../utils/firebaseUtils";
import {
    REQUEST,
    SET_YEAR_FILTER,
    FETCH_SERVICES_YEAR,
    SET_YEAR_MONTH_FILTER,
    FETCH_SERVICES_YEAR_MONTH
} from "../actions/types";

export const setYearFilter = year => async dispatch => {
    dispatch({
        type: SET_YEAR_FILTER,
        payload: year
    });
};

export const fetchServicesYear = year => async dispatch => {
    dispatch({
        type: SET_YEAR_FILTER,
        payload: year
    });
    dispatch({ type: REQUEST });
    let startDate = new Date(year, 0, 1, 0, 0, 0, 0).getTime();
    let endDate = new Date(year + 1, 0, 1, 0, 0, 0, 0).getTime();
    servicesRef
        .orderByChild("serviceDate")
        .startAt(startDate)
        .endAt(endDate)
        .on("value", snapshot => {
            dispatch({
                type: FETCH_SERVICES_YEAR,
                payload: snapshot.val()
            });
        });
};
export const fetchServicesYearMonth = (year, month) => async dispatch => {
    dispatch({
        type: SET_YEAR_MONTH_FILTER,
        payload: { year: year, month: month }
    });
    dispatch({ type: REQUEST });
    let startDate = new Date(year, month, 1, 0, 0, 0, 0).getTime();
    let endDate = new Date(year, month + 1, 1, 0, 0, 0, 0).getTime();
    servicesRef
        .orderByChild("serviceDate")
        .startAt(startDate)
        .endAt(endDate)
        .on("value", snapshot => {
            dispatch({
                type: FETCH_SERVICES_YEAR_MONTH,
                payload: snapshot.val()
            });
        });
};

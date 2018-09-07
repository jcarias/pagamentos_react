import {
    FETCH_SERVICES,
    REQUEST_SERVICES,
    FETCH_SERVICE,
    UPDATE_SERVICE_FILTERS
} from "../actions/types";

const ServicesReducer = (
    state = {
        services: {},
        loading: false,
        filters: {
            year: new Date().getFullYear(),
            month: new Date().getMonth()
        }
    },
    action
) => {
    switch (action.type) {
        case REQUEST_SERVICES:
            return {
                ...state,
                services: {},
                loading: true
            };
        case FETCH_SERVICES:
            return {
                ...state,
                services: action.payload,
                loading: false
            };
        case FETCH_SERVICE:
            return {
                ...state,
                service: action.payload,
                loading: false
            };
        case UPDATE_SERVICE_FILTERS:
            return {
                ...state,
                filters: action.payload
            };
        default:
            return state;
    }
};

export default ServicesReducer;

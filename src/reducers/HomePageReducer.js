import {
    REQUEST,
    SET_YEAR_FILTER,
    FETCH_SERVICES_YEAR,
    SET_YEAR_MONTH_FILTER,
    FETCH_SERVICES_YEAR_MONTH
} from "../actions/types";

const HomePageReducer = (
    state = {
        servicesYear: {},
        servicesYearMonth: {},
        workers: {},
        loading: false,
        serviceFilters: {
            year: new Date().getFullYear(),
            month: new Date().getMonth()
        }
    },
    action
) => {
    switch (action.type) {
        case REQUEST:
            return {
                ...state,
                loading: true
            };
        case SET_YEAR_FILTER:
            return {
                ...state,
                serviceFilters: {
                    ...state.serviceFilters,
                    year: action.payload
                }
            };
        case FETCH_SERVICES_YEAR:
            return {
                ...state,
                servicesYear: action.payload,
                loading: false
            };
        case SET_YEAR_MONTH_FILTER:
            return {
                ...state,
                serviceFilters: action.payload
            };
        case FETCH_SERVICES_YEAR_MONTH:
            return {
                ...state,
                servicesYearMonth: action.payload,
                loading: false
            };

        default:
            return state;
    }
};

export default HomePageReducer;

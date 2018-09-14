import {
    FETCH_WORKERS,
    REQUEST_WORKERS,
    RESPONSE_WORKERS
} from "../actions/types";

const WorkersReducer = (state = { loading: false, workers: {} }, action) => {
    switch (action.type) {
        case REQUEST_WORKERS:
            return {
                ...state,
                workers: {},
                loading: true
            };
        case RESPONSE_WORKERS:
            return {
                ...state,
                loading: false
            };

        case FETCH_WORKERS:
            return {
                ...state,
                workers: action.payload,
                loading: false
            };

        default:
            return state;
    }
};

export default WorkersReducer;

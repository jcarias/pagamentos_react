import { FETCH_WORKERS } from "../actions/types";

const WorkersReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_WORKERS:
            return action.payload;
        default:
            return state;
    }
};

export default WorkersReducer;

import {
    FETCH_PAYMENTS,
    REQUEST,
    FETCH_UNPAID_SERVICES
} from "../actions/types";

const PaymentsReducer = (
    state = { loading: false, payments: {}, unpaidServices: {} },
    action
) => {
    switch (action.type) {
        case REQUEST:
            return {
                ...state,
                payments: {},
                loading: true
            };
        case FETCH_PAYMENTS:
            return {
                ...state,
                payments: action.payload,
                loading: false
            };
        case FETCH_UNPAID_SERVICES:
            return {
                ...state,
                unpaidServices: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export default PaymentsReducer;

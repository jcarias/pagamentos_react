import { FETCH_PAYMENTS, REQUEST } from "../actions/types";

const PaymentsReducer = (state = { loading: false }, action) => {
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
        default:
            return state;
    }
};

export default PaymentsReducer;

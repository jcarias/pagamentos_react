import { paymentsRef } from "../utils/firebaseUtils";
import { REQUEST, FETCH_PAYMENTS } from "./types";
import { clientSideFilter } from "../utils/commonUtils";

export const addPayment = newPayment => async dispatch => {
    paymentsRef.push().set(newPayment);
};

export const fetchPayments = (workerKey, year, month) => async dispatch => {
    dispatch({ REQUEST });
    workersRef.on("value", snapshot => {
        let retVal = snapshot.val();

        if (workerKey) {
            retVal = clientSideFilter(
                retVal,
                payment => payment.worker === workerKey
            );
        }

        if (year) {
            retVal = clientSideFilter(
                retVal,
                year =>
                    !isNaN(Number(payment.year)) &&
                    Number(payment.year) === Number(year)
            );
        }
        if (month) {
            retVal = clientSideFilter(
                retVal,
                month =>
                    !isNaN(Number(payment.month)) &&
                    Number(payment.month) === Number(month)
            );
        }

        dispatch({
            type: FETCH_PAYMENTS,
            payload: retVal
        });
    });
};

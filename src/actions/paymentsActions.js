import { paymentsRef, servicesRef } from "../utils/firebaseUtils";
import {
    REQUEST,
    FETCH_PAYMENTS,
    FETCH_UNPAID_SERVICES,
    EDIT_SERVICE,
    DELETE_SERVICE
} from "./types";
import { clientSideFilter } from "../utils/commonUtils";

export const addPayment = newPayment => async dispatch => {
    var newRef = paymentsRef.push();
    var paymentKey = newRef.getKey();

    const { paymentDate, services } = newPayment;
    if (services) {
        Object.keys(services).map(key => {
            let service = services[key];
            service.paymentDate = paymentDate;
            service.payment = paymentKey;
            return servicesRef.child(key).update(service);
        });
    }

    newRef.set(newPayment);
};

export const fetchPayments = (workerKey, year, month) => async dispatch => {
    dispatch({ type: REQUEST });

    paymentsRef.on("value", snapshot => {
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
                payment =>
                    !isNaN(Number(payment.year)) &&
                    Number(payment.year) === Number(year)
            );
        }
        if (month !== "") {
            retVal = clientSideFilter(
                retVal,
                payment =>
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

export const fetchUnpaidServices = (
    workerKey,
    year,
    month,
    paymentKey
) => async dispatch => {
    dispatch({ type: REQUEST });

    servicesRef.orderByChild("serviceDate").on("value", snapshot => {
        let retVal = snapshot.val();

        retVal = clientSideFilter(
            retVal,
            service =>
                !service.paymentDate ||
                (service.paymentDate && service.payment === paymentKey)
        );

        if (workerKey) {
            retVal = clientSideFilter(
                retVal,
                service => service.worker === workerKey
            );
        }

        if (year) {
            retVal = clientSideFilter(retVal, service => {
                let date = new Date(service.serviceDate);
                return date.getFullYear() === year;
            });
        }

        if (month !== "" && month !== null && month !== undefined) {
            retVal = clientSideFilter(retVal, service => {
                let date = new Date(service.serviceDate);
                return date.getMonth() === month;
            });
        }

        dispatch({
            type: FETCH_UNPAID_SERVICES,
            payload: retVal
        });
    });
};

export const fetchPaymentServices = paymentKey => async dispatch => {
    dispatch({ type: REQUEST });
    servicesRef
        .orderByChild("payment")
        .equalTo(paymentKey)
        .on("value", snapshot => {
            let retVal = snapshot.val();

            dispatch({
                type: FETCH_UNPAID_SERVICES,
                payload: retVal
            });
        });
};

const deleteServicesPaymentInfo = services => {
    if (services) {
        Object.keys(services).map(key => {
            servicesRef
                .child(key)
                .child("payment")
                .remove();
            servicesRef
                .child(key)
                .child("paymentDate")
                .remove();
            return true;
        });
    }
};

export const deletePayment = (paymentKey, paymentData) => async dispatch => {
    const { services } = paymentData;
    if (services) {
        deleteServicesPaymentInfo(services);
    }

    paymentsRef.child(paymentKey).remove();
};

const deletePaymentServices = paymentKey => {
    servicesRef
        .orderByChild("payment")
        .equalTo(paymentKey)
        .once("value", snapshot => {
            deleteServicesPaymentInfo(snapshot.val());
        });
};

export const updatePayment = (paymentKey, paymentData) => async dispatch => {
    deletePaymentServices(paymentKey);
    paymentsRef.child(paymentKey).update(paymentData);
};

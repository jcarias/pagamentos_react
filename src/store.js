import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import ServicesReducer from "./reducers/ServicesReducer";
import WorkersReducer from "./reducers/WorkersReducer";
import HomePageReducer from "./reducers/HomePageReducer";
import PaymentsReducer from "./reducers/PaymentsReducer";

export default createStore(
    combineReducers({
        ServicesReducer,
        WorkersReducer,
        HomePageReducer,
        PaymentsReducer
    }),
    {},
    applyMiddleware(logger, thunk)
);

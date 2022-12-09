import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './sagas/rootSaga';
import { StationReducer } from './reducers/StationReducer';
import { TripReducer } from './reducers/TripReducer';
import { BusCompanyReducer } from './reducers/BusCompanyReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { DrawerReducer } from './reducers/DrawerReducer';
import { UserReducer } from './reducers/UserReducer';
import { VehicleReducer } from './reducers/VehicleReducer';
import { SeatReducer } from './reducers/SeatReducer';
import { GlobalReducer } from './reducers/GlobalReducer';
import { TicketReducer } from './reducers/TicketReducer';
import { SearchReducer } from './reducers/SearchReducer';
import { CheckoutReducer } from './reducers/CheckoutReducer';

const middlewareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
    LoadingReducer,
    DrawerReducer,
    StationReducer,
    TripReducer,
    BusCompanyReducer,
    GlobalReducer,
    UserReducer,
    VehicleReducer,
    SeatReducer,
    TicketReducer,
    SearchReducer,
    CheckoutReducer
});

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));
middlewareSaga.run(rootSaga);

export default store;
import {createStore, applyMiddleware} from "redux";
import reducer from '../reducers';
import logger from '../middlewares/logger';
import middleware from '../middlewares/middleware';

const enhancer = applyMiddleware(middleware, logger);

const store = createStore(reducer, {}, enhancer);

export default store;
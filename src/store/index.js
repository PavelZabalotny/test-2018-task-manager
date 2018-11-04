import {createStore, applyMiddleware} from "redux";
import reducer from '../reducers';
import logger from '../middlewares/logger';
import generateId from '../middlewares/middleware';

const enhancer = applyMiddleware(generateId, logger);

const store = createStore(reducer, {}, enhancer);

export default store;
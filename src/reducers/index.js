import {combineReducers} from 'redux';
import taskItems from './taskItemReducer';

export default combineReducers({
  taskItems,
});
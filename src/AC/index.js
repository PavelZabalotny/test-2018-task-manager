import {DELETE_TASK, ADD_TASK, RESOLVE_TASK, UPDATE_TASK} from '../constants';

export const deleteTask = id => {
  return {
    type: DELETE_TASK,
    payload: {
      id,
    }
  }
};

export const addTask = task => {
  return {
    type: ADD_TASK,
    payload: {
      task,
      status: 'inProgress',
      resolve: true,
    }
  }
};

export const clickResolveButton = id => {
  return {
    type: RESOLVE_TASK,
    payload: {
      id,
    }
  }
};

export const updateTask = () => {
  return {
    type: UPDATE_TASK,
    payload: {
      count: null,
    }
  }
};

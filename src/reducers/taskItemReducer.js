import defaultStatus from '../defaultTask';
import {DELETE_TASK, ADD_TASK, RESOLVE_TASK, UPDATE_TASK} from "../constants";

export default (taskItemsState = defaultStatus, action) => {
  const {type, payload} = action;

  switch (type) {

    /* удаление задачи */
    case DELETE_TASK:
      return taskItemsState.filter(item => item.id !== payload.id);

    /* добавление задачи */
    case ADD_TASK:
      return [...taskItemsState, payload];

    /* перемещение задачи вверх, обновление времени и установление статуса - done */
    case RESOLVE_TASK:
      const newStore = [...taskItemsState];

      newStore.forEach((item, index) => {
        if (item.id === payload.id) {
          item.resolve = false;
          item.status = 'done';
          item.time = payload.time;
          newStore.splice(index, 1);
          newStore.unshift(item)
        }
      });

      return newStore;

    /* Каждые 3 минуты 1,2,4,8,16,32,64... задачи списка (только если задача в статусе inProgress,
    если задача имеет другой статус - ее статус не меняется)
    получают статус 'expired' и перемещаются вниз списка. Кнопка 'resolve' для данных задач пропадает */
    case UPDATE_TASK:
      const updateState = (prevState, count) => {

        if (prevState.findIndex(item => item.status === 'inProgress') >= 0) {
          const nextState = [...prevState];
          const len = prevState.length;

          for (let i = 0; i < len && i < count; i++) {
            let index = nextState.findIndex(item => item.status === 'inProgress');
            if (index >= 0) {
              nextState[index].status = 'expired';
              nextState[index].resolve = false;
              nextState.push(...nextState.splice(index, 1));
            }
          }

          return nextState
        }

        return prevState;
      };

      return updateState(taskItemsState, payload.count);

    default:
      return taskItemsState
  }
}
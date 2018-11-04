import {ADD_TASK, RESOLVE_TASK, UPDATE_TASK} from "../constants";
import {generateExpiredTasks} from '../utils';

export default () => next => action => {
  const {type, payload} = action;
  const url = 'http://worldclockapi.com/api/json/est/now';

  /* Функция для формирования запроса и передачи в reducer сформированного payload */
  const fetchRequest = (url, getPayload) => {
    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          console.log('Проблема с запросом. Код ошибки: ' + response.status);
          return;
        }
        return response.json()
      })
      .then(data => {
        action.payload = getPayload(data);
        return next(action);
      })
      .catch(err => {
        console.log('Fetch Error: ', err);
      });
  };

  switch (type) {

    /* При добавлении задачи происходит запрос для получения текущего времени,
    * полям id, time, currentFileTime задачи присваиваются необходимые значение */
    case ADD_TASK:
      fetchRequest(url, data => ({
          ...payload,
          id: data.currentFileTime,
          time: data.currentDateTime,
        })
      );
      break;

    /* При нажатии кнопки RESOLVE происходит запрос на сервер для получения текущего времени,
    * которое далее в конечном итоге передается в reducer */
    case RESOLVE_TASK:
      fetchRequest(url, data => ({
          ...payload,
          time: data.currentDateTime,
        })
      );
      break;

    /* При срабатывании action UPDATE_TASK, полю count присваивается новое значение,
    * сгенерированное функцией generateExpiredTasks() */
    case UPDATE_TASK:
      action.payload = {
        count: generateExpiredTasks()
      };
      return next(action);

    default:
      return next(action);
  }
}
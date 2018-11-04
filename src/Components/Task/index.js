import React from 'react';
import PropTypes from 'prop-types';
import {getHistoryDate} from "../../utils";

const Task = ({id, time, task, status, resolve, deleteTask, resolveTask, statusColor}) => {

  const visibility = resolve ? 'visible' : 'hidden';

  return (
    <li className="list-group-item shadow p-1 mb-3 bg-white">

      <div className="row">

        <div className="col">{getHistoryDate(time)}</div>

        <div className="col-6">{task}</div>

        <div
          className="col font-weight-bold text-right"
          style={{color: statusColor}}
        >
          {status}
        </div>

        <div className="col">
          <div className="container">
            <button
              className="btn btn-success btn-sm"
              style={{visibility}}
              onClick={resolveTask(id)}
            >
              Resolve
            </button>
          </div>

        </div>

        <div className="col">

          <div className="container">
            <button
              type="button"
              onClick={deleteTask(id)}
              className="btn btn-danger btn-sm mx-auto float-right">
              Удалить
            </button>
          </div>

        </div>

      </div>

    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  task: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['inProgress', 'expired', 'done']).isRequired,
  resolve: PropTypes.bool.isRequired,
  resolveTask: PropTypes.func,
  statusColor: PropTypes.string.isRequired,
};

export default Task;
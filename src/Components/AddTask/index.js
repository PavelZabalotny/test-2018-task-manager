import React from 'react';
import PropTypes from 'prop-types';

const AddTask = ({onChangeInputTask, valueTask, validate, onAddTask}) => {

  return (
    <form className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Добавить задачу"
        aria-label="Добавить задачу"
        aria-describedby="button-addon2"
        value={valueTask}
        onChange={onChangeInputTask}
      />
      <div className="input-group-append">
        <button
          className="btn btn-primary"
          type="submit"
          id="button-addon2"
          disabled={validate()}
          onClick={onAddTask}
        >Добавить
        </button>
      </div>
    </form>
  );
};

AddTask.propTypes = {
  onChangeInputTask: PropTypes.func,
  valueTask: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
};

export default AddTask;
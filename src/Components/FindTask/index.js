import React from 'react';
import PropTypes from 'prop-types';

const FindTask = ({findTaskInput, onReset, onCheckedChange, onSearchChange, inProgress, expired, done}) => {

  /* Сброс фильтров поиска */
  const handleReset = () => {
    const resetFindState = {
      findTaskInput: '',
      inProgress: '',
      expired: '',
      done: '',
    };

    onReset(resetFindState)
  };

  const toggleChange = e => {
    const {name} = e.target;

    onCheckedChange(name)
  };

  const onSearchFindChange = e => {
    const {value} = e.target;

    onSearchChange(value);
  }

  return (
    <div className="mb-4" /*ref={this.findCheckbox}*/>

      <div className="input-group mb-1">

        <input
          type="text"
          className="form-control"
          placeholder="Поиск задач"
          aria-label="Поиск задач"
          aria-describedby="button-addon2"
          value={findTaskInput}
          onChange={onSearchFindChange}
        />

        <button
          className="btn btn-primary btn-sm"
          onClick={handleReset}
        >
          Reset
        </button>

      </div>

      <div className="form-check-inline">
          <span className="mr-2">
            Поиск cо статусом:
          </span>
        <label className="form-check-label" htmlFor="check1">
          <input
            type="checkbox"
            name="inProgress"
            className="form-check-input"
            defaultChecked={inProgress}
            onChange={toggleChange}
          />
          inProgress
        </label>
      </div>

      <div className="form-check-inline">
        <label className="form-check-label" htmlFor="check1">
          <input
            type="checkbox"
            name="expired"
            className="form-check-input"
            defaultChecked={expired}
            onChange={toggleChange}
          />
          expired
        </label>
      </div>

      <div className="form-check-inline">
        <label className="form-check-label" htmlFor="check1">
          <input
            type="checkbox"
            name="done"
            className="form-check-input"
            defaultChecked={done}
            onChange={toggleChange}
          />
          done
        </label>
      </div>

    </div>
  )
}

FindTask.propTypes = {
  onSearchChange: PropTypes.func,
  onCheckedChange: PropTypes.func,
  onReset: PropTypes.func,
};

export default FindTask;
import React from 'react';
import PropTypes from 'prop-types';

class FindTask extends React.Component {
  static propTypes = {
    onSearchChange: PropTypes.func,
    onCheckedChange: PropTypes.func,
    onReset: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      validateTask: '',
      findTaskInput: '',
      inProgress: '',
      expired: '',
      done: '',
      checkedName: '',
    };

    this.findCheckbox = React.createRef();
  }


  render() {
    return (
      <div className="mb-4" ref={this.findCheckbox}>

        <div className="input-group mb-1">

          <input
            type="text"
            className="form-control"
            placeholder="Поиск задач"
            aria-label="Поиск задач"
            aria-describedby="button-addon2"
            value={this.state.findTaskInput}
            onChange={this.onSearchChange}
          />

          <button
            className="btn btn-primary btn-sm"
            onClick={this.handleReset}
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
              defaultChecked={this.state.inProgress}
              onChange={this.toggleChange}
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
              defaultChecked={this.state.expired}
              onChange={this.toggleChange}
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
              defaultChecked={this.state.done}
              onChange={this.toggleChange}
            />
            done
          </label>
        </div>

      </div>
    );
  }

  /* Сброс фильтров поиска */
  handleReset = () => {
    const resetFindState = {
      findTaskInput: '',
      inProgress: '',
      expired: '',
      done: '',
    };

    this.findCheckbox.current.querySelectorAll('.form-check-input').forEach(item => item.checked = '');

    this.setState(resetFindState);

    this.props.onReset(resetFindState)
  };

  toggleChange = e => {
    const {name} = e.target;

    this.setState({
      [name]: this.state[name] ? '' : name
    });

    this.props.onCheckedChange(name)
  };

  onSearchChange = e => {
    const {value} = e.target;

    this.setState({
      findTaskInput: value
    });

    this.props.onSearchChange(value);
  };
}

export default FindTask;
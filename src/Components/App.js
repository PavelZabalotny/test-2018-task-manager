import React, {Component} from 'react';
import {connect} from 'react-redux';
import FindTask from './FindTask/index';
import AddTask from './AddTask/index';
import Tasks from './Tasks/index';
import {addTask, updateTask} from '../AC/index';
import PropTypes from 'prop-types';

class App extends Component {

  static propTypes = {
    taskItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      time: PropTypes.string.isRequired,
      task: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['inProgress', 'expired', 'done']).isRequired,
    })),
    updateTask: PropTypes.func.isRequired,
  };

  state = {
    findTaskInput: '',
    validateTask: '',
    inProgress: '',
    expired: '',
    done: '',
  };

  /* После монтирования компонента запускается интервал (3 минуты - 180000 мсек), каждые 3 минуты генерируется число
  * и диспатчится action - UPDATE_TASK */
  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.props.updateTask();
    }, 180000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    console.log('componentDidMount');
  }

  render() {

    const {taskItems} = this.props;
    const {findTaskInput, inProgress, expired, done} = this.state;
    const visibleItems = this.handleSearch(taskItems, findTaskInput, inProgress, expired, done);

    return (
      <div className="container h-100">

        <h3>Task Manager</h3>

        {/* Поиск списка задач */}
        <FindTask
          onSearchChange={this.handleSearchChange}
          onCheckedChange={this.handleCheckedChange}
          onReset={this.handleReset}
        />

        {/* Добавление задач */}
        <AddTask
          onChangeInputTask={this.handleChangeTask}
          valueTask={this.state.validateTask}
          validate={this.handleValidateTask}
          onAddTask={this.handleAddTask}
        />

        {/* Отображение списка задач */}
        <Tasks
          visibleItems={visibleItems}
        />

      </div>
    );
  }

  /* Сброс параметров поиска */
  handleReset = resetFindState => {
    this.setState(resetFindState);
  };

  /* Поиск по теме и/или по статусу */
  handleSearch = (items, input, ...rest) => {
    const iLen = input.trim().length;
    const arr = [];

    rest.forEach(item => {
      if (item) {
        arr.push(item);
      }
    });

    if (arr.length > 0) {
      return items
        .filter(item => item.task.includes(input.trim()))
        .filter(item => {
          return arr.indexOf(item.status) >= 0;
        })
    } else if (iLen) {
      return items.filter(item => item.task.includes(input.trim()))
    }
    return items;
  };

  handleCheckedChange = name => {
    this.setState({
      [name]: this.state[name] ? '' : name
    })
  };

  handleSearchChange = findTaskInput => {
    this.setState({
      findTaskInput
    })
  };

  handleAddTask = e => {
    e.preventDefault();
    this.props.addTask(
      this.state.validateTask
    );

    this.setState({
      validateTask: ''
    })
  };

  handleValidateTask = () => {
    return !(this.state.validateTask.trim().length > 0)
  };

  handleChangeTask = e => {
    this.setState({
      validateTask: e.target.value
    });
  };
}

const mapStateToProps = (state) => {
  return {
    taskItems: state.taskItems,
  }
};

const mapDispatchToProps = {
  addTask,
  updateTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
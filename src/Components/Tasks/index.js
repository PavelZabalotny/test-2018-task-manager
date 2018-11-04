import React from 'react';
import Task from '../Task';
import PropTypes from 'prop-types';
import {clickResolveButton, deleteTask} from "../../AC";
import {connect} from "react-redux";

class Tasks extends React.Component {

  static propTypes = {
    visibleItems: PropTypes.array.isRequired,
    deleteTask: PropTypes.func,
    clickResolveButton: PropTypes.func,
  };

  render() {
    const {visibleItems} = this.props;

    return (
      <ul className="list-group list-unstyled">
        {visibleItems
          .map(item => (
              <Task
                key={item.id}
                id={item.id}
                time={item.time}
                task={item.task}
                status={item.status}
                resolve={item.resolve}
                deleteTask={this.handleDeleteTask}
                resolveTask={this.handleResolveTask}
                statusColor={this.getStatusColor(item.status)}
              />
            )
          )}
      </ul>
    );
  }

  handleDeleteTask = id => () => {
    this.props.deleteTask(id);
  };

  handleResolveTask = id => () => {
    this.props.clickResolveButton(id);
  };

  getStatusColor = status => {
    if (status === 'inProgress') {
      return 'yellow'
    } else if (status === 'expired') {
      return 'red'
    }
    return 'green'
  };
}

const mapDispatchToProps = {
  deleteTask,
  clickResolveButton,
};

export default connect(null, mapDispatchToProps)(Tasks);
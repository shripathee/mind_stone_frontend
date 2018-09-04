import React, { Component } from 'react';
import Select from 'react-select';
import { sendRequest } from 'utilities/request';
import history from '../../history';

export default class CreateGroup extends Component {
  state = {
    name: '',
    selectedUsers: []
  };
  handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }
  handleSelectedUsersChange(selectedUsers) {
    this.setState({
      selectedUsers
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    let { name, selectedUsers } = this.state;
    sendRequest('/groups/', 'POST', {
      name,
      users: selectedUsers.map((user) => user.id)
    }).then((group) => {
      this.props.addNewGroup(group);
      history.push(`/groups/${group.id}/conversation`);
    })
  }
  render() {
    return (
      <form  onSubmit={this.handleSubmit.bind(this)}>
        <div class="form-group">
          <label>Name</label> 
          <input className="form-control" type="text" required value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
        </div>
        <div class="form-group">
          <label>Users</label> 
          <Select
            isMulti
            name="users"
            options={this.props.availableUsers}
            className="basic-multi-select"
            classNamePrefix="select"
            getOptionLabel={(option) => {
              return option.username;
            }}
            getOptionValue={(option) => option.id}
            onChange={this.handleSelectedUsersChange.bind(this)}
          />
        </div>
        <input className="btn btn-primary" type="submit" value="Submit" />
      </form>
    );
  }
}
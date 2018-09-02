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
      history.push(`/groups/${group.id}/conversation`);
    })
  }
  render() {
    return (
      <form  onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Name:
          <input type="text" required value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
        </label>
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
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavigationList extends Component {
  constructor(props) {
    super(props);
    this.entity = props.entity;
    this.items = props.items;
    this.labelProperty = props.labelProperty || 'name';
  }
  render() {
    const listItems = this.items.map((item) =>
      <NavLink key={item.id} className="list-group-item text-right" to={`/${this.entity}/${item.id}/conversation`}>
        {item[this.labelProperty]}
      </NavLink>
    );
    return (
      <div className="list-group">
        {listItems}
      </div>
    );
  }
}
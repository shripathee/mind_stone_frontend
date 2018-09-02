import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavigationList extends Component {
  constructor(props) {
    super(props);
    this.entity = props.entity;
    this.items = props.items;
    this.labelProperty = props.labelProperty || 'name';
  }
  render() {
    const listItems = this.items.map((item) =>
      <Link to={`/${this.entity}/${item.id}/conversation`}>
        <li key={item.id}>{item[this.labelProperty]}</li>
      </Link>
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }
}
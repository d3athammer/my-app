import React, { Component } from 'react';

class TableHeader extends Component {
  // columns: array
  // sortColum: object
  // onSort: function
  raiseSort = path => {
  // get the full array
  const sortColumn = { ...this.props.sortColumn };
  // get the title of sort, change order of the column
  if (sortColumn.path === path) {
    sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.path = path;
    sortColumn.order = 'asc';
  }
  this.props.onSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th key={column.path || column.key} onClick={() => this.raiseSort(column.path)} >{column.label}</th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

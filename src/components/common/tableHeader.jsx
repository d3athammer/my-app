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

  renderSortIcon = column => {
    const { sortColumn } = this.props
    //1. icon will show both sides when no filter are selected
    if (column.path !== sortColumn.path) return <i className="fa-solid fa-sort"></i>;
    //2. icon will show sort up when in ascending order
    if (sortColumn.order === 'asc') return <i class="fa-solid fa-sort-up"></i>;
    //3. icon will show sort down when in descending order
    return <i class="fa-solid fa-sort-down"></i>;
  }

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              style={{cursor: "pointer"}}
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>

          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

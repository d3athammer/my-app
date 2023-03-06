import React, { Component } from 'react';
import _ from 'lodash';
class TableBody extends Component {


  renderCell = (item, column) => {
    //column content is a function that takes in an item as parameter
    if (column.content) return column.content(item)

    return _.get(item, column.path);
  }

  render() {
    const { data, columns } = this.props;
    return (<tbody>
        {data.map( item => (
          <tr>
            {/* lodash.get will allow the access to nested items */}
            {columns.map(column => <td>{this.renderCell(item, column) }</td>)}
          </tr>
        ))}
      </tbody>);
  }
}

export default TableBody;

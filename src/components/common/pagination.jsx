import React, { Component } from 'react';
import _ from 'lodash';

class Pagination extends Component {

  render() {
    const { itemsCount, pageSize, currentPage, onPageChange } = this.props;
    // Count the number of pages required
    const pagesCount = Math.ceil(itemsCount / pageSize) ;
    // Don't show page number if there is only 1
    if (pagesCount === 1) {
      return null
    };
    // using lodash to calculate the full range of page numbers required based on pagesCount
    const pages = _.range(1, pagesCount + 1);

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
        {/* Map the pages according to how many items are in a page */}
        { pages.map( page => (
            <li key={page} style={{ outline: "none"}} className={ page === currentPage ? 'page-item active' : 'page-item'}>
              <a className="page-link" onClick={() => onPageChange(page)} href="#">{page}</a>
            </li>
        ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;

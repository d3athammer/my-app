import React, { Component } from 'react';

class ListGroup extends Component {
  //getGenres() function takes in all genres and filter out those that === true
  //map the list of movies genre
  // I need: handleClick props, getGenres filter, key
  // pass in a props to find all genres


  render() {
    const { items, textProperty, valueProperty, onItemSelect } = this.props;

    return (
      <ul className="list-group">
      <li className='list-group-item' >All Genres</li>
      {items.map( item => (
      <li
        key={item[valueProperty]}
        onClick={() => onItemSelect}
        // className={item === this.state.currentGenre ? "list-group-item active" : "list-group-item"}
      >
        {item[textProperty]}
      </li>
      ))}

      </ul>
    );
  }
}

// setting default props to declutter the excessive use of props in your component
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
}

export default ListGroup ;

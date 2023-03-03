import React, { Component } from 'react';


class Like extends Component {

  render() {



    return (
      <div>
      <i style={{cursor: 'pointer'}} className={this.props.liked ? "fa-solid fa-heart" : "fa-regular fa-heart"} onClick={() => this.props.onClick()}></i>
      </div>
    );
  }
}

export default Like;

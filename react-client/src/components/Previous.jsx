import React from 'react';
import PreviousEntry from './PreviousEntry.jsx';

class Previous extends React.Component {
  constructor(props) {
    super(props);
    this.loadPrev = this.loadPrev.bind(this);
}

  loadPrev(query) {
    this.props.onPrev(query);
  }

  render () {
    return (
      <div className="floattext">
      <h3> Previous Walls: </h3>
      {this.props.queries.map((query, index) => (
        <PreviousEntry query={query} onClick={this.loadPrev} key={index}/>
      ))}
      </div>
    )
  }
}

export default Previous;

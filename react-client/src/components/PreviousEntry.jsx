import React from 'react';

class PreviousEntry extends React.Component {

constructor(props) {
  super(props);
  this.click = this.click.bind(this);
}

click() {
  this.props.onClick(this.props.query);
}

render () {
  return (
  <div onClick={this.click}>{this.props.query}
  </div>
  )
}
}
export default PreviousEntry;
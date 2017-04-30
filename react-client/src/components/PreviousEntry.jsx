import React from 'react';

class PreviousEntry extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    defClass: 'regular-font',
    lastClicked: ''
  }
  this.click = this.click.bind(this);
}

componentWillMount() {
  this.setState({
    defClass: 'regular-font'
  })
}

click(e) {
  this.props.onClick(this.props.query);
  if (e.target.className === 'regular-font') {
    this.setState({
      defClass: 'bold-select'
    })
  } else {
    this.setState({
      defClass: 'regular-font'
    })
  }
}

render () {
  return (
  <div className={this.state.defClass} onClick={this.click}>{this.props.query}
  </div>
  )
}
}
export default PreviousEntry;
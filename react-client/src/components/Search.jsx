import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);
    this.random = this.random.bind(this);
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.query);
    this.setState({
      query: ''
    });
  }

  clear() {
    this.props.onClear();
  }

  random() {
    this.props.onRandom();
  }

  resetButton() {

  }

  render () {
    return (<div>
      Make New Wall: <input type="text" value={this.state.query} onChange={this.handleChange}></input>
      <button type="submit" onClick={this.search}>Submit</button>
      <button type="submit" onClick={this.clear}>Clear Mosaic</button>
      <button type="submit" onClick={this.random}>Randomize</button>
      </div>)
  }
}

export default Search;
import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  search() {
    // console.log(this.state.query);
    this.props.onSearch(this.state.query);
  }

  render () {
    return (<div>
      Search: <input type="text" onChange={this.handleChange}></input>
      <button type="submit" onClick={this.search}>Submit</button>
      </div>)
  }
}

export default Search;
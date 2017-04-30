import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import Previous from './components/Previous.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      pics: [],
      prevQueries: [],
      mostRecentQuery: ''
    }
    this.didRandom = false;
    this.search = this.search.bind(this);
    this.loadMosaic = this.loadMosaic.bind(this);
    this.clearMosaic = this.clearMosaic.bind(this);
    this.loadRandom = this.loadRandom.bind(this);
    this.prevQueries = this.prevQueries.bind(this);
  }

  componentWillMount() {
    this.prevQueries();
    if (!this.didRandom) {
      this.loadRandom();
      this.didRandom = true;
    } else {
      this.loadMosaic(this.state.mostRecentQuery);
      console.log('current pics: ', this.state.pics);
    }
  }

  // componentDidMount() {
  //   this.loadMosaic(this.state.mostRecentQuery);
  //   this.prevQueries();
  // }

  loadRandom() {
    $.ajax({
      method: 'get',
      url: '/mosaic',
      data: { query: '' },
      success: (data) => {
        console.log('success from loadmosaic');
        this.setState({
          pics: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  prevQueries() {
    $.ajax({
      method: 'get',
      url: '/prev',
      success: (data) => {
        console.log('success from loadprevious');
        this.setState({
          prevQueries: data
        })
        console.log(this.state.prevQueries);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  search(query) {
    console.log('hey from search index', query);
    $.ajax({
      method: 'post',
      url: '/query', 
      data: { query: query },
      success: (data) => {
        console.log('success from SEARCH ajax!');
        this.setState({
          mostRecentQuery: query
        })
        this.loadMosaic(query);
      },
      error: (err) => {
        console.log('err', err);
      }
    })

  }

  loadMosaic(query) {
    $.ajax({
      method: 'get',
      url: '/mosaic',
      data: { query: query },
      success: (data) => {
        console.log('success from loadmosaic');
        this.setState({
          pics: data
        })
        console.log(this.state.pics);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  clearMosaic() {
    this.setState({
      pics: []
    });
  }

  render () {
    return (<div>
      <h1>Mozaik</h1>
      <Search onSearch={this.search} onClear={this.clearMosaic} onRandom={this.loadRandom}/>
      <Previous queries={this.state.prevQueries} onPrev={this.loadMosaic}/>
      <br></br>
      <List pics={this.state.pics}/>
      <div className="footer">Powered by <a href="http://www.unsplash.com" target="_blank">Unsplash</a></div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

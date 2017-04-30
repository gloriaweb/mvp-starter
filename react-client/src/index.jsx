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
    // if (!this.didRandom) {
    //   this.loadRandom();
    //   this.didRandom = true;
    // } else {
    // }
  }

  focusSingle() {
    //when image is clicked load only that image into the view
  }

  loadRandom() {
    $.ajax({
      method: 'get',
      url: '/mosaic',
      data: { query: '' },
      success: (data) => {
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
        this.setState({
          prevQueries: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  wasSearched(query) {
    var prev = this.state.prevQueries;
    var result = false;
    prev.forEach((q) => {
      if (query === q) {
        result = true;
      }
    })
    return result;
  }

  search(query) {
    if (this.wasSearched(query)) {
      this.loadMosaic(query)
    } else {
      $.ajax({
        method: 'post',
        url: '/query', 
        data: { query: query },
        success: (data) => {
          this.setState({
            mostRecentQuery: query
          })
          this.prevQueries();
          this.loadMosaic(query);
        },
        error: (err) => {
          console.log('err', err);
        }
      })

    }
  }

  loadMosaic(query) {
    $.ajax({
      method: 'get',
      url: '/mosaic',
      data: { query: query },
      success: (data) => {
        this.setState({
          pics: data
        })
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

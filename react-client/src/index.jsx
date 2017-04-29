import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      pics: []
    }
    this.search = this.search.bind(this);
    this.loadMosaic = this.loadMosaic.bind(this);
  }

  componentDidMount() {
    this.loadMosaic();
  }

  // loadRandom() {
  //   $.ajax({
  //     url: '/random', 
  //     success: (data) => {
  //       this.setState({
  //         items: data
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  search(query) {
    console.log('hey from search index', query);
    $.ajax({
      method: 'post',
      url: '/query', 
      data: { query: query },
      success: (data) => {
        console.log('success from SEARCH ajax!');
        this.setState({
          pics: data
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    })
    .then(() => {
      console.log(this.state.pics);
      this.loadMosaic(query);
    })

  }

  loadMosaic() {
    $.ajax({
      method: 'get',
      url: '/mosaic',
      // data: { query: query },
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

  render () {
    return (<div>
      <h1>Mozaik</h1>
      <d>Powered by <a href="http://www.unsplash.com" target="_blank">Unsplash</a></d>
      <Search onSearch={this.search}/>
      <List pics={this.state.pics}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
import React, { Component } from 'react';
import './App.css';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';



const axios = require('axios').default;




class App extends Component {

  constructor() {
    super();
    this.state = {
      companies:[]
    }
  }

  getCompanies(query) {

    if(query === "") {
      return
    }
    this.setState({companies:[]})
    axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords: query,
        apikey: 'D464SKW8GRUMUSNI'
      }
    })
      .then(response => response.data)
      .then(data => data.bestMatches)
      .then(matches => matches.forEach(match => {
        this.state.companies.push(match['1. symbol'] + " - " + match['2. name']);
        console.log(this.state.companies)
      }))
      .catch(error => console.log(error));
  }

  render(){
    return (
  
      <div className="App">
        <Autocomplete
          id="company-search"
          onInputChange={(event, value) => this.getCompanies(value)}
          options={this.state.companies}
          freeSolo={true}
          style={{ width: '400px' ,minWidth: '300px', maxWidth: '80%' }}
          renderInput={(params) => <TextField {...params} label="Empresas" variant="outlined" />}
        />
  
  
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {getPersons} from './services/personService';
import Filter from './components/Filter';
import BlackList from './components/BlackList';
import BlackCard from './components/BlackCard';
import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: this.getSavedData()
    };
    this.getQuery = this.getQuery.bind(this);

  }

  getQuery(e) {
    const userQuery = e.currentTarget.value;
    this.setState({
      query: userQuery
    });
  }

  filterThis(){
    const filteredResults = this.state.results.filter(item => {
      const fullName = `${item.name.first} ${item.name.last}`;
      if (this.state.query === '' || fullName.toLocaleLowerCase().includes(this.state.query.toLocaleLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    return filteredResults;
  }

  getSavedData() {
    const blackData = localStorage.getItem('blackData');

    if (blackData !== null) {
      return JSON.parse(blackData);
    } else {
      this.getBlackCriaturas();
      return [];
    }
  }

  saveData(data) {
    localStorage.setItem('blackData', JSON.stringify(data));
  }

  getBlackCriaturas() {
    getPersons()
      .then(data => {

        const cleanData = data.results.map((item, index) => { return {...item,id:index}});

        this.setState({
          results: cleanData
        });
        this.saveData(cleanData);
      });
  }

  render() {
    const blackResults = this.filterThis();
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">Lista negra de empleados <span role="img" aria-label="GRRR">😡</span></h1>

          <Filter keyupAction={this.getQuery} />

        </header>

        <main className="app__main">

          <BlackCard blackResults={blackResults} blackId={1} />

          <BlackList blackResults={blackResults} />

        </main>
      </div>
    );
  }
}

export default App;

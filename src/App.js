import React, { Component } from 'react';
import {getPersons} from './services/personService';
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
      if (fullName.toLocaleLowerCase().includes(this.state.query.toLocaleLowerCase())) {
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
          <div className="app__filter">
            <div className="app__filter-item">
              <input type="text" className="app__filter-full-name" placeholder="Busca a los culpables 💀" onKeyUp={this.getQuery} />
            </div>
          </div>
        </header>

        <main className="app__main">
          <ul className="app__list">
            {blackResults.map(item => {
              return (
                <li className="app__list-item" id={item.id} key={item.id}>
                  <div className="person">
                    <h2 className="person__name">{`${item.name.first} ${item.name.last}`}</h2>
                    <img src={item.picture.medium} alt={`${item.first} ${item.last}`} className="person__image"/>
                    <div className="person__age">{item.dob.age}</div>
                    <div className="person__city">{item.location.city}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </main>
      </div>
    );
  }
}

export default App;

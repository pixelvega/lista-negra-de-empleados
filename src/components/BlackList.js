import React, {Component} from "react";
import BlackCriatura from './BlackCriatura';
import PropTypes from 'prop-types';

class BlackList extends Component {
  render() {
    const {blackResults} = this.props;
    return (
      <ul className="app__list">
        {blackResults.map(item => {
          return (
            <li className="app__list-item" id={item.id} key={item.id}>

              <BlackCriatura
                fullName={`${item.name.first} ${item.name.last}`}
                image={item.picture.medium}
                age={item.dob.age}
                city={item.location.city}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

BlackList.propTypes = {
  blackResults: PropTypes.arrayOf(PropTypes.object)
};

export default BlackList;
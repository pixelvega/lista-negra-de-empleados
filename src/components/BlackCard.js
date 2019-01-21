import React, {Component} from "react";
import NoBlackData from './NoBlackData';
import PropTypes from 'prop-types';

class BlackCard extends Component {
  render() {

    const {blackResults, blackId} = this.props;
    
    if (blackResults.length === 0 || blackId >= blackResults.length) {
      return <NoBlackData />;
    } else {
      const selectedCriatura = blackResults[blackId];
      const fullName = `${selectedCriatura.name.first} ${selectedCriatura.name.last}`;
      const image = selectedCriatura.picture.large;
      const age = selectedCriatura.dob.age;
      const city = selectedCriatura.location.city;
      return (
        <div className="person person--detail">
          <img src={image} alt={fullName} className="person__image"/>
          <h2 className="person__name">{fullName}</h2>
          <div className="person__age">{age}</div>
          <div className="person__city">{city}</div>
        </div>
      );
    }
  }
}

BlackCard.propTypes = {
  blackResults: PropTypes.arrayOf(PropTypes.object),
  blackId: PropTypes.number.isRequired
};


export default BlackCard;
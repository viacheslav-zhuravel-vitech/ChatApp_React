import React, { useContext } from 'react';
import selectedGirl from '../../../assets/IMG/selected_girl.svg';
import { UserContext } from '../../../context/UserContext';

const OpponentInformation = () => {
  const userContext = useContext(UserContext);
  return (
    <div className="selected_user_wrapper">
      <div className="selected_user_avatar_wrapper">
        <img alt="selected user avatar" className="selected_user_avatar" src={selectedGirl} />
        <div className="user_text">
          <span>{userContext.currentOpponent.name}</span>
          <span>New York, USA</span>
        </div>
      </div>
      <div className="info_section">
        <div className="user_text">
          <span>Nickname</span> <br />
          <span>{userContext.currentOpponent.name}</span>
        </div>
        <div className="user_text">
          <span>Email</span> <br />
          <span>{userContext.currentOpponent.email}</span>
        </div>
        <div className="user_text">
          <span>Phone number</span> <br />
          <span>(805) 651-9088</span>
        </div>
      </div>
      <div className="info_section">
        <div className="user_text">
          <span>Date of birth</span> <br />
          <span>January 20, 1990</span>
        </div>
        <div className="user_text">
          <span>Gender</span> <br />
          <span>Female</span>
        </div>
        <div className="user_text">
          <span>Languages</span> <br />
          <span>English, French</span>
        </div>
        <span className="full_profile">Show full profile</span>
      </div>
    </div>
  );
};

export default OpponentInformation;

import React, { useContext } from 'react';
import menUser from '../../../assets/IMG/men_user.svg';
import { UserContext } from '../../../context/UserContext';

const RegisteredUsers = () => {
  const userContext = useContext(UserContext);

  return userContext.allUsers
    .filter((user) => user.id !== userContext.user.id)
    .map((user) => {
      return (
        <div
          className="chat_item"
          key={user.id}
          onClick={() => userContext.createConversation(userContext.user.id, user.id)}
        >
          <div className="user_icon">
            <img alt="user icon" src={menUser} />
            <div className="status do_not_disturb" />
          </div>
          <div className="massage_description">
            <div className="message_text">
              <span className="name">{user.name}</span>
              <span className="short_message">{user.email}</span>
            </div>
            <div className="message_settings">
              <button />
              <span>12:40pm</span>
            </div>
          </div>
        </div>
      );
    });
};

export default RegisteredUsers;

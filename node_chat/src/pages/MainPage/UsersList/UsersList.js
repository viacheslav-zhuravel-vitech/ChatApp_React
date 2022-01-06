import menUser from '../../../assets/IMG/men_user.svg';
import { UserContext } from '../../../context/UserContext';
import React, { useContext, useState } from 'react';
import MockedUsers from './MockedUsers';
import ActiveConversation from './ActiveConversation';

const UsersList = () => {
  const userContext = useContext(UserContext);

  const [selectedList, setSelectedList] = useState('MOCKED');

  const getUserList = () => {
    switch (selectedList) {
      case 'MOCKED':
        return <MockedUsers />;
      case 'USERS':
        return userContext.allUsers.map((user) => {
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
      case 'ACTIVE':
        return <ActiveConversation />;
      default:
        return <ActiveConversation />;
    }
  };

  return (
    <div className="chat_item_wrapper">
      <div className="search_wrapper">
        <div className="title">
          <span>List of users</span>
          <button />
        </div>
        <div className="search_navigation">
          <div
            className={`navigation_items ${selectedList === 'MOCKED' ? 'navigation_items_active' : ''}`}
            onClick={() => setSelectedList('MOCKED')}
          >
            Mocked
          </div>
          <div
            className={`navigation_items ${selectedList === 'USERS' ? 'navigation_items_active' : ''}`}
            onClick={() => setSelectedList('USERS')}
          >
            Users
          </div>
          <div
            className={`navigation_items ${selectedList === 'ACTIVE' ? 'navigation_items_active' : ''}`}
            onClick={() => setSelectedList('ACTIVE')}
          >
            Active conversation
          </div>
        </div>
      </div>
      {getUserList()}
    </div>
  );
};

export default UsersList;

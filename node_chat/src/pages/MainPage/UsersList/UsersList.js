import React, { useContext } from 'react';
import MockedUsers from './MockedUsers';
import ActiveConversation from './ActiveConversation';
import RegisteredUsers from './RegisteredUsers';
import { UserContext } from '../../../context/UserContext';

const UsersList = () => {
  const userContext = useContext(UserContext);

  const getUserList = () => {
    switch (userContext.selectedList) {
      case 'MOCKED':
        return <MockedUsers />;
      case 'USERS':
        return <RegisteredUsers />;
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
            className={`navigation_items ${userContext.selectedList === 'MOCKED' ? 'navigation_items_active' : ''}`}
            onClick={() => userContext.setSelectedList('MOCKED')}
          >
            Mocked
          </div>
          <div
            className={`navigation_items ${userContext.selectedList === 'USERS' ? 'navigation_items_active' : ''}`}
            onClick={() => {
              userContext.getAllUsers();
              userContext.setSelectedList('USERS');
            }}
          >
            Users
          </div>
          <div
            className={`navigation_items ${userContext.selectedList === 'ACTIVE' ? 'navigation_items_active' : ''}`}
            onClick={() => {
              userContext.getActiveConversation();
              userContext.setSelectedList('ACTIVE');
            }}
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

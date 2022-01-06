import menUser from '../../../assets/IMG/men_user.svg';
import { UserContext } from '../../../context/UserContext';
import React, { useContext } from 'react';

const ActiveConversation = () => {
  const userContext = useContext(UserContext);
  return userContext.listOfConversations.map((conversation) => {
    const opponentId = conversation.members.filter((user) => user !== userContext.user.id)[0];
    const opponent = userContext.allUsers.filter((user) => user.id === opponentId)[0];
    return (
      <div
        className={`chat_item ${conversation._id === userContext.currentChatId && 'chat_item_selected'}`}
        key={opponent?.id}
        onClick={() => userContext.updateCurrentChat(conversation._id)}
      >
        <div className="user_icon">
          <img alt="user icon" src={menUser} />
          <div className="status do_not_disturb" />
        </div>
        <div className="massage_description">
          <div className="message_text">
            <span className="name">{opponent?.name}</span>
            <span className="short_message">{opponent?.email}</span>
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

export default ActiveConversation;

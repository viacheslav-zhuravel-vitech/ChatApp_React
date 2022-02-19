import React, { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';

const TeamList = () => {
  const userContext = useContext(UserContext);
  const [showNewChatroomInput, setShowNewChatroomInput] = useState(false);
  const [newChatroomName, setNewChatroomName] = useState('');

  const handleChangeChatroomName = (e) => {
    const { value } = e.target;
    setNewChatroomName(value);
  };

  return (
    <div className="teams_list">
      <div className="teams_wrapper">
        <div className="title">
          <span>Teams</span>
          <button />
        </div>
        <div className="channels_item_wrapper channels_item_wrapper_active ">
          <span>#designers</span>
          <div className="counter">7</div>
        </div>
        <div className="channels_item_wrapper">
          <span>#programmers</span>
          <div className="counter">10</div>
        </div>
        <div className="channels_item_wrapper">
          <span>#marceters</span>
          <div className="counter">15</div>
        </div>
        <div className="channels_item_wrapper">
          <span>#copyrighters</span>
          <div className="counter">8</div>
        </div>
        <div className="channels_item_wrapper">
          <span>#managers</span>
          <div className="counter">5</div>
        </div>
      </div>
      <div className="group_channels_wrapper">
        <div className="title">
          <span>Group channels</span>
          <button onClick={() => setShowNewChatroomInput(!showNewChatroomInput)} />
        </div>
        {showNewChatroomInput && (
          <div className="input_wrapper">
            <textarea placeholder="Chatroom name" value={newChatroomName} onChange={handleChangeChatroomName} />
            <button
              onClick={() => {
                userContext.createNewChatRoom(newChatroomName);
                setShowNewChatroomInput(false);
              }}
            >
              CREATE
            </button>
          </div>
        )}
        {userContext?.listOfChatroom?.map((chatroom) => {
          return (
            <div
              key={chatroom._id}
              className={`channels_item_wrapper ${
                userContext.currentChatId === chatroom._id ? 'channels_item_wrapper_active' : null
              }`}
              onClick={() => {
                userContext.updateCurrentChat(chatroom._id);
                userContext.setCurrentOpponent(null);
              }}
            >
              <span>#{chatroom.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamList;

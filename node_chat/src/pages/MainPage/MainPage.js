import React, { useContext, useEffect, useRef, useState } from 'react';
import './normalize.css';
import './style.css';
import star from '../../assets/IMG/star.svg';
import bell from '../../assets/IMG/bell.svg';
import answer from '../../assets/IMG/answer.svg';
import lifebuoy from '../../assets/IMG/lifebuoy.svg';
import girlUser from '../../assets/IMG/girl_user.svg';
import selectedGirl from '../../assets/IMG/selected_girl.svg';
import menUser from '../../assets/IMG/men_user.svg';
import room from '../../assets/IMG/room.jpg';
import { UserContext } from '../../context/UserContext';
import UsersList from './UsersList/UsersList';
import OpponentInformation from './OpponentInformation/OpponentInformation';
import TeamList from './TeamList/TeamList';

const MainPage = () => {
  const userContext = useContext(UserContext);
  const messagesEndRef = useRef(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [userContext.messages]);

  const handleChange = (e) => {
    const { value } = e.target;
    setNewMessage(value);
  };

  return (
    <>
      <header>
        <nav>
          <a className="navigation_items">All Projects</a>
          <a className="navigation_items">My projects</a>
          <a className="navigation_items">Teams</a>
          <a className="navigation_items navigation_items_active">Messages</a>
          <a className="navigation_items">Statistics</a>
          <a className="navigation_items">Search</a>
        </nav>
        <div className="notification_wrapper">
          <div className="icons_wrapper">
            <div className="icon_wrapper">
              <img alt="notification icon" className="icon" src={star} />
              <div className="counter" />
            </div>
            <div className="icon_wrapper">
              <img alt="notification icon" className="icon" src={bell} />
              <div className="counter" />
            </div>
            <div className="icon_wrapper">
              <img alt="notification icon" className="icon" src={answer} />
            </div>
            <div className="icon_wrapper">
              <img alt="notification icon" className="icon" src={lifebuoy} />
            </div>
          </div>
          <div className="user_wrapper">
            <span>{userContext?.user?.name}</span>
            <img alt="logined user" className="logined_user" src={girlUser} />
          </div>
        </div>
      </header>
      <main>
        <TeamList />
        <div className="chat_list">
          <UsersList />
        </div>
        {userContext.currentOpponent && <OpponentInformation />}
        <div className="chat">
          <div className="message_wrapper">
            {userContext.currentChatId ? (
              <>
                {userContext.messages.map((mes, index) => {
                  const messageClassName =
                    userContext.user.name === mes.name ? 'message_item' : 'message_item opponent';
                  return (
                    <div
                      ref={userContext.messages.length - 1 === index ? messagesEndRef : null}
                      key={`${index}_mess`}
                      className={messageClassName}
                    >
                      <div className="text_wrapper">
                        <div className="user_icon">
                          <img alt="user icon" src={menUser} />
                        </div>
                        <span className="text">
                          {mes.name} : {mes.message}
                        </span>
                      </div>
                      <span className="time">14:30 pm</span>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="message_item">
                  <div className="text_wrapper">
                    <div className="user_icon">
                      <img alt="user icon" src={menUser} />
                    </div>
                    <span className="text">Maybe you already have additional info?</span>
                  </div>
                  <span className="time">14:30 pm</span>
                </div>
                <div className="message_item">
                  <div className="text_wrapper">
                    <div className="user_icon">
                      <img alt="user icon" src={menUser} />
                    </div>
                    <span className="text">
                      It is to early to provide some kind of estimation here. We need user stories
                    </span>
                  </div>
                  <span className="time">14:20 pm</span>
                </div>
                <div className="message_item opponent">
                  <div className="text_wrapper">
                    <div className="user_icon">
                      <img alt="user icon" src={menUser} />
                    </div>
                    <span className="text">
                      We are just writing up the user stories now so will have requirements for you next week
                    </span>
                  </div>
                  <span className="time">14:05 pm</span>
                </div>
                <div className="message_item opponent">
                  <div className="text_wrapper big_text_wrapper">
                    <div className="user_icon">
                      <img alt="user icon" src={menUser} />
                    </div>
                    <span className="text">
                      Essentially the brief is for you guys to build an iOS and android app. We will do backend and web
                      app. We have a version one mockup of the UI, please see it attached. As mentioned before, we would
                      simply hand you all the assets for the UI and you guys code. If you have any early questions
                      please do send them on to myself. Ill be in touch in coming days when we have requirements
                      prepared.
                    </span>
                  </div>
                  <span className="time">12:00 pm</span>
                </div>
                <div className="message_item opponent">
                  <div className="text_wrapper text_wrapper_data">
                    <div className="user_icon">
                      <img alt="user icon" src={menUser} />
                    </div>
                    <div className="content">
                      <img alt="preview" src={room} width="114px" height="84px" />
                      <div className="description">
                        <span>Big room.jpg</span>
                        <a>Download</a>
                      </div>
                      <button />
                    </div>
                  </div>
                  <span className="time time_wrapper_data">11:22 pm</span>
                </div>
              </>
            )}
          </div>
          <div className="input_wrapper">
            <input type="file" id="input_file" />
            <label htmlFor="input_file" />
            <textarea placeholder="Type your message..." value={newMessage} onChange={handleChange} />
            <button
              onClick={() => {
                userContext.sendMessage(newMessage);
                setNewMessage('');
              }}
            >
              SEND
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPage;

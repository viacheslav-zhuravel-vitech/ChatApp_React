import React from 'react';
import menUser from '../../../assets/IMG/men_user.svg';
import selectedGirl from '../../../assets/IMG/selected_girl.svg';

const MockedUsers = () => {
  return (
    <>
      <div className="chat_item  first">
        <div className="user_icon">
          <img alt="user icon" src={menUser} />
          <div className="status" />
        </div>
        <div className="massage_description">
          <div className="message_text">
            <span className="name">Matt Tompson</span>
            <span className="short_message">I send you a few files for works...</span>
          </div>
          <div className="message_settings">
            <button />
            <span>18:00pm</span>
          </div>
        </div>
      </div>
      <div className="chat_item">
        <div className="user_icon">
          <img alt="user icon" src={menUser} />
          <div className="status offline" />
        </div>
        <div className="massage_description">
          <div className="message_text">
            <span className="name">Aaron Walker</span>
            <span className="short_message">Write me about a project...</span>
          </div>
          <div className="message_settings">
            <button />
            <span>15:10pm</span>
          </div>
        </div>
      </div>
      <div className="chat_item chat_item_selected">
        <div className="user_icon">
          <img alt="user icon" src={selectedGirl} />
          <div className="status" />
        </div>
        <div className="massage_description">
          <div className="message_text">
            <span className="name">Rachel Curtis</span>
            <span className="short_message">Thanks friend! I'm working now...</span>
          </div>
          <div className="message_settings">
            <button />
            <span>14:20pm</span>
          </div>
        </div>
      </div>
      <div className="chat_item">
        <div className="user_icon">
          <img alt="user icon" src={menUser} />
          <div className="status" />
        </div>
        <div className="massage_description">
          <div className="message_text">
            <span className="name">Stephanie Bailey</span>
            <span className="short_message">Hey. I send a files today...</span>
          </div>
          <div className="message_settings">
            <button />
            <span>14:05pm</span>
          </div>
        </div>
      </div>
      <div className="chat_item">
        <div className="user_icon">
          <img alt="user icon" src={menUser} />
          <div className="status do_not_disturb" />
        </div>
        <div className="massage_description">
          <div className="message_text">
            <span className="name">Amy Matthews</span>
            <span className="short_message">Maybe you already have add...</span>
          </div>
          <div className="message_settings">
            <button />
            <span>13:10pm</span>
          </div>
        </div>
      </div>
      <div className="chat_item">
        <div className="user_icon">
          <img alt="user icon" src={menUser} />
          <div className="status do_not_disturb" />
        </div>
        <div className="massage_description">
          <div className="message_text">
            <span className="name">Helen Newman</span>
            <span className="short_message">We are just writing up the user...</span>
          </div>
          <div className="message_settings">
            <button />
            <span>12:40pm</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MockedUsers;

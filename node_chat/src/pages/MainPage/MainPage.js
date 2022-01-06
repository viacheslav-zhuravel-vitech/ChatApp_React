import React, {useContext, useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router-dom';
import './normalize.css'
import './style.css'
import star from '../../assets/IMG/star.svg'
import bell from '../../assets/IMG/bell.svg'
import answer from '../../assets/IMG/answer.svg'
import lifebuoy from '../../assets/IMG/lifebuoy.svg'
import girlUser from '../../assets/IMG/girl_user.svg'
import selectedGirl from '../../assets/IMG/selected_girl.svg'
import menUser from '../../assets/IMG/men_user.svg'
import room from '../../assets/IMG/room.jpg'
import {UserContext} from "../../context/UserContext";

const MainPage = () => {
    const token = sessionStorage.getItem("chatToken");
    const history = useHistory();
    const userContext = useContext(UserContext);
    const messagesEndRef = useRef(null);

    const [newMessage, setNewMessage] = useState('');
    const [showNewChatroomInput, setShowNewChatroomInput] = useState(false);
    const [newChatroomName, setNewChatroomName] = useState('')

    /*useEffect(() => {
        if (!token) {
            history.push('./login')
        }
    },[token])*/

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    },[userContext.messages]);

    const handleChange = e => {
        const { value } = e.target
        setNewMessage(value);
    }

    const handleChangeChatroomName = e => {
        const { value } = e.target
        setNewChatroomName(value);
    }

    return(
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
                            <img alt="notification icon" className="icon" src={star}/>
                                <div className="counter"/>
                        </div>
                        <div className="icon_wrapper">
                            <img alt="notification icon" className="icon" src={bell}/>
                                <div className="counter"/>
                            </div>
                        <div className="icon_wrapper">
                            <img alt="notification icon" className="icon" src={answer}/>
                        </div>
                        <div className="icon_wrapper">
                            <img alt="notification icon" className="icon" src={lifebuoy}/>
                        </div>
                    </div>
                    <div className="user_wrapper">
                        <span>{userContext?.user?.name}</span>
                        <img alt="logined user picture" className='logined_user' src={girlUser}/>
                    </div>
                </div>
            </header>
            <main>
                <div className="teams_list">
                    <div className="teams_wrapper">
                        <div className="title">
                            <span>Teams</span>
                            <button/>
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
                            <button onClick={() => setShowNewChatroomInput(!showNewChatroomInput)}/>
                        </div>
                        {
                            showNewChatroomInput &&
                            <div className="input_wrapper">
                                <input type="file" id="input_file"/>
                                <textarea
                                  placeholder="Type your new chatroom name"
                                  value={newChatroomName}
                                  onChange={handleChangeChatroomName}
                                />
                                <button onClick={() => {
                                    userContext.createNewChatRoom(newChatroomName);
                                    setShowNewChatroomInput(false);
                                }}>
                                    SEND
                                </button>
                            </div>
                        }
                        {
                            userContext?.listOfChatroom?.map((chatroom => {
                                return(
                                  <div
                                    key={chatroom._id}
                                    className={`channels_item_wrapper ${(userContext.currentChatId === chatroom._id)? 'channels_item_wrapper_active' : null  }`}
                                    onClick={() => userContext.updateCurrentChat(chatroom._id)}
                                  >
                                      <span>#{chatroom.name}</span>
                                  </div>
                                )
                            }))
                        }
                    </div>
                </div>
                <div className="chat_list">
                    <div className="chat_item_wrapper">
                        <div className="search_wrapper">
                            <div className="title">
                                <span>List of designers</span>
                                <button/>
                            </div>
                            <div className="search_navigation">
                                <a className="navigation_items navigation_items_active">All messages</a>
                                <a className="navigation_items">Unread</a>
                                <a className="navigation_items">Important</a>
                            </div>
                        </div>
                        <div className="chat_item  first">
                            <div className="user_icon">
                                <img alt="user icon" src={menUser}/>
                                    <div className="status"/>
                            </div>
                            <div className="massage_description">
                                <div className="message_text">
                                    <span className="name">Matt Tompson</span>
                                    <span className="short_message">I send you a few files for works...</span>
                                </div>
                                <div className="message_settings">
                                    <button/>
                                    <span>18:00pm</span>
                                </div>
                            </div>
                        </div>
                        <div className="chat_item">
                            <div className="user_icon">
                                <img alt="user icon" src={menUser}/>
                                    <div className="status offline"/>
                            </div>
                            <div className="massage_description">
                                <div className="message_text">
                                    <span className="name">Aaron Walker</span>
                                    <span className="short_message">Write me about a project...</span>
                                </div>
                                <div className="message_settings">
                                    <button/>
                                    <span>15:10pm</span>
                                </div>
                            </div>
                        </div>
                        <div className="chat_item chat_item_selected">
                            <div className="user_icon">
                                <img alt="user icon" src={selectedGirl}/>
                                    <div className="status"/>
                            </div>
                            <div className="massage_description">
                                <div className="message_text">
                                    <span className="name">Rachel Curtis</span>
                                    <span className="short_message">Thanks friend! I'm working now...</span>
                                </div>
                                <div className="message_settings">
                                    <button/>
                                    <span>14:20pm</span>
                                </div>
                            </div>
                        </div>
                        <div className="chat_item">
                            <div className="user_icon">
                                <img alt="user icon" src={menUser}/>
                                    <div className="status"/>
                            </div>
                            <div className="massage_description">
                                <div className="message_text">
                                    <span className="name">Stephanie Bailey</span>
                                    <span className="short_message">Hey. I send a files today...</span>
                                </div>
                                <div className="message_settings">
                                    <button/>
                                    <span>14:05pm</span>
                                </div>
                            </div>
                        </div>
                        <div className="chat_item">
                            <div className="user_icon">
                                <img alt="user icon" src={menUser}/>
                                    <div className="status do_not_disturb"/>
                            </div>
                            <div className="massage_description">
                                <div className="message_text">
                                    <span className="name">Amy Matthews</span>
                                    <span className="short_message">Maybe you already have add...</span>
                                </div>
                                <div className="message_settings">
                                    <button/>
                                    <span>13:10pm</span>
                                </div>
                            </div>
                        </div>
                        <div className="chat_item">
                            <div className="user_icon">
                                <img alt="user icon" src={menUser}/>
                                    <div className="status do_not_disturb"/>
                            </div>
                            <div className="massage_description">
                                <div className="message_text">
                                    <span className="name">Helen Newman</span>
                                    <span className="short_message">We are just writing up the user...</span>
                                </div>
                                <div className="message_settings">
                                    <button/>
                                    <span>12:40pm</span>
                                </div>
                            </div>
                        </div>
                        {
                            userContext.allUsers.map(user => {
                                return(
                                  <div className="chat_item" key={user.id}>
                                      <div className="user_icon">
                                          <img alt="user icon" src={menUser}/>
                                          <div className="status do_not_disturb"/>
                                      </div>
                                      <div className="massage_description">
                                          <div className="message_text">
                                              <span className="name">{user.name}</span>
                                              <span className="short_message">{user.email}</span>
                                          </div>
                                          <div className="message_settings">
                                              <button/>
                                              <span>12:40pm</span>
                                          </div>
                                      </div>
                                  </div>
                                )
                            })
                        }
                    </div>
                    <div className="selected_user_wrapper">
                        <div className="selected_user_avatar_wrapper">
                            <img alt="selected user avatar" className="selected_user_avatar"
                                 src={selectedGirl}/>
                                <div className="user_text">
                                    <span>Rachel Curtis</span>
                                    <span>New York, USA</span>
                                </div>
                        </div>
                        <div className="info_section">
                            <div className="user_text">
                                <span>Nickname</span> <br/>
                                <span>Silentgirl</span>
                            </div>
                            <div className="user_text">
                                <span>Email</span> <br/>
                                <span>rachelcurtis@itzpromo.com</span>
                            </div>
                            <div className="user_text">
                                <span>Phone number</span> <br/>
                                <span>(805) 651-9088</span>
                            </div>
                        </div>
                        <div className="info_section">
                            <div className="user_text">
                                <span>Date of birth</span> <br/>
                                <span>January 20, 1990</span>
                            </div>
                            <div className="user_text">
                                <span>Gender</span> <br/>
                                <span>Female</span>
                            </div>
                            <div className="user_text">
                                <span>Languages</span> <br/>
                                <span>English, French</span>
                            </div>
                            <span className="full_profile">Show full profile</span>
                        </div>
                    </div>
                </div>
                <div className="chat">
                    <div className="message_wrapper">
                        {userContext.currentChatId ?
                          <>
                              {userContext.messages.map((mes, index) => {
                                  const messageClassName = userContext.user.name === mes.name ? "message_item" : "message_item opponent"
                                  return (
                                    <div ref={userContext.messages.length -1 === index ? messagesEndRef : null} key={`${index}_mess`} className={messageClassName}>
                                        <div className="text_wrapper">
                                            <div className="user_icon">
                                                <img alt="user icon" src={menUser}/>
                                            </div>
                                            <span className="text">{mes.name} : {mes.message}</span>
                                        </div>
                                        <span className="time">14:30 pm</span>
                                    </div>
                                  )
                              } )}
                          </>
                          :
                            <>
                                <div className="message_item">
                                    <div className="text_wrapper">
                                        <div className="user_icon">
                                            <img alt="user icon" src={menUser}/>
                                        </div>
                                        <span className="text">Maybe you already have additional info?</span>
                                    </div>
                                    <span className="time">14:30 pm</span>
                                </div>
                                <div className="message_item">
                                    <div className="text_wrapper">
                                        <div className="user_icon">
                                            <img alt="user icon" src={menUser}/>
                                        </div>
                                        <span className="text">It is to early to provide some kind of estimation here. We need user stories</span>
                                    </div>
                                    <span className="time">14:20 pm</span>
                                </div>
                                <div className="message_item opponent">
                                    <div className="text_wrapper">
                                        <div className="user_icon">
                                            <img alt="user icon" src={menUser}/>
                                        </div>
                                        <span className="text">We are just writing up the user stories now so will have requirements for you next week</span>
                                    </div>
                                    <span className="time">14:05 pm</span>
                                </div>
                                <div className="message_item opponent">
                                    <div className="text_wrapper big_text_wrapper">
                                        <div className="user_icon">
                                            <img alt="user icon" src={menUser}/>
                                        </div>
                                        <span className="text">
                                            Essentially the brief is for you guys to build an iOS and android app.
                                            We will do backend and web app. We have a version one mockup of the UI, please see it attached.
                                            As mentioned before, we would simply hand you all the assets for the UI and you guys
                                            code. If you have any early questions please do send them on to myself.
                                            Ill be in touch in coming days when we have requirements prepared.
                                        </span>
                                    </div>
                                    <span className="time">12:00 pm</span>
                                </div>
                                <div className="message_item opponent">
                                    <div className="text_wrapper text_wrapper_data">
                                        <div className="user_icon">
                                            <img alt="user icon" src={menUser}/>
                                        </div>
                                        <div className="content">
                                            <img alt="image preview" src={room} width="114px" height="84px"/>
                                            <div className="description">
                                                <span>Big room.jpg</span>
                                                <a>Download</a>
                                            </div>
                                            <button/>
                                        </div>
                                    </div>
                                    <span className="time time_wrapper_data">11:22 pm</span>
                                </div>
                            </>
                        }


                    </div>
                    <div className="input_wrapper">
                        <input type="file" id="input_file"/>
                        <label htmlFor="input_file"/>
                        <textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={handleChange}
                        />
                        <button onClick={() => {
                            userContext.sendMessage(newMessage);
                            setNewMessage('')
                        }}>
                            SEND
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default MainPage
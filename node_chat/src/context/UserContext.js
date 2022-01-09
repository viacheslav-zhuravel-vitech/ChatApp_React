import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const token = sessionStorage.getItem('chatToken');

  const [user, setUser] = useState(null);
  const [listOfChatroom, setListOfChatroom] = useState([]);
  const [listOfConversations, setListOfConversations] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUser] = useState([]);
  const [selectedList, setSelectedList] = useState('MOCKED');

  const setupSocket = () => {
    if (user?.token && !socket) {
      const newSocket = io('http://localhost:8000', {
        headers: {
          Authorization: 'Bearer ' + user.token
        },
        query: {
          token: user.token
        }
      });

      newSocket.on('disconnect', () => {
        setSocket(null);
        setTimeout(setSocket, 3000);
        console.log('Socket disconnected');
      });

      newSocket.on('connect', () => {
        console.log('Socket connected');
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    if (token && !user) {
      loginUserByToken(token);
    }
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    if (user?.token) {
      setupSocket();
      getAllChatRoom();
      getAllUsers();
      getActiveConversation();
    }
    // eslint-disable-next-line
  }, [user?.token]);

  useEffect(() => {
    if (currentChatId) {
      socket.on('newMessage', (message) => {
        setMessages([...messages, message]);
      });
      socket.on('oldMessages', ({ messages }) => {
        setMessages([...messages]);
      });
    }
    // eslint-disable-next-line
  }, [currentChatId, messages]);

  const createAndSetCurrentUser = (signUpData) => {
    axios
      .post('http://localhost:8000/user/register', signUpData)
      .then(({ data }) => {
        loginAndSetCurrentUser(signUpData.email, signUpData.password);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const loginAndSetCurrentUser = (email, password) => {
    axios
      .post('http://localhost:8000/user/login', { email, password })
      .then(({ data }) => {
        setUser(data);
        sessionStorage.setItem('chatToken', data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginUserByToken = (sawedToken) => {
    axios
      .post('http://localhost:8000/user/loginByToken', { token: sawedToken })
      .then(({ data }) => {
        setUser(data);
        if (token !== data.token) {
          sessionStorage.setItem('chatToken', data.token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllUsers = () => {
    axios
      .get('http://localhost:8000/user/getAllUsers', {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      })
      .then(({ data }) => {
        setAllUser(data);
      });
  };

  const createNewChatRoom = (name = 'Super Chatroom') => {
    axios
      .post(
        'http://localhost:8000/chatroom',
        { name },
        {
          headers: {
            Authorization: 'Bearer ' + user.token
          }
        }
      )
      .then(({ data }) => {
        setListOfChatroom(data.chatrooms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllChatRoom = () => {
    axios
      .get('http://localhost:8000/chatroom', {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      })
      .then(({ data }) => {
        setListOfChatroom(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createConversation = (currentUserId, opponentUserId) => {
    let listOfOpponentsIds = [];
    listOfConversations.forEach((e) => {
      listOfOpponentsIds.push(...e.members.filter((id) => id !== user.id));
    });

    if (!listOfOpponentsIds.includes(opponentUserId)) {
      axios
        .post(
          'http://localhost:8000/conversation/createConversation',
          { members: [currentUserId, opponentUserId] },
          {
            headers: {
              Authorization: 'Bearer ' + user.token
            }
          }
        )
        .then(({ data }) => {
          setListOfConversations([...listOfConversations, data]);
          setSelectedList('ACTIVE');
          updateCurrentChat(data._id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let conversationWithSelectedUser;
      listOfConversations.forEach((conversation) => {
        if (conversation.members.includes(opponentUserId)) {
          conversationWithSelectedUser = conversation;
        }
      });
      setSelectedList('ACTIVE');
      updateCurrentChat(conversationWithSelectedUser._id);
    }
  };

  const getActiveConversation = () => {
    axios
      .get(`http://localhost:8000/conversation/getActiveConversation/${user.id}`, {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      })
      .then(({ data }) => {
        setListOfConversations(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCurrentChat = (id) => {
    if (socket) {
      socket.emit('leaveRoom', {
        currentChatId
      });
      setMessages([]);
      setCurrentChatId(id);
      socket.emit('joinRoom', {
        id
      });
    }
  };

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('chatroomMessage', {
        currentChatId,
        message
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        listOfChatroom,
        listOfConversations,
        currentChatId,
        socket,
        messages,
        allUsers,
        selectedList,
        createAndSetCurrentUser,
        loginAndSetCurrentUser,
        updateCurrentChat,
        sendMessage,
        createNewChatRoom,
        createConversation,
        getActiveConversation,
        getAllUsers,
        setSelectedList
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

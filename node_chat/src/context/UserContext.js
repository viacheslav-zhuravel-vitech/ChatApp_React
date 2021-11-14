import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {io} from "socket.io-client";

export const UserContext = createContext(null);

const UserProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [listOfChatroom, setListOfChatroom] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const setupSocket = () => {
    if (user?.token && !socket) {
      const newSocket = io("http://localhost:8000", {
        headers: {
          "Authorization": 'Bearer ' + user.token
        },
        query : {
          token: user.token
        }
      })

      newSocket.on('disconnect', ()=> {
        setSocket(null);
        setTimeout(setSocket, 3000);
        console.log('Socket disconnected')
      })

      newSocket.on('connect', () => {
        console.log('Socket connected')
      })

      setSocket(newSocket);
    }
  }

  useEffect(() => {
    setupSocket();
  },[user?.token])

  useEffect(()=> {
    if(user?.token) {
      getAllChatRoom();
    }
  },[user?.token])

  useEffect( () => {
    if(currentChatId) {
      //getMessages(currentChatId);
    }
  },[currentChatId])

  useEffect(() => {
    if(currentChatId) {
      socket.on('newMessage', (message) => {
        setMessages([...messages, message])
      })
    }
  },[currentChatId, messages])


  const createAndSetCurrentUser = (signUpData) => {
    axios.post("http://localhost:8000/user/register",signUpData)
      .then( ({data}) => {
        loginAndSetCurrentUser(signUpData.email, signUpData.password);
        console.log(data.message);
      })
      .catch (err => {
        console.log(err.response.data.message);
      })
  }

  const loginAndSetCurrentUser = (email, password) => {
    axios.post("http://localhost:8000/user/login",{email, password})
      .then( ({data}) => {
        setUser(data);
        localStorage.setItem("chatToken", data.token)
        alert(data.message);
      })
      .catch (err => {
        console.log(err.response.data.message);
      })
  }

  const createNewChatRoom = (name) => {
    axios.post("http://localhost:8000/chatroom", name)
      .then( ({data}) => {

      })
      .catch (err => {
        alert(err.response.data.message);
      })
  }

  const getAllChatRoom = () => {
    axios.get("http://localhost:8000/chatroom", {
      headers: {
        "Authorization": 'Bearer ' + user.token
      }
    })
      .then( ({data}) => {
        setListOfChatroom(data)
      })
      .catch (err => {
        alert(err.response.data.message);
      })
  }

  const updateCurrentChat = (id) => {
    if (socket) {
      socket.emit('leaveRoom',{
        currentChatId
      })
      setCurrentChatId(id);
      socket.emit('joinRoom', {
        id
      })
    }
  }

  const sendMessage = (message) => {
    if(socket) {
      socket.emit('chatroomMessage', {
        currentChatId,
        message
      })
    }
  }

  return(
    <UserContext.Provider
      value={{
        user,
        listOfChatroom,
        currentChatId,
        socket,
        messages,
        createAndSetCurrentUser,
        loginAndSetCurrentUser,
        updateCurrentChat,
        sendMessage
      }}
    >
      {children}
    </UserContext.Provider>

  )

}

export default UserProvider;

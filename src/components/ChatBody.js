import React, { useEffect, useState } from "react";
// Icons
import GifRoundedIcon from "@mui/icons-material/GifRounded";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import "../assets/styles/chat.css";
// Firebase and firestore
import db from "./../firebase";
import firebase from "firebase";

// redux
import { selectUser } from "./../features/userSlice";
import { selectChannelId, selectChannelName } from "./../features/appSlice";
import { selectServer } from "../features/serverSlice";
import { useSelector } from "react-redux";

// Components
import Users from "./Users";
import Message from "./Message";

const ChatBody = ({ usersToggle }) => {
  const currentUser = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const currentServer = useSelector(selectServer);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // Send message Handler
  const checkUserInServer = () => {
    let currentServerRef = db.collection("servers").doc(currentServer.id);
    const users = currentServerRef.collection("users");
    let userExists = false;
    users.get().then((snapshot) => {
      snapshot.docs.forEach((user) => {
        if (user.data().uid === currentUser.uid) {
          userExists = true;
          return;
        }
      });
      if (!userExists) {
        console.log("Inside If", userExists);
        users.add(currentUser);
      }
    });
  };
  const sendMessage = (e) => {
    let currentChannelRef = db
      .collection("servers")
      .doc(currentServer.id)
      .collection("channels")
      .doc(channelId)
      .collection("messages");

    e.preventDefault();

    currentChannelRef.add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: currentUser,
    });
    checkUserInServer();
    setInput("");
  };
  useEffect(() => {
    if (channelId && currentServer) {
      let currentChannelRef = db
        .collection("servers")
        .doc(currentServer.id)
        .collection("channels")
        .doc(channelId)
        .collection("messages");
      currentChannelRef
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId, currentServer]);

  return (
    <div className="container">
      <div className="chat__body">
        <div className="chat__messages">
          {currentServer &&
            messages.map((message, index) => (
              <Message
                key={index}
                timestamp={message.timestamp}
                message={message.message}
                user={message.user}
              />
            ))}
        </div>
        {currentServer && (
          <div className="chat__input">
            <form>
              <input
                disabled={!channelId}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder={`Message # ${
                  channelId ? channelName : "Select a Channel"
                }`}
              />
              <button
                className="chat__input__button"
                type="submit"
                onClick={sendMessage}
              >
                Send Message
              </button>
            </form>
            <div className="chat__input__icons">
              <GifRoundedIcon
                fontSize="large"
                titleAccess="Under Development"
              />
              <InsertEmoticonRoundedIcon
                fontSize="large"
                titleAccess="Under Development"
              />
            </div>
          </div>
        )}
      </div>
      <Users usersToggle={usersToggle} />
    </div>
  );
};

export default ChatBody;

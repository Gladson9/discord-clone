// Icons
import GifRoundedIcon from "@mui/icons-material/GifRounded";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectServer } from "../../features/serverSlice";
// redux
import { selectUser } from "../../features/userSlice";
// Firebase and firestore
import db from "../../firebase";
import "../../assets/styles/chat.css";
import Message from "../Message";
// Components
import Users from "../Users";

const ChatBody = ({ usersToggle, channelName, channelId }) => {
  const currentUser = useSelector(selectUser);
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
    if (input.trim().length !== 0) {
      console.log("Message Added");
      currentChannelRef.add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: currentUser,
      });
    }
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
      currentChannelRef.orderBy("timestamp", "asc").onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map((doc) => console.log(doc.id)));
        return setMessages(
          snapshot.docs.map((doc) => {
            return { id: doc.id, data: doc.data() };
          })
        );
      });
    }
  }, [channelId, currentServer]);

  return (
    <div className="container">
      <div className="chat__body">
        <div className="chat__messages">
          {currentServer ? (
            messages.map((message, index) => (
              <Message
                key={index}
                timestamp={message.data.timestamp}
                message={message.data.message}
                user={message.data.user}
                edited={message.data.edited}
                id={message.id}
              />
            ))
          ) : (
            <h2 className="use__instructions">
              Select a server from the left sidebar to start using.
            </h2>
          )}
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

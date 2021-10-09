import React, { useEffect, useState } from "react";
// Components
import ChatHeader from "./../components/ChatHeader";
import Message from "./../components/Message";

// Styles and Icons
import "../assets/styles/chat.css";
import GifRoundedIcon from "@mui/icons-material/GifRounded";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./../features/appSlice";
import { selectUser } from "./../features/userSlice";
import db from "./../firebase";

import firebase from "firebase";

const Chat = () => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // Send message Handler
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });
    setInput("");
  };

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>
      <div className="chat__input">
        <form>
          <input
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={`Message # ${channelName}`}
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
          <GifRoundedIcon fontSize="large" titleAccess="Under Development" />
          <InsertEmoticonRoundedIcon
            fontSize="large"
            titleAccess="Under Development"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;

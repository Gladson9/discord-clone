import React, { useState } from "react";
// Components
import ChatHeader from "./../components/ChatHeader";

// Styles and Icons
import "../assets/styles/chat.css";
import { useSelector } from "react-redux";
import { selectChannelName } from "./../features/appSlice";
import ChatBody from "../components/ChatBody";

const Chat = () => {
  const [usersToggle, setUsersToggle] = useState("hidden");

  const channelName = useSelector(selectChannelName);

  return (
    <div className="chat">
      <ChatHeader
        channelName={channelName}
        usersToggle={usersToggle}
        setUsersToggle={setUsersToggle}
      />
      <ChatBody usersToggle={usersToggle} />
    </div>
  );
};

export default Chat;

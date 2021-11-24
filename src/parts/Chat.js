import React, { useState } from "react";
import { useSelector } from "react-redux";
// Styles and Icons
import "../assets/styles/chat.css";
import ChatBody from "../components/chat/ChatBody";
// Components
import ChatHeader from "./../components/chat/ChatHeader";
import { selectChannelId, selectChannelName } from "./../features/appSlice";

const Chat = () => {
  const [usersToggle, setUsersToggle] = useState("hidden");
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  // useEffect(() => {}, []);

  return (
    <div className="chat">
      <ChatHeader
        usersToggle={usersToggle}
        setUsersToggle={setUsersToggle}
        channelName={channelName}
      />
      <ChatBody
        usersToggle={usersToggle}
        channelName={channelName}
        channelId={channelId}
      />
    </div>
  );
};

export default Chat;

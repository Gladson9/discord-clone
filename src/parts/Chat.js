import React, { useState } from "react";
// Components
import ChatHeader from "./../components/ChatHeader";

// Styles and Icons
import "../assets/styles/chat.css";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./../features/appSlice";
import ChatBody from "../components/ChatBody";

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

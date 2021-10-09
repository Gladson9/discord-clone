import React from "react";

import "../assets/styles/chatHeader.css";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
const ChatHeader = ({ channelName }) => {
  return (
    <div className="chat__header">
      <div className="chat__header__left">
        <h3>
          <span className="chat__header__hash">#</span>
          {channelName}
        </h3>
      </div>
      <div className="chat__header__right">
        <PeopleAltRoundedIcon />
        <div className="chat__header__search">
          <input type="text" placeholder="Search" />
          <SearchRoundedIcon titleAccess="Under Development" />
        </div>
        <SendRoundedIcon />
        <HelpRoundedIcon />
      </div>
    </div>
  );
};

export default ChatHeader;

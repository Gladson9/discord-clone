import React from "react";
import { Avatar } from "@mui/material";

const Server = ({ serverName, onClickHandler }) => {
  return (
    <div onClick={onClickHandler} className="server" title={`${serverName}`}>
      <Avatar
        src={`https://avatars.dicebear.com/api/bottts/${serverName}.svg`}
      />
    </div>
  );
};

export default Server;

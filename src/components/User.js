import React from "react";
import { Avatar } from "@mui/material";

const User = ({ userName, photo }) => {
  return (
    <div className="user">
      <Avatar src={photo} />
      <h4 className="user__name">{userName.split(" ")[0]}</h4>
    </div>
  );
};

export default User;

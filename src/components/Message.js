import React, { useEffect, useState } from "react";
import "../assets/styles/message.css";
import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import db from "../firebase";
import { selectServer } from "../features/serverSlice";
import { selectChannelId } from "../features/appSlice";

const Message = ({ timestamp, user, message, id }) => {
  const [isHover, setIsHover] = useState(false);
  const currentUser = useSelector(selectUser);
  const [authorizedUser, setAuthorizedUser] = useState(
    currentUser.uid === user.uid
  );

  const currentServer = useSelector(selectServer);
  const currentChannel = useSelector(selectChannelId);
  useEffect(() => {
    setAuthorizedUser(currentUser.uid === user.uid);
  }, [user.uid, currentUser.uid]);

  const deleteMessage = (id) => {
    db.collection("servers")
      .doc(currentServer.id)
      .collection("channels")
      .doc(currentChannel)
      .collection("messages")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Message Deleted Successfully");
      })
      .catch((err) => console.log("Message deletion failed", err));
  };

  return (
    <div
      className="message"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Avatar src={user.photo} />
      <div className={"message__info"}>
        <h4>
          {user.displayName}
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
      {isHover && authorizedUser && (
        <div className="message__menu" onClick={() => deleteMessage(id)}>
          <DeleteIcon />
        </div>
      )}
    </div>
  );
};

export default Message;

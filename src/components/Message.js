import React, { useEffect, useState } from "react";
// styles
import "../assets/styles/message.css";
// icons
import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// redux
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { selectServer } from "../features/serverSlice";
import { selectChannelId } from "../features/appSlice";
// db
import db from "../firebase";

const Message = ({ timestamp, user, message, id, edited = false }) => {
  const [isHover, setIsHover] = useState(false);
  const [isEditMessage, setIsEditMessage] = useState(false);
  const [newMessage, setNewMessage] = useState(message);
  const currentUser = useSelector(selectUser);
  const [authorizedUser, setAuthorizedUser] = useState(
    currentUser.uid === user.uid
  );
  const currentServer = useSelector(selectServer);
  const currentChannel = useSelector(selectChannelId);

  const handleKeyPressed = (e) => {
    if (e.key === "Escape") {
      setIsEditMessage(false);
      console.log(e);
      window.removeEventListener("keydown", handleKeyPressed);
    }
  };

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
  const editMessage = () => {
    setIsEditMessage(!isEditMessage);
    if (!isEditMessage) {
      window.addEventListener("keydown", handleKeyPressed);
      // console.log("ADDED");
    }
  };
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsEditMessage(false);
    if (newMessage !== message) {
      db.collection("servers")
        .doc(currentServer.id)
        .collection("channels")
        .doc(currentChannel)
        .collection("messages")
        .doc(id)
        .update({
          message: newMessage,
          edited: true,
        });
    }
  };
  const handleCancel = () => {
    setIsEditMessage(!isEditMessage);
  };

  const editInputBox = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // console.log("YES");
                handleSubmit();
              }
            }}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="edit__input__box"
            type="text"
          />
          <p className="edit__instructions">
            escape to{" "}
            <span onClick={handleCancel} className="edit__instructions_link">
              cancel
            </span>{" "}
            • enter to{" "}
            <span onClick={handleSubmit} className="edit__instructions_link">
              save
            </span>
          </p>
        </form>
      </>
    );
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
        {isEditMessage ? (
          editInputBox()
        ) : (
          <p>
            {message}
            {edited && <span className="edited__span_message"> (edited)</span>}
          </p>
        )}
      </div>
      {isHover && authorizedUser && (
        <div className="message__menu">
          <EditIcon onClick={editMessage} className="edit__icon" />
          <DeleteIcon
            onClick={() => deleteMessage(id)}
            className="delete__icon"
          />
        </div>
      )}
    </div>
  );
};

export default Message;

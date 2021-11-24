import React, { useState } from "react";
import Backdrop from "./Backdrop";
import "../assets/styles/modal.css";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
const AddServerModal = ({ handelOnClick }) => {
  const [input, setInput] = useState("");
  const user = useSelector(selectUser);

  const handleAddServer = (e) => {
    e.preventDefault();
    if (input) {
      db.collection("servers")
        .add({
          serverName: input,
          createdBy: user,
        })
        .then((data) => {
          data.collection("channels").add({
            channelName: "general",
          });
        });
    }
    handelOnClick();
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <Backdrop onClick={handelOnClick}>
      <div className="modal__add__channel" onClick={(e) => e.stopPropagation()}>
        <h2>Create Server</h2>
        <form>
          <input
            value={input}
            onChange={handleInput}
            type="text"
            placeholder="Server name"
          />
          <button type="submit" onClick={handleAddServer}>
            Create Server
          </button>
        </form>
      </div>
    </Backdrop>
  );
};

export default AddServerModal;

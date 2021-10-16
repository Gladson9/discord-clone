import React, { useState } from "react";
import Backdrop from "./Backdrop";
import "../assets/styles/modal.css";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectServer } from "../features/serverSlice";

const AddChannelModal = ({ handelOnClick }) => {
  const [input, setInput] = useState("");
  const currentServer = useSelector(selectServer);

  const handleAddChannel = (e) => {
    e.preventDefault();
    if (input) {
      db.collection("servers")
        .doc(currentServer.id)
        .collection("channels")
        .add({
          channelName: input,
        });
      // db.collection("channels").add({
      //   channelName: input,
      // });
    }
    handelOnClick();
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <Backdrop onClick={handelOnClick}>
      <div className="modal__add__channel" onClick={(e) => e.stopPropagation()}>
        <form>
          <input
            value={input}
            onChange={handleInput}
            type="text"
            placeholder="Channel name"
          />
          <button type="submit" onClick={handleAddChannel}>
            Create Channel
          </button>
        </form>
      </div>
    </Backdrop>
  );
};

export default AddChannelModal;

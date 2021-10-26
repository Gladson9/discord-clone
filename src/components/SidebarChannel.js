import React from "react";
import { useDispatch } from "react-redux";
import "../assets/styles/sidebarChannel.css";
import { setChannelInfo } from "../features/appSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import db from "../firebase";

const SidebarChannel = ({ id, channelName, serverOwner, currentServer }) => {
  const dispatch = useDispatch();

  const deleteChannel = (e) => {
    e.stopPropagation();
    db.collection("servers")
      .doc(currentServer.id)
      .collection("channels")
      .doc(id)
      .delete()
      .then(() => console.log("Channel Deleted Successfully"))
      .catch((err) => console.log("Channel Deletion Failed", err));
    dispatch(
      setChannelInfo({
        channelId: null,
        channelName: null,
      })
    );
  };
  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName,
          })
        )
      }
    >
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {channelName}
      </h4>
      {serverOwner && <DeleteIcon onClick={deleteChannel} />}
    </div>
  );
};

export default SidebarChannel;

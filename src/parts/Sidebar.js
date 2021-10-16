import React, { useEffect, useState } from "react";
import "../assets/styles/sidebar.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarChannel from "./../components/SidebarChannel";
import { Avatar } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useSelector } from "react-redux";
import { selectUser } from "./../features/userSlice";
import { auth } from "../firebase";
import db from "./../firebase";
import AddChannelModal from "../components/AddChannelModal";
import { selectServer } from "../features/serverSlice";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const currentServer = useSelector(selectServer);
  const [channels, setChannels] = useState([]);

  // Open and close add channel modal
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const [serverOwner, setServerOwner] = useState(false);

  useEffect(() => {
    if (currentServer) {
      db.collection("servers")
        .doc(currentServer.id)
        .collection("channels")
        .onSnapshot((snapshot) =>
          setChannels(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              channel: doc.data(),
            }))
          )
        );
      setServerOwner(user.uid === currentServer.server.createdBy.uid);
    }
  }, [currentServer]);
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        {currentServer ? (
          <>
            <h3>{currentServer.server.serverName}</h3>
            <ExpandMoreIcon />
          </>
        ) : (
          ""
        )}
      </div>
      {currentServer && (
        <div className="sidebar__channels">
          <div className="sidebar__channel__header">
            <div className="sidebar_header">
              <ExpandMoreIcon />
              <h4>Text Channels</h4>
            </div>
            {serverOwner && (
              <AddIcon
                onClick={() => (modalOpen ? close() : open())}
                className="sidebar__add__channel"
              />
            )}
          </div>
          <div className="sidebar__channel__list">
            {channels.map(({ id, channel }) => (
              <SidebarChannel
                key={id}
                id={id}
                channelName={channel.channelName}
              />
            ))}
          </div>
        </div>
      )}
      <div className="sidebar__profile">
        <Avatar src={user.photo} />
        <div className="sidebar__profile__info">
          <h3>{user.displayName.split(" ")[0]}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
        <div className="sidebar__profile__icons">
          <LogoutRoundedIcon
            titleAccess="Sign Out"
            onClick={() => auth.signOut()}
          />
        </div>
      </div>
      {modalOpen && <AddChannelModal handelOnClick={close} />}
    </div>
  );
};

export default Sidebar;

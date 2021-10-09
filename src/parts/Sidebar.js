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

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Web Devs</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channel__header">
          <div className="sidebar_header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon
            // onClick={handleAddChannel}
            onClick={() => (modalOpen ? close() : open())}
            className="sidebar__add__channel"
          />
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

import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import db from "../firebase";
import { useDispatch } from "react-redux";
import { setCurrentServer } from "../features/serverSlice";

const ServerInfo = ({ currentServer, serverOwner }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const dispatch = useDispatch();

  const deleteServer = () => {
    db.collection("servers")
      .doc(currentServer.id)
      .delete()
      .then(() => console.log("Server Deleted Successfully"))
      .catch((err) => console.log("Server Deletion Failed", err));
    dispatch(
      setCurrentServer({
        currentServer: null,
      })
    );
    setMenuOpened(false);
  };
  return (
    <div className="sidebar__top">
      {currentServer ? (
        <>
          <h3>{currentServer.server.serverName}</h3>
          {serverOwner &&
            (menuOpened ? (
              <CloseIcon onClick={() => setMenuOpened(!menuOpened)} />
            ) : (
              <ExpandMoreIcon onClick={() => setMenuOpened(!menuOpened)} />
            ))}
        </>
      ) : (
        ""
      )}
      {menuOpened && (
        <div className="sidebar__server__menu" onClick={deleteServer}>
          <h4>Delete Server</h4>
          <DeleteIcon />
        </div>
      )}
    </div>
  );
};

export default ServerInfo;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../assets/styles/users.css";
import { selectServer } from "../features/serverSlice";
import db from "../firebase";
import User from "./User";
const Users = ({ usersToggle }) => {
  const [users, setUsers] = useState([]);
  const [serverOwner, setServerOwner] = useState();

  const currentServer = useSelector(selectServer);
  useEffect(() => {
    if (currentServer) {
      //getting server owner
      db.collection("servers")
        .doc(currentServer.id)
        .get()
        .then((snapshot) => {
          setServerOwner(snapshot.data().createdBy);
        });
      // getting server users
      db.collection("servers")
        .doc(currentServer.id)
        .collection("users")
        .onSnapshot((snapshot) => {
          setUsers(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [currentServer]);

  return (
    <aside className={`users ${usersToggle}`}>
      <h4 className="users__type">Server Owner</h4>
      {currentServer && serverOwner && (
        <User userName={serverOwner.displayName} photo={serverOwner.photo} />
      )}
      <h4 className="users__type">Users</h4>
      {currentServer &&
        users.map((user) => {
          if (user.uid !== serverOwner.uid) {
            return (
              <User
                key={user.uid}
                userName={user.displayName}
                photo={user.photo}
              />
            );
          }
        })}
    </aside>
  );
};

export default Users;

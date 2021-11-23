import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Sidebar from "./parts/Sidebar";
import Chat from "./parts/Chat";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./parts/Login";
import { auth } from "./firebase";
import Servers from "./parts/Servers";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // authUser.updateProfile({
        //   displayName: "Guest",
        //   photoURL:
        //     "https://avatars.dicebear.com/api/initials/G.svg?b=%237a7a7a&scale=139&translateX=-1",
        // });
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <Servers />
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

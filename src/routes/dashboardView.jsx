import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import { insertNewLink, getLinks } from "../../credentials";
import Link from "../components/Link";

const DashboardView = () => {
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState({});

  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    setCurrentState(2);

    const resLinks = await getLinks(user.uid);
    setLinks(resLinks);
  };

  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };

  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };

  if (currentState === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        ...Loading
      </AuthProvider>
    );
  }

  const handleChange = (e) => {
    const value = e.target.value;

    if (e.target.name === "url") {
      setLink({
        url: value,
        title: link.title,
      });
    }

    if (e.target.name === "title") {
      setLink({
        url: link.url,
        title: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLink();
  };

  const addLink = () => {
    if (title !== "" || url !== "") {
      const newLink = {
        id: uuidv4(),
        title: link.title,
        url: link.url,
        uid: currentUser.uid,
      };

      const res = insertNewLink({ ...newLink });
      newLink.docId = res.id;

      setLinks([...links, newLink]);
    }
  };

  const handleDeleteLink = () => {};

  const handleUpdateLink = (docId, title, url) => {};

  return (
    <div>
      <DashboardWrapper>
        <h2>Dashboard</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Titulo</label>
          <input type="text" id="title" name="title" onChange={handleChange} />
          <label htmlFor="url">url</label>
          <input type="text" id="url" name="url" onChange={handleChange} />
          <input type="submit" value="Enviar" />
        </form>

        <div>
          {links.map((link) => (
            <Link
              key={link.docId}
              url={link.url}
              title={link.title}
              onDelete={handleDeleteLink}
              onUpdate={handleUpdateLink}
            />
          ))}
        </div>
      </DashboardWrapper>
    </div>
  );
};

export default DashboardView;

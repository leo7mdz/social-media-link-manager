import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import {
  insertNewLink,
  getLinks,
  updateLink,
  deleteLink,
} from "../../credentials";
import Link from "../components/Link";
import style from "./dashboard.module.css";
import stylelink from "../components/link.module.css";

const DashboardView = () => {
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState({});

  console.log(links);

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

      setLink({ title: "", url: "" });

      setLinks([...links, newLink]);
    }
  };

  const handleDeleteLink = async (docId) => {
    await deleteLink(docId);
    const tmp = links.filter((link) => link.docId !== docId);

    setLinks([...tmp]);
  };

  const handleUpdateLink = async (docId, title, url) => {
    const link = links.find((link) => link.docId === docId);
    link.title = title;
    link.url = url;

    await updateLink(docId, link);
  };

  return (
    <div>
      <DashboardWrapper>
        <h2>Dashboard</h2>

        <form className={style.dashboard} onSubmit={handleSubmit}>
          <label htmlFor="title">Titulo</label>
          <input
            className="input"
            type="text"
            id="title"
            name="title"
            value={link.title}
            onChange={handleChange}
          />
          <label htmlFor="url">url</label>
          <input
            className="input"
            type="text"
            id="url"
            name="url"
            value={link.url}
            onChange={handleChange}
          />
          <input className="btn" type="submit" value="Create new link" />
        </form>

        <div className={stylelink.linksContainer}>
          {links.map((link) => (
            <Link
              key={link.docId}
              url={link.url}
              docId={link.docId}
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

import React from "react";
import style from "./publicLink.module.css";

const PublicLink = ({ link }) => {
  return (
    <div>
      <a
        className={style.publicLinkContainer}
        href={link.url}
        target="_blank"
        rel="noreferrer"
      >
        {link.title}
      </a>
    </div>
  );
};

export default PublicLink;

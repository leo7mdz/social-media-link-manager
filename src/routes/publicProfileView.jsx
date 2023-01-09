import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  existUserName,
  getProfileUrl,
  getUserPublicProfileInfo,
} from "../../credentials";
import PublicLink from "../components/PublicLink";
import style from "./publicProfile.module.css";
import styleLinks from "../components/PublicLink.module.css";

const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const username = params.username;
      try {
        const userName = await existUserName(username);

        const userInfo = await getUserPublicProfileInfo(userName);

        setProfile(userInfo);

        console.log(userInfo);

        const urlImage = await getProfileUrl(
          userInfo.profileInfo.profilePicture
        );

        setUrl(urlImage);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProfile();
  }, [params]);

  return (
    <div className={style.profileContainer}>
      <div className={style.profilePicture}>
        <img src={url} alt="Imagen de perfil" width={150} />
      </div>
      <h2>{profile?.profileInfo.username}</h2>
      <h2>{profile?.profileInfo.displayName}</h2>
      <div className={styleLinks.publicLinksContainer}>
        {profile?.linksInfo.map((link) => (
          <PublicLink key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
};

export default PublicProfileView;
